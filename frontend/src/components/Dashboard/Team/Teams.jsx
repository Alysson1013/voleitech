import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAthletes } from '../../../Hooks/Api';
import { UserContext } from '../../../UserContext';

import styles from './Team.module.css'

const Teams = () => {
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
                    {value.n_enrollment_atl}
                    <br />
                    <Link to={`/team/${value.id}`}>Ver mais sobre a Equipe</Link>
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

export default Teams
