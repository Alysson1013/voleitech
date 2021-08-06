import React from 'react'
import styles from './DashboardMain.module.css'
import Options from '../Options/Options'
import { Container, Row, Col } from 'react-bootstrap'

const teste = [
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1",
  "teste1"
]

function DashboardMain() {
  return (
      <Container className={`animate__animated animate__bounce animate__fadeInDown ${styles.dash}`}>
        <Row>
          <Options />
          <Col className={`${styles.centerCol}`}>
            {
              teste.map((value, index) => (
                <h1 key={index}>
                  {value}
                </h1>
              ))
            }
          </Col>
        </Row>
      </Container>
  )
}

export default DashboardMain
