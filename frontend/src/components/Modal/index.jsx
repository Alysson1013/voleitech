import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import { Card, Col, Form } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa'
import { getAthleteById, updateUser } from '../../Hooks/Api';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Input from '../Forms/Input';

import "react-datepicker/dist/react-datepicker.css";
import './styles.css'
import Button from '../Forms/Button';

export default function Modal({ id, isActive, setIsActive, loadAtheletes }) {
  const [athlete, setAthlete] = useState({})
  const [name, setName] = useState('')

  const dataBody = {
    name,
    email: useForm('email'),
    password: useForm('password'),
    password2: useForm(),
    subscription: useForm('number')
  }

  const [startDate, setStartDate] = React.useState(new Date());

  const { getToken } = React.useContext(UserContext);
  const token = getToken()

  const loadAthelete = async () => {
    const response = await getAthleteById(token, id)
    setAthlete(response.collaborator)
    setName(response.collaborator.name)
  }

  useEffect(() => {
    if (isActive) {
      loadAthelete()
    }
  }, [isActive])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      name: dataBody.name,
    }

    try {
      await updateUser(body, id, token)
      loadAtheletes()
      setIsActive(false)
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <div className={isActive ? "modal-container active" : "modal-container"}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <Card>
            <Card.Header as="h1">
              Editar Informações
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Col>
                  <Input label="Nome" type="text" name="name" onChange={e => setName(e.target.value)} value={dataBody.name} />
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
                <Col>
                  <label htmlFor={name} >
                    Data de Nascimento
                  </label>
                  <DatePicker locale="pt-BR" name="date" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                </Col>
              </Form.Row>
              <Button type="submit" className={`dropdown animate__animated animate__fadeInUp`}>Editar</Button>
            </Card.Body>
          </Card>
        </form>
      </div>
      <button type="button" className="btn-close" onClick={() => setIsActive(false)} >
        <FaTimes size={18} />
      </button>
    </div>
  )
}
