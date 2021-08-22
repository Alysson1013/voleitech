import React from 'react'
import styles from './Athlete.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Options from '../Options/Options';
import { getAthleteById } from '../../../Hooks/Api';


function Athlete() {


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
