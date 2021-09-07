import React, { useState } from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTeams } from '../../../Hooks/Api';
import { UserContext } from '../../../UserContext';

import styles from './Team.module.css';
import Modal from '../../Modal';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';

const Teams = () => {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [teams, setTeams] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [dataBody, setDataBody] = useState({
    name_category: '',
    gender: '',
    name: '',
    average_age: 0,
    average_height: 0,
    average_weight: 0,
    describe: ''
  })

  const loadTeams = async () => {
    const response = await getTeams(token)
    setTeams(response.teams)
  }

  const handleModalOpen = () => {
    setIsActive(true)
  }

  React.useEffect(() => {
    loadTeams()
  }, [token])

  console.log(teams)

  return (
    <>
      <Col className={`${styles.centerCol}`}>
        <Row>
          {
            teams && teams.map((value, index) => (
              <Card style={{ width: '18rem' }} key={index} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
                <Card.Header>{value.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{value.category.name_category}</Card.Title>
                  <Card.Text>
                    {value.describe}
                    <br />
                    <Link to={`/team/${value.id}`}>Ver mais sobre a Equipe</Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          }
          <Card style={{ width: '18rem' }} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
            <Card.Header>Nova Equipe</Card.Header>
            <Card.Body>
              <Card.Title>Inserir Equipe</Card.Title>
              <Card.Text>
                <Button type="button" onClick={handleModalOpen}>Adicionar</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Modal isActive={isActive} setIsActive={setIsActive} >
          <form>
            <Card>
              <Card.Header as="h1">
                Nova Equipe
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
                    <select name="categories" id="categories" className={styles.select} onChange={e => setDataBody({ ...dataBody, team_id: e.target.value })} value={dataBody.team_id}>
                      {
                        teams.map(team => (
                          <option value={team.id} selected >{team.name}</option>
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
                <Button type="submit" className={`dropdown animate__animated animate__fadeInUp`}>Adicionar</Button>
              </Card.Body>
            </Card>
          </form>
        </Modal>
      </Col>
    </>
  )
}

export default Teams
