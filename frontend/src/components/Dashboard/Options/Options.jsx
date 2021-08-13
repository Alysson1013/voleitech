import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styles from './Options.module.css'
import athlete from '../../../Assets/athletics.png'
import team from '../../../Assets/team.png'
import training from '../../../Assets/training.png'
import assistant from '../../../Assets/assistant.png'
import scout from '../../../Assets/scout.png'
import user from '../../../Assets/user.png'
import { Link } from 'react-router-dom'

function Options() {
  return (
    <Col md={2}>
      <div className={styles.column}>
        <Row className={styles.row}>
          <Link to="/dashboard/athletes" className={`${styles.nav} ${styles.first}`} style={{ textDecoration: 'none' }}>
            <p className={styles.caption}><img src={athlete} alt="O icône estilizada de um atleta" className={styles.icon} /> Atletas </p>
          </Link>
        </Row>
        <Row className={styles.row}>
          <Link to="/dashboard/teams" className={styles.nav} style={{ textDecoration: 'none' }}>
            <p className={styles.caption}><img src={team} alt="O icône estilizada de uma rede de pessoas" className={styles.icon} /> Equipes </p>
          </Link>
        </Row>
        <Row className={styles.row}>
          <Link to="/dashboard/trainings" className={styles.nav} style={{ textDecoration: 'none' }}>
            <p className={styles.caption}><img src={training} alt="O icône estilizada de uma mão erguendo um peso" className={styles.icon} /> Treinos </p>
          </Link>
        </Row>
        <Row className={styles.row}>
          <Link to="/dashboard/scouts" className={styles.nav} style={{ textDecoration: 'none' }}>
            <p className={styles.caption}><img src={scout} alt="O icône estilizada de uma tabela" className={styles.icon} /> Scouts </p>
          </Link>
        </Row>
        <Row className={styles.row}>
          <Link to="/dashboard/assistants" className={`${styles.nav} ${styles.last}`} style={{ textDecoration: 'none' }}>
            <p className={styles.caption}><img src={assistant} alt="O icône estilizada de um rapaz com topete" className={styles.icon} /> Assistentes </p>
          </Link>
        </Row>
        <Row className={styles.row}>
          <Link to="/dashboard/user" className={styles.nav} style={{ textDecoration: 'none' }}>
            <p className={styles.caption}><img src={user} alt="O icône estilizada de um rapaz com topete" className={styles.icon} /> Minha Conta </p>
          </Link>
        </Row>
      </div>
    </Col>
  )
}

export default Options
