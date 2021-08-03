import React from 'react'
import styles from './DashboardMain.module.css'
import Options from '../Options/Options'
import { Container, Row, Col } from 'react-bootstrap'

function DashboardMain() {
  return (
    <Container className={`animate__animated animate__bounce animate__fadeInDown ${styles.dash}`}>
      <Row>
        <Options />
        <Col>
          Teste
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardMain
