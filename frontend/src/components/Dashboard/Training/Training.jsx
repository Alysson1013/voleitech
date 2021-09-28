import React, { useEffect, useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import moment from 'moment'

import Modal from '../../Modal'
import Input from '../../Forms/Input';
import Button from '../../Forms/Button'
import Options from '../Options/Options';

import { UserContext } from '../../../UserContext';
import {
  getTrainingById,
  getScoutById,
  getTeamById,
  createResult,
  createAthleteTrainingResult
} from '../../../Hooks/Api';

import styles from './Training.module.css';

function Training() {
  const { getToken } = useContext(UserContext);
  const token = getToken()

  const [isActive, setIsActive] = useState(false)
  const [idAth, setIdAth] = useState('')
  const [scout, setScout] = useState({})
  const [athletes, setAthletes] = useState([])
  const [dataBody, setDataBody] = useState({
    name: "",
    dt_training: "",
    hour_start: "",
    hour_finish: "",
    type_name: "",
    type_id: 0,
    team_name: "",
    team_id: 0,
    scout_name: "",
    scout_id: 0,
    athlete_id: 0,
  })

  const [result, setResult] = useState({
      id: 0,
      v_floating_serve: 0,
      v_floating_serve_points: 0,
      v_floating_serve_mistake: 0,
      v_trip_serve: 0,
      v_trip_serve_points: 0,
      v_trip_serve_mistake: 0,
      v_attack: 0,
      v_attack_points: 0,
      v_attack_mistake: 0,
      v_box_point: 0,
      v_block: 0,
      v_block_mistake: 0,
      v_block_used_mistake: 0,
      v_block_points: 0,
      v_general_passes: 0,
      v_pass_mistake: 0,
      v_pass_a: 0,
      v_pass_b: 0,
      v_pass_c: 0,
      v_defense_general: 0,
      v_defense_mistake: 0,
      v_defense_a: 0,
      v_defense_b: 0,
      v_defense_c: 0,
      v_lifting: 0,
      v_lifting_mistake: 0,
      v_lifting_correct: 0,
      v_initiative: 0,
      v_initiative_lack: 0,
      general_points: 0
  })

  const history = useHistory()
  const { id } = useParams()

  const loadScout = async () => {
    const response = await getScoutById(token, dataBody.scout_id)
    setScout(response.scout)
  }

  const loadTraining = async () => {
    const response = await getTrainingById(id, token)
    setDataBody({
      name: response.training.name,
      dt_training: response.training.dt_training,
      hour_start: response.training.hour_start,
      hour_finish: response.training.hour_finish,
      type_name: response.training.training_type.training_type_name,
      type_id: response.training.training_type.id,
      team_name: response.training.team.name,
      team_id: response.training.team.id,
      scout_name: response.training.scout.name,
      scout_id: response.training.scout.id
    })
  }

  const loadAthletes = async () => {
    const response = await getTeamById(dataBody.team_id, token)
    if (response){
      if (response.team){
        setAthletes(response.team.collaborators)
      }
    }
    
  }


  async function handleSubmit(e){
    const responseResult = await createResult(result, token)
    const response  = await createAthleteTrainingResult({
        athlete_id: dataBody.athlete_id,
        training_id: id,
        result_id: responseResult.newResult.id
    }, token)

    console.log(response)
    setIsActive(false)
  }

  useEffect(() => {
    if (id) {
      loadTraining()
    }
  }, [id])

  useEffect(() => {
    loadScout()
    loadAthletes()
  }, [dataBody])
 const handleModalOpen = (id) => {
    setIsActive(true)
    setIdAth(id)
  }

  function dt_training(date) {
    const days = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)

    return `${days}/${month}/${year}`
  }

  return (
    <Container className={`${styles.dash}`}>
      <Row>
        <Options />
        <Col className={`${styles.centerCol}`}>
          <Row className={`${styles.containerAbout}`} >
            <Col>
              <Row>
                <Col>
                  <span><b className={styles.label}>Nome: </b> {dataBody.name} </span>
                  <span><b className={styles.label}>Scout: </b>{dataBody.scout_name}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span><b className={styles.label}>Equipe: </b> {dataBody.team_name} </span>
                  <span><b className={styles.label}>Tipo de Treino: </b>{dataBody.type_name}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span><b className={styles.label}>Horario de Início: </b> {dataBody.hour_start} </span>
                  <span><b className={styles.label}>Horario de Término: </b>{dataBody.hour_finish}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span><b className={styles.label}>Data do Treino: </b> {dt_training(dataBody.dt_training)} </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={`${styles.contentButton}`} >
            <Button type="button" onClick={() => history.push('/dashboard/trainings')} >Voltar</Button>
            <Button type="button" onClick={() => handleModalOpen(id)}>Adicionar Resultado</Button>
          </Row>
          <Modal isActive={isActive} setIsActive={setIsActive} >
              {
                scout &&
                <Col>
                  <h1>
                    Novo Resultado
                  </h1>
                  {
                    scout.v_floating_serve &&
                    <span >
                      <b>Valor Saque Flutuante: </b>
                      {result.v_floating_serve}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_floating_serve + scout.v_floating_serve
                          setResult({
                            ...result,
                            v_floating_serve: aux
                          })
                        }}
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_floating_serve - scout.v_floating_serve
                          setResult({
                            ...result,
                            v_floating_serve: aux
                          })
                        }}
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_floating_serve_points &&
                    <span >
                      <b>Pontos Saque Flutuante: </b>
                      {result.v_floating_serve_points}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_floating_serve_points + scout.v_floating_serve_points
                          setResult({
                            ...result,
                            v_floating_serve_points: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_floating_serve_points - scout.v_floating_serve_points
                          setResult({
                            ...result,
                            v_floating_serve_points: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_floating_serve_mistake &&
                    <span >
                      <b>Erros Saque Flutuante: </b>
                      {result.v_floating_serve_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_floating_serve_mistake + scout.v_floating_serve_mistake
                          setResult({
                            ...result,
                            v_floating_serve_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_floating_serve_mistake - scout.v_floating_serve_mistake
                          setResult({
                            ...result,
                            v_floating_serve_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_trip_serve &&
                    <span >
                      <b>Valor Saque Viagem: </b>
                      {result.v_trip_serve}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_trip_serve + scout.v_trip_serve
                          setResult({
                            ...result,
                            v_trip_serve: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_trip_serve - scout.v_trip_serve
                          setResult({
                            ...result,
                            v_trip_serve: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_trip_serve_points &&
                    <span >
                      <b>Pontos de Saque Viagem: </b>
                      {result.v_trip_serve_points}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_trip_serve_points + scout.v_trip_serve_points
                          setResult({
                            ...result,
                            v_trip_serve_points: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_trip_serve_points - scout.v_trip_serve_points
                          setResult({
                            ...result,
                            v_trip_serve_points: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_trip_serve_mistake &&
                    <span >
                      <b>Saque Viagem Erro: </b>
                      {result.v_trip_serve_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_trip_serve_mistake + scout.v_trip_serve_mistake
                          setResult({
                            ...result,
                            v_trip_serve_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_trip_serve_mistake - scout.v_trip_serve_mistake
                          setResult({
                            ...result,
                            v_trip_serve_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_attack &&
                    <span >
                      <b>Valor Ataque: </b>
                      {result.v_attack}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_attack + scout.v_attack
                          setResult({
                            ...result,
                            v_attack: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_attack - scout.v_attack
                          setResult({
                            ...result,
                            v_attack: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_attack_points &&
                    <span >
                      <b>Pontos Ataque: </b>
                      {result.v_attack_points}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_attack_points + scout.v_attack_points
                          setResult({
                            ...result,
                            v_attack_points: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_attack_points - scout.v_attack_points
                          setResult({
                            ...result,
                            v_attack_points: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_attack_mistake &&
                    <span >
                      <b>Ataque Erro: </b>
                      {result.v_attack_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_attack_mistake + scout.v_attack_mistake
                          setResult({
                            ...result,
                            v_attack_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_attack_mistake - scout.v_attack_mistake
                          setResult({
                            ...result,
                            v_attack_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_box_point &&
                    <span >
                      <b>Saque Caixinha: </b>
                      {result.v_box_point}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_box_point + scout.v_box_point
                          setResult({
                            ...result,
                            v_box_point: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_box_point - scout.v_box_point
                          setResult({
                            ...result,
                            v_box_point: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_block &&
                    <span >
                      <b>Valor Bloqueio: </b>
                      {result.v_block}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block - scout.v_block
                          setResult({
                            ...result,
                            v_block: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block - scout.v_block
                          setResult({
                            ...result,
                            v_block: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_block_mistake &&
                    <span >
                      <b>Erro Bloqueio: </b>
                      {result.v_block_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block_mistake + scout.v_block_mistake
                          setResult({
                            ...result,
                            v_block_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block_mistake - scout.v_block_mistake
                          setResult({
                            ...result,
                            v_block_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_block_mistake &&
                    <span >
                      <b>Erro Bloqueio: </b>
                      {result.v_block_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block_mistake + scout.v_block_mistake
                          setResult({
                            ...result,
                            v_block_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block_mistake - scout.v_block_mistake
                          setResult({
                            ...result,
                            v_block_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_block_points &&
                    <span >
                      <b>Pontos de Bloqueio: </b>
                      {result.v_block_points}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block_points + scout.v_block_points
                          setResult({
                            ...result,
                            v_block_points: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_block_points - scout.v_block_points
                          setResult({
                            ...result,
                            v_block_points: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_general_passes &&
                    <span >
                      <b>Passes Gerais: </b>
                      {result.v_general_passes}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_general_passes + scout.v_general_passes
                          setResult({
                            ...result,
                            v_general_passes: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_general_passes - scout.v_general_passes
                          setResult({
                            ...result,
                            v_general_passes: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_pass_mistake &&
                    <span >
                      <b>Erros de Passe: </b>
                      {result.v_pass_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_mistake + scout.v_pass_mistake
                          setResult({
                            ...result,
                            v_pass_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_mistake - scout.v_pass_mistake
                          setResult({
                            ...result,
                            v_pass_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_pass_a &&
                    <span >
                      <b>Passe A: </b>
                      {result.v_pass_a}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_a + scout.v_pass_a
                          setResult({
                            ...result,
                            v_pass_a: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_a - scout.v_pass_a
                          setResult({
                            ...result,
                            v_pass_a: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_pass_b &&
                    <span >
                      <b>Passe B: </b>
                      {result.v_pass_b}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_b + scout.v_pass_b
                          setResult({
                            ...result,
                            v_pass_b: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_b - scout.v_pass_b
                          setResult({
                            ...result,
                            v_pass_b: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_pass_c &&
                    <span >
                      <b>Passe C: </b>
                      {result.v_pass_c}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_c + scout.v_pass_c
                          setResult({
                            ...result,
                            v_pass_c: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_pass_c - scout.v_pass_c
                          setResult({
                            ...result,
                            v_pass_c: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_defense_general &&
                    <span >
                      <b>Defesa Geral: </b>
                      {result.v_defense_general}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_general + scout.v_defense_general
                          setResult({
                            ...result,
                            v_defense_general: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_general - scout.v_defense_general
                          setResult({
                            ...result,
                            v_defense_general: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_defense_mistake &&
                    <span >
                      <b>Erros de Defesa: </b>
                      {result.v_defense_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_mistake + scout.v_defense_mistake
                          setResult({
                            ...result,
                            v_defense_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_mistake - scout.v_defense_mistake
                          setResult({
                            ...result,
                            v_defense_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_defense_a &&
                    <span >
                      <b>Defesa A: </b>
                      {result.v_defense_a}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_a + scout.v_defense_a
                          setResult({
                            ...result,
                            v_defense_a: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_a - scout.v_defense_a
                          setResult({
                            ...result,
                            v_defense_a: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_defense_b &&
                    <span >
                      <b>Defesa B: </b>
                      {result.v_defense_b}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_b + scout.v_defense_b
                          setResult({
                            ...result,
                            v_defense_b: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_b - scout.v_defense_b
                          setResult({
                            ...result,
                            v_defense_b: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_defense_c &&
                    <span >
                      <b>Defesa C: </b>
                      {result.v_defense_c}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_c + scout.v_defense_c
                          setResult({
                            ...result,
                            v_defense_c: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_defense_c - scout.v_defense_c
                          setResult({
                            ...result,
                            v_defense_c: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_lifting &&
                    <span >
                      <b>Valor Levantamento: </b>
                      {result.v_lifting}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_lifting + scout.v_lifting
                          setResult({
                            ...result,
                            v_lifting: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_lifting - scout.v_lifting
                          setResult({
                            ...result,
                            v_lifting: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_lifting_mistake &&
                    <span >
                      <b>Erros de Levantamento: </b>
                      {result.v_lifting_mistake}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_lifting_mistake + scout.v_lifting_mistake
                          setResult({
                            ...result,
                            v_lifting_mistake: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_lifting_mistake - scout.v_lifting_mistake
                          setResult({
                            ...result,
                            v_lifting_mistake: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_lifting_correct &&
                    <span >
                      <b>Levantamento Correto: </b>
                      {result.v_lifting_correct}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_lifting_correct + scout.v_lifting_correct
                          setResult({
                            ...result,
                            v_lifting_correct: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_lifting_correct - scout.v_lifting_correct
                          setResult({
                            ...result,
                            v_lifting_correct: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_initiative &&
                    <span >
                      <b>Iniciativa: </b>
                      {result.v_initiative}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_initiative - scout.v_initiative
                          setResult({
                            ...result,
                            v_initiative: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_initiative - scout.v_initiative
                          setResult({
                            ...result,
                            v_initiative: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  {
                    scout.v_initiative_lack &&
                    <span >
                      <b>Falta de Iniciativa:</b>
                      {result.v_initiative_lack}
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_initiative_lack + scout.v_initiative_lack
                          setResult({
                            ...result,
                            v_initiative_lack: aux
                          })
                        }}  
                      >
                        +
                      </span>
                      <span 
                        className={styles.but}
                        onClick={(e) => {
                          const aux = result.v_initiative_lack - scout.v_initiative_lack
                          setResult({
                            ...result,
                            v_initiative_lack: aux
                          })
                        }}  
                      >
                        -
                      </span>
                      <br />
                    </span>
                  }
                  <label htmlFor="athlete_id" className={styles.label}><b>Atleta Treinador</b></label>
                  <select name="athlete_id" id="athlete_id" className={styles.select} onChange={e => setDataBody({ ...dataBody, athlete_id: e.target.value })} value={dataBody.athlete_id}>
                    {
                      athletes.map(value => {
                       if (value.function === "both" || value.function === "athlete")
                       return (<option value={value.id}>
                          {value.name}
                        </option>
                       )
                      })
                    }
                    <option value={null} selected > Selecionar </option>
                  </select>
                  <Button type="submit" onClick={(e) => handleSubmit(e)} className={`dropdown animate__animated animate__fadeInUp`}>Adicionar</Button>
                </Col>
              }
          </Modal>
        </Col>
      </Row>
    </Container>
  )
}

export default Training