import React from 'react';
import { Link } from 'react-router-dom'
import {  Row, Col, Card } from 'react-bootstrap';
import { UserContext } from '../../../UserContext';
import {  getAthletes } from '../../../Hooks/Api';

import styles from './Athlete.module.css';

function Athlete() {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [athletes, setAthletes] = React.useState([])

  const loadAtheletes = async () => {
    const response = await getAthletes(token)
    setAthletes(response.athletes)
  }

  React.useEffect(() => {
    loadAtheletes()
  }, [token])


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
        </Row>
      </Col>
    </>
  )
}

export default Athlete
