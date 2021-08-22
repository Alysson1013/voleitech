import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { UserContext } from '../../../UserContext';
import { getAthletes } from '../../../Hooks/Api';

import Modal from '../../Modal';

import styles from './Athlete.module.css';

function Athlete() {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [athletes, setAthletes] = React.useState([])
  const [isActive, setIsActive] = useState(false)
  const [idAth, setIdAth] = useState('')

  const loadAtheletes = async () => {
    const response = await getAthletes(token)
    setAthletes(response.athletes)
  }

  React.useEffect(() => {
    loadAtheletes()
  }, [token])

  const handleModalOpen = (id) => {
    setIsActive(true)
    setIdAth(id)
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
                    {value.n_enrollment_atl}
                    <br />
                    <div className={styles.button}>
                      <button type="button" onClick={() => handleModalOpen(value.id)} >Ver mais...</button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          }
        </Row>
      </Col>
      <Modal id={idAth} isActive={isActive} setIsActive={setIsActive} loadAtheletes={loadAtheletes} />
    </>
  )
}

export default Athlete
