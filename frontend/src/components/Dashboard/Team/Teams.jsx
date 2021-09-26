import React, { useState } from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createTeam, getCategories, getTeams, createCategory } from '../../../Hooks/Api';
import { UserContext } from '../../../UserContext';

import styles from './Team.module.css';
import Modal from '../../Modal';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';

const Teams = () => {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [teams, setTeams] = useState([])
  const [categories, setCategories] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [dataBody, setDataBody] = useState({
    name_category: '',
    gender: '',
    name: '',
    average_age: 0,
    average_height: 0,
    average_weight: 0,
    describe: '',
    category_id: 0
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      name: dataBody.name,
      gender: dataBody.gender,
      category_id: dataBody.category_id,
      average_age: dataBody.average_age,
      average_height: dataBody.average_height,
      average_weight: dataBody.average_weight,
      describe: dataBody.describe
    }

    console.log("Aqui")
    console.log(body)

    try {
      await createTeam(body, token)
      setIsActive(false)
      loadTeams()
    } catch (error) {
      console.log(error)
    }
  }

  const loadTeams = async () => {
    const response = await getTeams(token)
    setTeams(response.teams)
  }

  const loadCategories = async () => {
    const response = await getCategories(token)
    setCategories(response.categories)
  }

  const handleModalOpen = () => {
    setIsActive(true)
  }

  React.useEffect(() => {
    loadTeams()
  }, [token])

  React.useEffect(() => {
    loadCategories()
  }, [token])

  async function newCategory(e){
    e.preventDefault()

    const name = prompt("Digite o nome da categoria")
    const describe = prompt("Digite a descrição da categoria")

    await createCategory({
      name_category: name,
      describe: describe
    }, token)

    loadCategories()
  }

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
          <form onSubmit={handleSubmit}>
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
                    <select name="categories" id="categories" className={styles.select} onChange={e => setDataBody({ ...dataBody, category_id: e.target.value })} value={dataBody.category_id}>
                      {
                        categories.map(category => (
                          <option value={category.id} selected >{category.name_category}</option>
                        ))
                      }
                    </select>
                    <p className={styles.category} onClick={newCategory}>Nova Categoria</p>
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
