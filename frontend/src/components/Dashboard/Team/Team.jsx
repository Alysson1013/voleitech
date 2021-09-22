import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

import { getTeamById, getCategories, updateTeam } from '../../../Hooks/Api';
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
    const [categories, setCategories] = useState([])
    const [dataBody, setDataBody] = useState({
      name: '',
      describe: '',
      gender: '',
      average_age: 0,
      average_height: 0,
      average_weight: 0,
      category: '',
      category_id: 0,
      collaborators: []
    })
    const [stateChartPie, setStateChartPie] = useState({
      labels: ['Idade', 'Altura', 'Peso'],
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
        category: response.team.category.name_category,
        collaborators: response.team.collaborators,
        category_id: response.team.category_id
      })
    }

    const loadChartData = async () => {
      setStateChartPie({
        ...stateChartPie,
        datasets: [
          {
            label: 'Medidas dos Atletas da Equipe',
            backgroundColor: 'rgba(255,	187,	17, 0.7)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [dataBody.average_age, dataBody.average_height, dataBody.average_weight]
          }
        ]
      })
    }

    const loadCategories = async () => {
      const response = await getCategories(token)
      setCategories(response.categories)
    }

    console.log(id)

    useEffect(() => {
      if(id) {
        loadTeam()
      }
    }, [id])

    useEffect(() => {
      loadChartData()
    }, [dataBody])

    useEffect(() => {
      loadCategories()
    }, [token])

    const handleModalOpen = (id) => {
      setIsActive(true)
      setIdAth(id)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      console.log(dataBody)

      const body = {
        name: dataBody.name,
        gender: dataBody.gender,
        category_id: dataBody.category_id,
        average_age: dataBody.average_age,
        average_height: dataBody.average_height,
        average_weight: dataBody.average_weight,
        describe: dataBody.describe
      }

      try {
        await updateTeam(idAth, body, token)
        loadTeam()
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
                  <span><b>Nome:</b> {dataBody.name} </span>
                  <span><b>Categoria:</b> {dataBody.category} </span>
                  <span><b>Genêro:</b> {dataBody.gender === 'male' ? 'Masculino' : 'Feminino'} </span>
                  <span><b>Descrição:</b> {dataBody.describe} </span>
                  <span><b>Membros da Equipe</b></span>
                  {
                    dataBody.collaborators.map(value => (
                      <span>{value.name} - {value.function === "athlete" ? "Atleta" : value.function === "assistant" ? "Assistente" : "Atleta e Assistente"}</span>
                    ))
                  }
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
                      <Input label="Nome" type="text" name="name" onChange={e => setDataBody({ ...dataBody, name: e.target.value })} value={dataBody.name} />
                    </Col>
                    <Col>
                      <label htmlFor="gender">Sexo</label>
                      <select name="gender" id="gender" className={styles.select} onChange={e => setDataBody({ ...dataBody, gender: e.target.value })} value={dataBody.gender}>
                        <option value="male" selected>Masculino</option>
                        <option value="female">Feminino</option>
                      </select>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Input label="Altura Média" type="number" name="average_height" onChange={e => setDataBody({ ...dataBody, average_height: e.target.value })} value={dataBody.average_height} />
                    </Col>
                    <Col>
                      <Input label="Peso Médio" type="number" name="average_weight" onChange={e => setDataBody({ ...dataBody, average_weight: e.target.value })} value={dataBody.average_weight} />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Input label="Idade Média" type="number" name="average_age" onChange={e => setDataBody({ ...dataBody, average_age: e.target.value })} value={dataBody.average_age} />
                    </Col>
                    <Col>
                      <label htmlFor="categories">Categoria</label>
                      <select name="categories" id="categories" className={styles.select} onChange={e => setDataBody({ ...dataBody, category_id: e.target.value })} value={dataBody.category_id}>

                        {
                          categories.map(category => (
                            dataBody.category_id === category.id ? 
                            <option value={category.id} selected>{category.name_category}</option> :
                            <option value={category.id}>{category.name_category}</option>
                          ))
                        }
                      </select>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Input label="Descrição" type="text" name="describe" onChange={e => setDataBody({ ...dataBody, describe: e.target.value })} value={dataBody.describe} />
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
