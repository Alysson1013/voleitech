import React from 'react'
import styles from './DashboardMain.module.css'
import Options from '../Options/Options'
import { Container, Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Athletes from '../Athlete/Athletes'
import Training from '../Training/Trainings'
import Scouts from '../Scouts/Scouts'
import Teams from '../Team/Teams'
import Assistants from '../Assistant/Assistants'
import User from '../User/User'

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
            location.pathname === '/dashboard/teams' && <Teams /> ||
            location.pathname === '/dashboard/trainings' && <Training /> ||
            location.pathname === '/dashboard/scouts' && <Scouts /> ||
            location.pathname === '/dashboard/assistants' && <Assistants /> ||
            location.pathname === '/dashboard/user' && <User />
          }
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardMain
