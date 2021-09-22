import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { UserContext } from '../../../UserContext';
import { getScouts } from '../../../Hooks/Api';
import DatePicker from "react-datepicker";

import Modal from '../../Modal';
import Button from '../../Forms/Button';
import styles from './Scouts.module.css';
import Input from '../../Forms/Input';

function Scouts() {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()
  const [scouts, setScouts] = useState([])

  const loadScouts = async () => {
    const response = await getScouts(token)
    setScouts(response.scouts)
  }

  React.useEffect(() => {
    loadScouts()
  }, [token])

  console.log(scouts)

  return (
    <>
      <Col className={`${styles.centerCol}`}>
        <Row>
          {
            scouts && scouts.map((value, index) => {
              if (value.id) {
                return (
                  <Card style={{ width: '18rem' }} key={index} className={`${styles.card} dropdown animate__animated animate__fadeInUp`}>
                    <Card.Header>{value.name}</Card.Header>
                    <Card.Body>
                      <Card.Title>Scout</Card.Title>
                      <Card.Text>
                        <Link to={`/scout/${value.id}`}>Ver mais sobre o Scout</Link>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
            } else return;
              
            })
          }
        </Row>
      </Col>
    </>
  )
}

export default Scouts
