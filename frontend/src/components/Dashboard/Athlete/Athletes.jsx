import React from 'react';
import styles from './Athlete.module.css';
import Options from '../Options/Options';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { UserContext } from '../../../UserContext';
import { getAthletes } from '../../../Hooks/Api';
import { Link } from 'react-router-dom'

function Athlete() {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [athletes, setAthletes] = React.useState([])

  React.useEffect(() => {
    async function fetchAthletes() {
      const response = await getAthletes(token)
      setAthletes(response.athletes)
    }

    fetchAthletes()
  }, [token])

  return (
    <Container className={`${styles.dash}`}>
      <Row>
        <Options />
        <Col className={`${styles.centerCol}`}>
          <Row>
            {
              athletes.map((value, index) => (
                <Card style={{ width: '18rem' }} key={index} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
                  <Card.Header>{value.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>{value.teams[0].name}</Card.Title>
                    <Card.Text>
                      {value.n_enrollment_atl}
                      <br />
                      <div className={styles.button}>
                        <Link to={`${value.id}`}>Ver mais...</Link>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            }
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Athlete
