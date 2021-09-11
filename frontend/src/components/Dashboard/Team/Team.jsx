import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

import { getTeamById, updateAthlete } from '../../../Hooks/Api';
import { UserContext } from '../../../UserContext';

import Options from '../Options/Options';
import Chart from '../../Chart';

import Button from '../../Forms/Button';
import Modal from '../../Modal';
import Input from '../../Forms/Input';

import styles from './Team.module.css';

export default function Team(){
    const { getToken } = useContext(UserContext);
    const token = getToken()

    const [isActive, setIsActive] = useState(false)
    const [idAth, setIdAth] = useState('')
    const [dataBody, setDataBody] = useState({
      name: '',
      describe: '',
      gender: '',
      average_age: 0,
      average_height: 0,
      average_weight: 0,
      category: ''
    })
    const [stateChartPie, setStateChartPie] = useState({
      labels: ['January', 'February', 'March',
               'April', 'May'],
      datasets: []
    })


    const history = useHistory()
    const { id } = useParams()

    const loadTeam = async () => {
      const response = await getTeamById(id, token)
      setDataBody({
        ...dataBody,
        name: response.team.name,
        describe: response.team.describe,
        gender: response.team.gender,
        average_age: response.team.average_age,
        average_height: response.team.average_height,
        average_weight: response.team.average_weight,
        category: response.team.category.name_category
      })
    }

    const loadChartData = async () => {
      setStateChartPie({
        ...stateChartPie,
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: '#22e7e7',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }
        ]
      })
    }

    console.log(id)

    useEffect(() => {
      if(id) {
        loadTeam()
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
        await updateAthlete(body, idAth, token)
        setIsActive(false)
      } catch (e) {
        console.log(e)
      }
    }

    console.log(dataBody)

    return (
      <Container className={`${styles.dash}`}>
        <Row>
          <Options />
          <Col className={`${styles.centerCol}`}>
            <Row className={`${styles.containerAbout}`} >
              <Col>
                <span><b>Nome da Equipe:</b> {dataBody.name} </span>
              </Col>
              <Col className={`${styles.graphicContainer}`}>
                <div>
                  <Chart TypeChart={Bar} state={stateChartPie} className={`${styles.chartPie}`} />
                </div>
              </Col>
            </Row>
            <Row className={`${styles.contentButton}`} >
              <Button type="button" onClick={() => history.push('/dashboard/teams')} >Voltar</Button>
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
