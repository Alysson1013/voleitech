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

import styles from './Scouts.module.css';

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
      setDataBody({
        ...dataBody,
        name: response.scout.name,
        v_floating_serve: response.scout.v_floating_serve,
        v_floating_serve_points: response.scout.v_floating_serve_points,
        v_floating_serve_mistake: response.scout.v_floating_serve_mistake,
        v_trip_serve: response.scout.v_trip_serve,
        v_trip_serve_points: response.scout.v_trip_serve_points,
        v_trip_serve_mistake: response.scout.v_trip_serve_mistake,
        v_attack: response.scout.v_attack,
        v_attack_points: response.scout.v_attack_points,
        v_attack_mistake: response.scout.v_attack_mistake,
        v_box_point: response.scout.v_box_point,
        v_block: response.scout.v_block,
        v_block_mistake: response.scout.v_block_mistake,
        v_block_used_mistake: response.scout.v_block_used_mistake,
        v_block_points: response.scout.v_block_points,
        v_general_passes: response.scout.v_general_passes,
        v_pass_mistake: response.scout.v_pass_mistake,
        v_pass_a: response.scout.v_pass_a,
        v_pass_b: response.scout.v_pass_b,
        v_pass_c: response.scout.v_pass_c,
        v_defense_general: response.scout.v_defense_general,
        v_defense_mistake: response.scout.v_defense_mistake,
        v_defense_a: response.scout.v_defense_a,
        v_defense_b: response.scout.v_defense_b,
        v_defense_c: response.scout.v_defense_c,
        v_lifting: response.scout.v_lifting,
        v_lifting_mistake: response.scout.v_lifting_mistake,
        v_lifting_correct: response.scout.v_lifting_correct,
        v_initiative: response.scout.v_initiative,
        v_initiative_lack: response.scout.v_initiative_lack

      })
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
                  {
                    dataBody.v_floating_serve && 
                    <span>
                      <b>Valor Saque Flutuante: </b> 
                      {dataBody.v_floating_serve}
                    </span>
                  }
                  {
                    dataBody.v_floating_serve_points &&
                    <span>
                      <b>Pontos Saque Flutuante: </b> 
                      {dataBody.v_floating_serve_points} 
                    </span>
                  }
                  {
                    dataBody.v_floating_serve_mistake &&
                    <span>
                      <b>Erros Saque Flutuante: </b> 
                      {dataBody.v_floating_serve_mistake} 
                    </span>
                  }
                  { 
                    dataBody.v_trip_serve && 
                    <span>
                      <b>Valor Saque Viagem: </b> 
                      {dataBody.v_trip_serve} 
                    </span>
                  }
                  {
                    dataBody.v_trip_serve_points &&
                    <span>
                      <b>Pontos de Saque Viagem: </b> 
                      {dataBody.v_trip_serve_points} 
                    </span>
                  }
                  {
                    dataBody.v_trip_serve_mistake &&
                    <span>
                      <b>Saque Viagem Erro: </b> 
                      {dataBody.v_trip_serve_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_attack &&
                    <span>
                      <b>Valor Ataque: </b> 
                      {dataBody.v_attack} 
                    </span>
                  }
                  {
                    dataBody.v_attack_points &&
                    <span>
                      <b>Pontos Ataque: </b> 
                      {dataBody.v_attack_points} 
                    </span>
                  }
                  {
                    dataBody.v_attack_mistake &&
                    <span>
                      <b>Ataque Erro: </b> 
                      {dataBody.v_attack_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_box_point &&
                    <span>
                      <b>Saque Caixinha: </b> 
                      {dataBody.v_box_point} 
                    </span>
                  }
                  {
                    dataBody.v_block &&
                    <span>
                      <b>Valor Bloqueio: </b> 
                      {dataBody.v_block} 
                    </span>
                  }
                  {
                    dataBody.v_block_mistake &&
                    <span>
                      <b>Erro Bloqueio: </b> 
                      {dataBody.v_block_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_block_mistake &&
                    <span>
                      <b>Erro Bloqueio: </b> 
                      {dataBody.v_block_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_block_points &&
                    <span>
                      <b>Pontos de Bloqueio: </b> 
                      {dataBody.v_block_points} 
                    </span>
                  }
                  {
                    dataBody.v_general_passes &&
                    <span>
                      <b>Passes Gerais: </b> 
                      {dataBody.v_general_passes} 
                    </span>
                  }
                  {
                    dataBody.v_pass_mistake &&
                    <span>
                      <b>Erros de Passe: </b> 
                      {dataBody.v_pass_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_pass_mistake &&
                    <span>
                      <b>Erros de Passe: </b> 
                      {dataBody.v_pass_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_pass_a &&
                    <span>
                      <b>Passe A: </b> 
                      {dataBody.v_pass_a} 
                    </span>
                  }
                  {
                    dataBody.v_pass_b &&
                    <span>
                      <b>Passe B: </b> 
                      {dataBody.v_pass_b} 
                    </span>
                  }
                  {
                    dataBody.v_pass_c &&
                    <span>
                      <b>Passe C: </b> 
                      {dataBody.v_pass_c} 
                    </span>
                  }
                  {
                    dataBody.v_defense_general &&
                    <span>
                      <b>Defesa Geral: </b> 
                      {dataBody.v_defense_general} 
                    </span>
                  }
                  {
                    dataBody.v_defense_mistake &&
                    <span>
                      <b>Erros de Defesa: </b> 
                      {dataBody.v_defense_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_defense_a &&
                    <span>
                      <b>Defesa A: </b> 
                      {dataBody.v_defense_a} 
                    </span>
                  }
                  {
                    dataBody.v_defense_b &&
                    <span>
                      <b>Defesa B: </b> 
                      {dataBody.v_defense_b} 
                    </span>
                  }
                  {
                    dataBody.v_defense_c &&
                    <span>
                      <b>Defesa C: </b> 
                      {dataBody.v_defense_c} 
                    </span>
                  }
                  {
                    dataBody.v_lifting &&
                    <span>
                      <b>Valor Levantamento: </b> 
                      {dataBody.v_lifting} 
                    </span>
                  }
                  {
                    dataBody.v_lifting_mistake &&
                    <span>
                      <b>Erros de Levantamento: </b> 
                      {dataBody.v_lifting_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_lifting_correct &&
                    <span>
                      <b>Levantamento Correto: </b> 
                      {dataBody.v_lifting_correct}
                    </span>
                  }
                  {
                    dataBody.v_initiative &&
                    <span>
                      <b>Iniciativa: </b> 
                      {dataBody.v_initiative} 
                    </span>
                  }
                  {
                    dataBody.v_initiative_lack &&
                    <span>
                      <b>Falta de Iniciativa:</b> 
                      {dataBody.v_initiative_lack} 
                    </span>
                  }
                </Col>
            </Row>
            <Row className={`${styles.contentButton}`} >
              <Button type="button" onClick={() => history.push('/dashboard/scouts')} >Voltar</Button>
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
