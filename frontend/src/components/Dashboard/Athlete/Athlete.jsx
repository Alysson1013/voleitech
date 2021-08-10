import React from 'react';
import styles from './Athlete.module.css';
import Options from '../Options/Options';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../../UserContext';
import { getAthletes } from '../../../Hooks/Api';

function Athlete() {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [athletes, setAthletes] = React.useState(null)

  async function fetchAthletes(){
    const response = await getAthletes(token)
    setAthletes(response.athletes)
    console.log(response.athletes)
  } 

  React.useEffect(() => {
    fetchAthletes()
  }, [token])


  return (
      <Container className={`${styles.dash}`}>
        <Row>
          <Options />
          <Col className={`${styles.centerCol}`}>
            {

            }
          </Col>
        </Row>
      </Container>
  )
}

export default Athlete
