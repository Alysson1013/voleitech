import React, {useEffect, useState, useContext} from 'react'
import { useHistory, useParams} from 'react-router-dom'
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import moment from 'moment'

import Modal from '../../Modal'
import Input from '../../Forms/Input';
import Button from '../../Forms/Button'
import Options from '../Options/Options';

import { UserContext } from '../../../UserContext';
import { getAthleteById, updateUser } from '../../../Hooks/Api';

import Chart from '../../Chart';

import styles from './Athlete.module.css';
import { Radar } from 'react-chartjs-2';

function Athlete() {
  const { getToken } = useContext(UserContext);
  const token = getToken()

  const [isActive, setIsActive] = useState(false)
  const [idAth, setIdAth] = useState('')
  const [dataBody, setDataBody] = useState({
    name: '',
    email: '',
    phone_1: '',
    function: '',
    dt_birth: '',
    n_enrollment_atl: '',
    positions: '',
    n_uniform: 0,
    height: 0,
    weight: 0,
    width: 0,
    gender: '',
    bmi: 0,
    jump_distance: 0,
    jump_height: 0,
    adresses: [],
    results: [],
  })
  const [stateChartRadar, setStateChartRadar] = useState({
    labels: ["Saque Flutuante", "Saque Viagem", "Ataque", "Pingado", "Caixinha", "Defesa"],
    datasets: []
  })


  const history = useHistory()
  const {id} = useParams()

  const loadData = () => {
    const dataResult = {
      n_floating_serve_points: dataBody.results.reduce((prev, current) => prev + current.n_floating_serve_points, 0)/dataBody.results.length,
      n_trip_serve_points: dataBody.results.reduce((prev, current) => prev + current.n_trip_serve_points, 0)/dataBody.results.length,
      n_attack_points: dataBody.results.reduce((prev, current) => prev + current.n_attack_points, 0)/dataBody.results.length,
      n_dripping_point: dataBody.results.reduce((prev, current) => prev + current.n_dripping_point, 0)/dataBody.results.length,
      n_box_point: dataBody.results.reduce((prev, current) => prev + current.n_box_point, 0)/dataBody.results.length,
      n_block_points: dataBody.results.reduce((prev, current) => prev + current.n_block_points, 0)/dataBody.results.length
    } 

    const dataError = {
      n_floating_serve_mistake: dataBody.results.reduce((prev, current) => prev + current.n_floating_serve_mistake, 0)/dataBody.results.length,
      n_trip_serve_mistake: dataBody.results.reduce((prev, current) => prev + current.n_trip_serve_mistake, 0)/dataBody.results.length,
      n_attack_mistake: dataBody.results.reduce((prev, current) => prev + current.n_attack_mistakedataBody, 0)/dataBody.results.length,
      n_block_mistake: dataBody.results.reduce((prev, current) => prev + current.n_block_mistake, 0)/dataBody.results.length,
      n_defense_mistake: dataBody.results.reduce((prev, current) => prev + current.n_defense_mistake, 0)/dataBody.results.length,
      n_lifting_mistake: dataBody.results.reduce((prev, current) => prev + current.n_defense_mistake, 0)/dataBody.results.length,
    }
  
    return {
      dataResult,
      dataError
    }
  }

  const loadAthlete = async () => {
    const response = await getAthleteById(token, id)
    setDataBody({
      ...dataBody,
      name: response.collaborator.name,
      email_1: response.collaborator.email_1,
      phone_1: response.collaborator.phone_1,
      function: response.collaborator.function,
      dt_birth: Number(moment(new Date()).year()) - Number(moment(response.collaborator.dt_birth).year()),
      n_enrollment_atl: response.collaborator.n_enrollment_atl,
      positions: response.collaborator.positions,
      n_uniform: response.collaborator.n_uniform,
      height: response.collaborator.height,
      weight: response.collaborator.weight,
      width: response.collaborator.width,
      gender: response.collaborator.gender,
      bmi: response.collaborator.bmi,
      jump_distance: response.collaborator.jump_distance,
      jump_height: response.collaborator.jump_height,
      adresses: response.collaborator.adresses,
      results: response.collaborator.results,
    })
  }

  const loadChartData = async (dataResult, dataError) => {
    if (dataResult || dataError){
      setStateChartRadar({
        ...stateChartRadar,
        datasets: [
          {
            label: "Resultados",
            backgroundColor: [
              'rgba(255, 187, 17, 0.3)'
            ],
            hoverBackgroundColor: [
              '#fb1'
            ],
            data: [dataResult.n_floating_serve_points, dataResult.n_trip_serve_points, dataResult.n_attack_points, dataResult.n_dripping_point, dataResult.n_box_point, dataResult.n_block_points]
          },
          {
            label: "Erros",
            backgroundColor: [
              'rgba(204, 0, 0, 0.3)'
            ],
            hoverBackgroundColor: [
              '#CC0000'
            ],
            data: [dataError.n_floating_serve_mistake, dataError.n_trip_serve_mistake, dataError.n_attack_mistake, dataError.n_block_mistake, dataError.n_defense_mistake, dataError.n_lifting_mistake]
          }
        ]
      })
    } 
  }

  useEffect(() => {
    if(id) {
      loadAthlete()
      loadChartData()
    }
  }, [id])

  useEffect(() => {
    const { dataResult, dataError } = loadData()
    loadChartData(dataResult, dataError )
  }, [dataBody])


  const handleModalOpen = (id) => {
    setIsActive(true)
    setIdAth(id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      name: dataBody.name,
    }

    try {
      await updateUser(body, idAth, token)
      setIsActive(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container className={`${styles.dash}`}>
      <Row>
        <Options />
        <Col className={`${styles.centerCol}`}>
          <Row className={`${styles.containerAbout}`} >
            <Col>
            <Row>
              <span><b className={styles.label}>Nome:</b> {dataBody.name} </span>
              <span><b className={styles.label}>Idade:</b> {dataBody.dt_birth} anos </span>
            </Row>
            <Row>
              <span><b className={styles.label}>Telefone:</b> {dataBody.phone_1} </span>
              <span><b className={styles.label}>E-mail:</b> {dataBody.email_1} </span>
            </Row>
            <Row>
              <span><b className={styles.label}>Função:</b> Alteta </span>
              <span><b className={styles.label}>Inscrição:</b> {dataBody.n_enrollment_atl} </span>
            </Row>  
            <Row>
              <span><b className={styles.label}>Posições:</b> {dataBody.positions} </span>
              <span><b className={styles.label}>Uniforme Nº:</b> {dataBody.n_uniform} </span>
            </Row>
            <Row>
              <span><b className={styles.label}>Altura:</b> {dataBody.height} M </span>
              <span><b className={styles.label}>Envergadura:</b> {dataBody.width} M </span>
            </Row>
            <Row>
              <span><b className={styles.label}>Genêro:</b> {dataBody.gender === "male" ? "Masculino" : "Fêminino"} </span>
              <span><b className={styles.label}>BMI:</b> {dataBody.bmi} </span>
            </Row>
            <Row>
              <span><b className={styles.label}>Salto Distância:</b> {dataBody.jump_distance} </span>
              <span><b className={styles.label}>Salto Altura:</b> {dataBody.jump_height} </span>
            </Row>
            <Row>
              {
                dataBody.adresses &&
                dataBody.adresses.map((address, index) => (
                  <span><b className={styles.label}>Endereço {index + 1}:</b> { address.road }, { address.number } - {address.district} </span>
                ))
              }
            </Row>
            </Col>
            <Col className={`${styles.graphicContainer}`}>
              <div>
                <Chart TypeChart={Radar} state={stateChartRadar} className={`${styles.chartPie}`} />
              </div>
            </Col>
          </Row>
          <Row className={`${styles.contentButton}`} >
            <Button type="button" onClick={() => history.push('/dashboard/athletes')} >Voltar</Button>
            <Button type="button" onClick={() => handleModalOpen(id)} >Editar</Button>
          </Row>
          <Modal isActive={isActive} setIsActive={setIsActive} >
            <form onSubmit={handleSubmit}>
              <Card>
                <Card.Header as="h1">
                  Editar Informações
                </Card.Header>
                <Card.Body>
                  <Form.Row>
                    <Col>
                      <Input label="Nome" type="text" name="name" onChange={e => setDataBody({...dataBody, name:e.target.value})} value={dataBody.name} />
                    </Col>
                    <Col>
                      <Input label="E-mail" type="email" name="email" />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Input label="Data de Nascimento" name="dt_birth" />
                  </Form.Row>
                  <Form.Row>
                
                  </Form.Row>        
                  <Button type="submit" className={`dropdown animate__animated animate__fadeInUp`}>Editar</Button>
                </Card.Body>
              </Card>
            </form>
          </Modal>
        </Col>
      </Row>

    </Container>
  )
}

export default Athlete
