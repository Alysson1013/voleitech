import React, { useEffect, useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import moment from 'moment'

import Modal from '../../Modal'
import Input from '../../Forms/Input';
import Button from '../../Forms/Button'
import Options from '../Options/Options';

import { UserContext } from '../../../UserContext';
import { getAthleteById, updateAssistant, deleteCollaborator } from '../../../Hooks/Api';

import styles from './Assistant.module.css';

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
    n_enrollment_ast: '',
    positions: '',
    n_uniform: 0,
    height: 0,
    weight: 0,
    width: 0,
    gender: '',
    bmi: 0,
    jump_distance: 0,
    jump_height: 0,
  })

  const history = useHistory()
  const { id } = useParams()

  const loadAthlete = async () => {
    const response = await getAthleteById(token, id)
    console.log("Esse Aqui: ")
    console.log(response)
    setDataBody({
      ...dataBody,
      name: response.collaborator.name,
      email_1: response.collaborator.email_1,
      phone_1: response.collaborator.phone_1,
      function: response.collaborator.function,
      dt_birth: Number(moment(new Date()).year()) - Number(moment(response.collaborator.dt_birth).year()),
      n_enrollment_ast: response.collaborator.n_enrollment_ast,
      gender: response.collaborator.gender,
    })
  }

  console.log(dataBody)

  useEffect(() => {
    if (id) {
      loadAthlete()
    }
  }, [id])

  const handleModalOpen = (id) => {
    setIsActive(true)
    setIdAth(id)
  }

  const hadleDeleteButton = async (id, token) => {
    const isDelete = window.confirm("Você tem certeza que deseja deletar esse atleta?")
    console.log(id + " - " + token)
    if (isDelete === true) {
      console.log(id + " - " + token)
      await deleteCollaborator(id, token)
      history.push('/dashboard/assistants')
    }
  }

  console.log()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      name: dataBody.name,
      email_1: dataBody.email_1,
      phone_1: dataBody.phone_1,
      n_enrollment_ast: dataBody.n_enrollment_ast,
      function: dataBody.function,
      gender: dataBody.gender,
    }

    try {
      await updateAssistant(body, idAth, token)
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
                <span><b className={styles.label}>Função:</b> {dataBody.function === "athlete" ? "Atleta" : dataBody.function === "both" ? "Ambos" : "Assistente"} </span>
                <span><b className={styles.label}>Inscrição:</b> {dataBody.n_enrollment_ast} </span>
              </Row>
              <Row>
                <span><b className={styles.label}>Genêro:</b> {dataBody.gender === "male" ? "Masculino" : "Fêminino"} </span>
              </Row>
            </Col>
          </Row>
          <Row className={`${styles.contentButton}`} >
            <Button type="button" onClick={() => hadleDeleteButton(id, token)} >Deletar</Button>
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
                      <Input label="Nome" type="text" name="name" onChange={e => setDataBody({ ...dataBody, name: e.target.value })} value={dataBody.name} />
                    </Col>
                    <Col>
                      <Input label="E-mail" type="email" name="email_1" onChange={e => setDataBody({ ...dataBody, email_1: e.target.value })} value={dataBody.email_1} />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Input label="Telefone" type="text" name="phone_1" onChange={e => setDataBody({ ...dataBody, phone_1: e.target.value })} value={dataBody.phone_1} />
                    </Col>
                    <Col>
                      <Input label="Número de Cadastro" type="number" name="n_enrollment_ast" onChange={e => setDataBody({ ...dataBody, n_enrollment_ast: e.target.value })} value={dataBody.n_enrollment_ast} />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <label htmlFor="function">Função</label>
                      <select name="function" id="function" className={styles.select} onChange={e => setDataBody({ ...dataBody, function: e.target.value })} value={dataBody.function}>
                        <option value="athlete"  selected >Atleta</option>
                        <option value="both">Atleta e Assistente</option>
                      </select>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <label htmlFor="gender">Genero</label>
                      <select name="gender" id="gender" className={styles.select} onChange={e => setDataBody({ ...dataBody, gender: e.target.value })} value={dataBody.gender}>
                        <option value="male" selected>Masculino</option>
                        <option value="female">Feminino</option>
                      </select>
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

export default Athlete