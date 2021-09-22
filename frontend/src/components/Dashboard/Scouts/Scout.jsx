import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

import { getScoutById } from '../../../Hooks/Api';
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
      id: 0,
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


    const history = useHistory()
    const { id } = useParams()

    const loadScout = async () => {
      const response = await getScoutById(token, id)
      
    }

    useEffect(() => {
      if(id) {
        loadScout()
      }
    }, [id])


    const handleModalOpen = (id) => {
      setIsActive(true)
      setIdAth(id)
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
            </Row>

            <Row className={`${styles.contentButton}`} >
              <Button type="button" onClick={() => history.push('/dashboard/teams')} >Voltar</Button>
              <Button type="button" onClick={() => handleModalOpen(id)} >Editar</Button>
            </Row>
            <Modal isActive={isActive} setIsActive={setIsActive} >
              <form>
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
