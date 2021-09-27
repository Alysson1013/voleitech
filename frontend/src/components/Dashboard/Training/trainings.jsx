import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { UserContext } from '../../../UserContext';

import Modal from '../../Modal';
import Button from '../../Forms/Button';
import styles from './Training.module.css';
import InputMask from '../../Forms/Input_mask'
import Input from '../../Forms/Input'
import {
  getTrainings,
  getTrainingsTypes,
  createTrainingType,
  getScouts,
  createScout,
  createTraining,
  getTeams
} from '../../../Hooks/Api'

function Trainings() {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [trainings, setTrainings] = useState([])
  const [trainingsTypes, setTrainingsTypes] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [scouts, setScouts] = useState([])
  const [teams, setTeams] = useState([])
  const [newScout, setNewScout] = useState(false)
  const [dataBody, setDataBody] = useState({
    training_type_name: '',
    describe: '',
    name: '',
    dt_training: '',
    hour_start: '',
    hour_finish: '',
    type_id: 0,
    scout_id: 0,
    team_id: 0
  })
  const [scoutBody, setScoutBody] = useState({
      name: '',
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
      v_initiative_lack: 0
  })

  const loadTrainings = async () => {
    const response = await getTrainings(token)
    setTrainings(response.trainings)
  }

  const loadTrainingsTypes = async () => {
    const response = await getTrainingsTypes(token)
    setTrainingsTypes(response.trainings_types)
  }

  const loadScouts = async () => {
    const response = await getScouts(token)
    setScouts(response.scouts)
  }

  const loadTeams = async () => {
    const response = await getTeams(token)
    setTeams(response.teams)
  }

  function handleModalOpen() {
    setIsActive(true)
  }

  function openModalScout() {
    setNewScout(true)
  }

  React.useEffect(() => {
    loadTrainings()
    loadTrainingsTypes()
    loadScouts()
    loadTeams()
  }, [token])

  async function newType(e) {
    e.preventDefault()

    const name = prompt("Digite o nome do tipo de treino")
    const describe = prompt("Digite a descrição do tipo de treino")

    const response = await createTrainingType({
      training_type_name: name,
      describe: describe
    }, token)

    console.log(response.newTrainingType)
    setTrainingsTypes(
      trainingsTypes.concat(response.newTrainingType)
    )
  }

  console.log(trainingsTypes)

  async function handleSubmit(e) {
    e.preventDefault()

    createTraining(dataBody, token)
    setIsActive(false)

    loadTrainings()
  }

  async function addScout() {
    const response = await createScout(scoutBody, token)
    console.log(response.newScout)

    setScouts(
      scouts.concat(response.newScout)
    )

    setNewScout(false)
  }

  console.log(trainingsTypes)

  return (
    <Col className={`${styles.centerCol}`}>
      <Row>
        {
          trainings && trainings.map((value, index) => (
            <Card style={{ width: '18rem' }} key={index} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
              <Card.Header>{value.name}</Card.Header>
              <Card.Body>
                <Card.Title>
                  {value.training_type.training_type_name}
                </Card.Title>
                <Card.Text>
                  <Link to={`/training/${value.id}`}>Ver mais sobre o Atleta</Link>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        }
        <Card style={{ width: '18rem' }} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
          <Card.Header>Novo Treino</Card.Header>
          <Card.Body>
            <Card.Title>Inserir Treino</Card.Title>
            <Card.Text>
              <Button type="button" onClick={handleModalOpen}>
                Adicionar
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Modal isActive={isActive} setIsActive={setIsActive} >
        <form onSubmit={handleSubmit}>
          <Card>
            <Card.Header as="h1">
              Novo Treino
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Col>
                  <InputMask label="Nome" type="text" name="name" onChange={e => setDataBody({ ...dataBody, name: e.target.value })} value={dataBody.name} />
                </Col>
                <Col>
                  <label htmlFor="type_id">Tipo de Treino</label>
                  <select name="type_id" id="type_id" className={styles.select} onChange={e => setDataBody({ ...dataBody, type_id: e.target.value })} value={dataBody.type_id}>
                    {
                      trainingsTypes.map(value => (
                        <option value={value.id}>
                          {value.training_type_name}
                        </option>
                    ))
                    }
                    <option value={null} selected > Selecionar </option>
                  </select>
                  <p className={styles.category} onClick={newType}>Novo Tipo de Treino</p>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <InputMask label="Descrição" type="text" name="describe" onChange={e => setDataBody({ ...dataBody, describe: e.target.value })} value={dataBody.describe} />
                </Col>
                <Col>
                  <InputMask label="Data de Treinamento" type="text" mask="99/99/9999" name="dt_training" onChange={e => setDataBody({ ...dataBody, dt_training: e.target.value })} value={dataBody.dt_training} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <InputMask label="Horario de Início" type="text" mask="99:99" name="hour_start" onChange={e => setDataBody({ ...dataBody, hour_start: e.target.value })} value={dataBody.hour_start} />
                </Col>
                <Col>
                  <InputMask label="Horario de Término" type="text" mask="99:99" name="hour_finish" onChange={e => setDataBody({ ...dataBody, hour_finish: e.target.value })} value={dataBody.hour_finish} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <label htmlFor="scout_id">Scout Usado</label>
                  <select name="scout_id" id="scout_id" className={styles.select} onChange={e => setDataBody({ ...dataBody, scout_id: e.target.value })} value={dataBody.scout_id}>
                    {
                      scouts.map(value => (
                            <option value={value.id}>
                              {value.name}
                            </option>
                      ))
                    }
                    <option value={null} selected > Selecionar </option>
                  </select>
                  <p className={styles.category} onClick={openModalScout}>Novo Scout</p>
                </Col>
                <Col>
                  <label htmlFor="team">Time Inicial</label>
                  <select name="team" id="team" className={styles.select} onChange={e => setDataBody({ ...dataBody, team_id: e.target.value })} value={dataBody.team_id}>
                    {
                      teams.map(team => (
                        <option value={team.id}>
                          {team.name}
                        </option>
                      ))
                    }
                    <option value={null} selected > Selecionar </option>
                  </select>
                 </Col> 
              </Form.Row>
              <Button type="submit" className={`dropdown animate__animated animate__fadeInUp`}>Adicionar</Button>
            </Card.Body>
          </Card>
        </form>
      </Modal>
      <Modal isActive={newScout} setIsActive={setNewScout} >
          <Card>
            <Card.Header as="h1">
              Novo Treino
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Col>
                  <Input label="Nome" type="text" name="name" onChange={e => setScoutBody({ ...scoutBody, name: e.target.value })} value={scoutBody.name} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Valor Saque Flutuante"
                    type="number"
                    name="v_floating_serve"
                    onChange={e => setScoutBody({ ...scoutBody, v_floating_serve: e.target.value })}
                    value={scoutBody.v_floating_serve}
                  />
                </Col>
                <Col>
                  <Input
                    label="Pontos Saque Flutuante"
                    type="number"
                    name="v_floating_serve_points"
                    onChange={e => setScoutBody({ ...scoutBody, v_floating_serve_points: e.target.value })}
                    value={scoutBody.v_floating_serve_points}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Errors Saque Flutuante"
                    type="number"
                    name="v_floating_serve_mistake"
                    onChange={e => setScoutBody({ ...scoutBody, v_floating_serve_mistake: e.target.value })}
                    value={scoutBody.v_floating_serve_mistake}
                  />
                </Col>
                <Col>
                  <Input
                    label="Valor Saque Viagem"
                    type="number"
                    name="v_trip_serve"
                    onChange={e => setScoutBody({ ...scoutBody, v_trip_serve: e.target.value })}
                    value={scoutBody.v_trip_serve}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Pontos de Saque Viagem"
                    type="number"
                    name="v_trip_serve_points"
                    onChange={e => setScoutBody({ ...scoutBody, v_trip_serve_points: e.target.value })}
                    value={scoutBody.v_trip_serve_points}
                  />
                </Col>
                <Col>
                  <Input
                    label="Saque Viagem Erro"
                    type="number"
                    name="v_trip_serve_mistake"
                    onChange={e => setScoutBody({ ...scoutBody, v_trip_serve_mistake: e.target.value })}
                    value={scoutBody.v_trip_serve_mistake}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Valor Ataque"
                    type="number"
                    name="v_attack"
                    onChange={e => setScoutBody({ ...scoutBody, v_attack: e.target.value })}
                    value={scoutBody.v_attack}
                  />
                </Col>
                <Col>
                  <Input
                    label="Pontos Ataque"
                    type="number"
                    name="v_attack_points"
                    onChange={e => setScoutBody({ ...scoutBody, v_attack_points: e.target.value })}
                    value={scoutBody.v_attack_points}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Ataque Erro"
                    type="number"
                    name="v_attack_mistake"
                    onChange={e => setScoutBody({ ...scoutBody, v_attack_mistake: e.target.value })}
                    value={scoutBody.v_attack_mistake}
                  />
                </Col>
                <Col>
                  <Input
                    label="Saque Caixinha"
                    type="number"
                    name="v_box_point"
                    onChange={e => setScoutBody({ ...scoutBody, v_box_point: e.target.value })}
                    value={scoutBody.v_box_point}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Valor Bloqueio"
                    type="number"
                    name="v_block"
                    onChange={e => setScoutBody({ ...scoutBody, v_block: e.target.value })}
                    value={scoutBody.v_block}
                  />
                </Col>
                <Col>
                  <Input
                    label="Erro Bloqueio"
                    type="number"
                    name="v_block_mistake"
                    onChange={e => setScoutBody({ ...scoutBody, v_block_mistake: e.target.value })}
                    value={scoutBody.v_block_mistake}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Pontos de Bloqueio"
                    type="number"
                    name="v_block_points"
                    onChange={e => setScoutBody({ ...scoutBody, v_block_points: e.target.value })}
                    value={scoutBody.v_block_points}
                  />
                </Col>
                <Col>
                  <Input
                    label="Passes Gerais"
                    type="number"
                    name="v_general_passes"
                    onChange={e => setScoutBody({ ...scoutBody, v_general_passes: e.target.value })}
                    value={scoutBody.v_general_passes}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Erros de Passe"
                    type="number"
                    name="v_pass_mistake"
                    onChange={e => setScoutBody({ ...scoutBody, v_pass_mistake: e.target.value })}
                    value={scoutBody.v_pass_mistake}
                  />
                </Col>
                <Col>
                  <Input
                    label="Passe A"
                    type="number"
                    name="v_pass_a"
                    onChange={e => setScoutBody({ ...scoutBody, v_pass_a: e.target.value })}
                    value={scoutBody.v_pass_a}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Passe B"
                    type="number"
                    name="v_pass_b"
                    onChange={e => setScoutBody({ ...scoutBody, v_pass_b: e.target.value })}
                    value={scoutBody.v_pass_b}
                  />
                </Col>
                <Col>
                  <Input
                    label="Passe C"
                    type="number"
                    name="v_pass_c"
                    onChange={e => setScoutBody({ ...scoutBody, v_pass_c: e.target.value })}
                    value={scoutBody.v_pass_c}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Defesa Geral"
                    type="number"
                    name="v_defense_general"
                    onChange={e => setScoutBody({ ...scoutBody, v_defense_general: e.target.value })}
                    value={scoutBody.v_defense_general}
                  />
                </Col>
                <Col>
                  <Input
                    label="Erros de Defesa"
                    type="number"
                    name="v_defense_mistake"
                    onChange={e => setScoutBody({ ...scoutBody, v_defense_mistake: e.target.value })}
                    value={scoutBody.v_defense_mistake}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Defesa A"
                    type="number"
                    name="v_defense_a"
                    onChange={e => setScoutBody({ ...scoutBody, v_defense_a: e.target.value })}
                    value={scoutBody.v_defense_a}
                  />
                </Col>
                <Col>
                  <Input
                    label="Defesa B"
                    type="number"
                    name="v_defense_b"
                    onChange={e => setScoutBody({ ...scoutBody, v_defense_b: e.target.value })}
                    value={scoutBody.v_defense_b}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Defesa C"
                    type="number"
                    name="v_defense_c"
                    onChange={e => setScoutBody({ ...scoutBody, v_defense_c: e.target.value })}
                    value={scoutBody.v_defense_c}
                  />
                </Col>
                <Col>
                  <Input
                    label="Valor Levantamento"
                    type="number"
                    name="v_lifting"
                    onChange={e => setScoutBody({ ...scoutBody, v_lifting: e.target.value })}
                    value={scoutBody.v_lifting}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Erros de Levantamento"
                    type="number"
                    name="v_lifting_mistake"
                    onChange={e => setScoutBody({ ...scoutBody, v_lifting_mistake: e.target.value })}
                    value={scoutBody.v_lifting_mistake}
                  />
                </Col>
                <Col>
                  <Input
                    label="Levantamento Correto"
                    type="number"
                    name="v_lifting_correct"
                    onChange={e => setScoutBody({ ...scoutBody, v_lifting_correct: e.target.value })}
                    value={scoutBody.v_lifting_correct}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input
                    label="Iniciativa"
                    type="number"
                    name="v_initiative"
                    onChange={e => setScoutBody({ ...scoutBody, v_initiative: e.target.value })}
                    value={scoutBody.v_initiative}
                  />
                </Col>
                <Col>
                  <Input
                    label="Falta de Iniciativa"
                    type="number"
                    name="v_initiative_lack"
                    onChange={e => setScoutBody({ ...scoutBody, v_initiative_lack: e.target.value })}
                    value={scoutBody.v_initiative_lack}
                  />
                </Col>
              </Form.Row>
              <Button type="submit" onClick={addScout} className={`dropdown animate__animated animate__fadeInUp`}>Criar</Button>
            </Card.Body>
          </Card>
      </Modal>
    </Col>
  )
}

export default Trainings
