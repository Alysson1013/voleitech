
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import { Pie } from 'react-chartjs-2'

import { getAthleteById, updateUser } from '../../../Hooks/Api';
import { UserContext } from '../../../UserContext';

import Chart from '../../Chart';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import Modal from '../../Modal';
import Options from '../Options/Options';

import styles from './Assistant.module.css'

export default function Assistant() {
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
  })
  const [stateChartPie, setStateChartPie] = useState({
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: []
  })

  const history = useHistory()
  const {id} = useParams()

  const loadAthlete = async () => {
    const response = await getAthleteById(token, id)
    setDataBody({
      ...dataBody,
      name: response.collaborator.name,
      email: response.collaborator.email,
      phone_1: response.collaborator.phone_1,
      function: response.collaborator.function,
      dt_birth: Number(moment(new Date()).year()) - Number(moment(response.collaborator.dt_birth).year())
    })
  }

  const loadChartData = async () => {
    setStateChartPie({
      ...stateChartPie,
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4'
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
          ],
          data: [65, 59, 80, 81, 56]
        }
      ]
    })
  }

  useEffect(() => {
    if(id) {
      loadAthlete()
      loadChartData()
    }
  }, [id])

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
              <span><b>Nome do Assistente:</b> {dataBody.name} </span>
              <span><b>Idade:</b> {dataBody.dt_birth} anos </span>
              <span><b>Telefone/Endereço:</b> {dataBody.phone_1} </span>
            </Col>
            <Col className={`${styles.graphicContainer}`}>
              <div>
                <Chart TypeChart={Pie} state={stateChartPie} className={`${styles.chartPie}`} />
              </div>
            </Col>
          </Row>
          <Row className={`${styles.contentButton}`} >
            <Button type="button" onClick={() => history.push('/dashboard/assistants')} >Voltar</Button>
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
                    <Col>
                      <Input label="Senha" type="password" name="password" />
                    </Col>
                    <Col>
                      <Input label="Confirmar Senha" type="password" name="password" />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Input label="Número de Inscrição" type="text" name="subscription" />
                    </Col>
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
