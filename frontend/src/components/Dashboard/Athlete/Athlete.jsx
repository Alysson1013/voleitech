import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './Athlete.module.css';
import { Container, Row, Col} from 'react-bootstrap';
import Options from '../Options/Options';


function Athlete() {

  const { id } = useParams()
  console.log(id)


  return (
    <Container className={`${styles.dash}`}>
      <Row>
        <Options />
        <Col className={`${styles.centerCol}`}>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Athlete
