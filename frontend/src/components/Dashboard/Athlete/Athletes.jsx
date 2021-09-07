import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { UserContext } from '../../../UserContext';
import { getAthletes, getTeams } from '../../../Hooks/Api';
import DatePicker from "react-datepicker";

import Modal from '../../Modal';
import Button from '../../Forms/Button';
import styles from './Athlete.module.css';
import Input from '../../Forms/Input';
import { createAthlete } from '../../../Hooks/Api'

function Athlete() {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [athletes, setAthletes] = useState([])
  const [teams, setTeams] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [isActive, setIsActive] = useState(false)
  const [dataBody, setDataBody] = useState({
    name: '',
    email: '',
    phone_1: '',
    function: '',
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
    dt_birth: "",
    team_id: 0,
    team_function: "",
    adresses: [],
  })

  const loadAtheletes = async () => {
    const response = await getAthletes(token)
    setAthletes(response.athletes)
  }

  const loadTeams = async () => {
    const response = await getTeams(token)
    setTeams(response.teams)
  }

  React.useEffect(() => {
    loadAtheletes()
    loadTeams()
  }, [token])

  const handleModalOpen = () => {
    setIsActive(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let year = startDate.getFullYear()
    let month = startDate.getMonth()
    let day = startDate.getDate()

    const body = {
      name: dataBody.name,
      email_1: dataBody.email_1,
      dt_birth: `${year}-${month}-${day}`,
      phone_1: dataBody.phone_1,
      n_enrollment_atl: dataBody.n_enrollment_atl,
      function: dataBody.function,
      positions: dataBody.positions,
      n_uniform: dataBody.n_uniform,
      height: dataBody.height,
      weight: dataBody.weight,
      width: dataBody.width,
      gender: dataBody.gender,
      bmi: dataBody.bmi,
      jump_distance: dataBody.jump_distance,
      jump_height: dataBody.jump_height,
      describe: dataBody.describe,
      team_id: dataBody.team_id,
      team_function: dataBody.team_function
    }

    try {
      await createAthlete(body, token)
      setIsActive(false)
      loadAtheletes()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Col className={`${styles.centerCol}`}>
        <Row>
          {
            athletes && athletes.map((value, index) => (
              <Card style={{ width: '18rem' }} key={index} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
                <Card.Header>{value.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{value.teams[0].name}</Card.Title>
                  <Card.Text>
                    <Link to={`/athlete/${value.id}`}>Ver mais sobre o Atleta</Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          }
          <Card style={{ width: '18rem' }} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
            <Card.Header>Novo Atleta</Card.Header>
            <Card.Body>
              <Card.Title>Adicionar Atleta</Card.Title>
              <Card.Text>
                <Button type="button" onClick={handleModalOpen}>Adicionar</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Col>
      <Modal isActive={isActive} setIsActive={setIsActive} >
        <form onSubmit={handleSubmit}>
          <Card>
            <Card.Header as="h1">
              Novo Atleta
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
                  <Input label="Número de Cadastro" type="number" name="n_enrollment_atl" onChange={e => setDataBody({ ...dataBody, n_enrollment_atl: e.target.value })} value={dataBody.n_enrollment_atl} />
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
                <Col>
                  <Input label="Posições" type="text" name="positions" onChange={e => setDataBody({ ...dataBody, positions: e.target.value })} value={dataBody.positions} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input label="Nº Uniforme" type="number" name="n_uniform" onChange={e => setDataBody({ ...dataBody, n_uniform: e.target.value })} value={dataBody.n_uniform} />
                </Col>
                <Col>
                  <Input label="Altura" type="number" name="height" onChange={e => setDataBody({ ...dataBody, height: e.target.value })} value={dataBody.height} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input label="Envergadura" type="number" name="width" onChange={e => setDataBody({ ...dataBody, width: e.target.value })} value={dataBody.width} />
                </Col>
                <Col>
                  <Input label="Peso" type="number" name="weight" onChange={e => setDataBody({ ...dataBody, weight: e.target.value })} value={dataBody.weight} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <label htmlFor="gender">Genero</label>
                  <select name="gender" id="gender" className={styles.select} onChange={e => setDataBody({ ...dataBody, gender: e.target.value })} value={dataBody.gender}>
                    <option value="male"  selected>Masculino</option>
                    <option value="female">Feminino</option>
                  </select>
                </Col>
                <Col>
                  <Input label="BMI" type="number" name="bmi" onChange={e => setDataBody({ ...dataBody, bmi: e.target.value })} value={dataBody.bmi} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Input label="Salto Distancia" type="number" name="jump_distance" onChange={e => setDataBody({ ...dataBody, jump_distance: e.target.value })} value={dataBody.jump_distance} />
                </Col>
                <Col>
                  <Input label="Salto de Altura" type="number" name="jump_height" onChange={e => setDataBody({ ...dataBody, jump_height: e.target.value })} value={dataBody.jump_height} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <label htmlFor="date" className={styles.label}>
                    Data de Nascimento
                  </label>
                  <DatePicker locale="pt-BR" className={styles.date} name="date" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                </Col>
                <Col>
                  <Input label="Descrição" type="text" name="describe" onChange={e => setDataBody({ ...dataBody, describe: e.target.value })}/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <label htmlFor="team">Time Inicial</label>
                  <select name="team" id="team" className={styles.select} onChange={e => setDataBody({ ...dataBody, team_id: e.target.value })} value={dataBody.team_id}>
                    {
                      teams.map(team => (
                        <option value={team.id} selected >{team.name}</option>
                      ))
                    }
                  </select>
                </Col>
                <Col>
                  <label htmlFor="team_function">Função na Equipe</label>
                  <select name="team_function" id="team_function" className={styles.select} onChange={e => setDataBody({ ...dataBody, team_function: e.target.value })} value={dataBody.team_function}>
                        <option value="athlete" selected >Atleta</option>
                        <option value="both" >Atleta e Assistente</option>
                  </select>
                </Col>
              </Form.Row>
              <Button type="submit" className={`dropdown animate__animated animate__fadeInUp`}>Adicionar</Button>
            </Card.Body>
          </Card>
        </form>
      </Modal>
    </>
  )
}

export default Athlete
