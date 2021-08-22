import React from 'react'
import styles from './DashboardMain.module.css'
import Options from '../Options/Options'
import { Container, Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Athletes from '../Athlete/Athletes'
import Team from '../Team/Team'
import Training from '../Training/Training'
import Scouts from '../Scouts/Scouts'
import Assistant from '../Assistant/Assistant'

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
  const location = useLocation()

  return (
    <Container className={`animate__animated animate__bounce animate__fadeInDown ${styles.dash}`} styles={{ width: '3%' }}>
      <Row>
        <Options />
        <Col className={`${styles.centerCol}`}>
          {
            location.pathname === '/dashboard' &&

            teste.map((value, index) => (
              <h1 key={index}>
                {value}
              </h1>
            )) ||
            location.pathname === '/dashboard/athletes' && < Athletes /> ||
            location.pathname === '/dashboard/teams' && <Team /> ||
            location.pathname === '/dashboard/trainings' && <Training /> ||
            location.pathname === '/dashboard/scouts' && <Scouts /> ||
            location.pathname === '/dashboard/assistants' && <Assistant />
          }
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardMain
