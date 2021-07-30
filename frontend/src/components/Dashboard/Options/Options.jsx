import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styles from './Options.module.css'
import athlete from '../../../Assets/athletics.png'
import team from '../../../Assets/team.png'
import training from '../../../Assets/training.png'
import assistant from '../../../Assets/assistant.png'
import user from '../../../Assets/user.png'
import { Link } from 'react-router-dom'

function Options() {
  return (
    <Col>
      <Row>
        <Link to="/dashboard/athletes">
          <p className={styles.caption}><img src={athlete} alt="O icône estilizada de um atleta" className={styles.icon} /> Atletas </p>
        </Link>
      </Row>
      <Row>
        <Link to="/dashboard/teams">
          <p className={styles.caption}><img src={team} alt="O icône estilizada de uma rede de pessoas" className={styles.icon} /> Equipes </p>
        </Link>
      </Row>
      <Row>
        <Link to="/dashboard/trainings">
          <p className={styles.caption}><img src={training} alt="O icône estilizada de uma mão erguendo um peso" className={styles.icon} /> Treinos </p>
        </Link>
      </Row>
      <Row>
        <Link to="/dashboard/assistants">
          <p className={styles.caption}><img src={assistant} alt="O icône estilizada de um rapaz com topete" className={styles.icon} /> Assistentes </p>
        </Link>
      </Row>
      <Row>
        <Link to="/dashboard/user">
          <p className={styles.caption}><img src={user} alt="O icône estilizada de um rapaz com topete" className={styles.icon} /> Minha Conta </p>
        </Link>
      </Row>
    </Col>
  )
}

export default Options
