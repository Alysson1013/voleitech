import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

import { getScoutById, updateScout } from '../../../Hooks/Api';
import { UserContext } from '../../../UserContext';

import Options from '../Options/Options';
import Chart from '../../Chart';

import Button from '../../Forms/Button';
import Modal from '../../Modal';
import Input from '../../Forms/Input';

import styles from './Scouts.module.css';

export default function Team(){
    const { getToken } = useContext(UserContext);
    const token = getToken()

    const [isActive, setIsActive] = useState(false)
    const [idAth, setIdAth] = useState('')
    const [categories, setCategories] = useState([])
    const [dataBody, setDataBody] = useState({
      id: 0,
      name: '',
      v_floating_serve: 0,
      v_floating_serve_points: 0,
      v_floating_serve_mistake: 0,
      v_trip_serve: 0,
      v_trip_serve_points: 0,
      v_trip_serve_mistake: 0,
      v_attack: 0,
      v_attack_points: 0,
      v_attack_mistake: 0,
      v_box_point: 0,
      v_block: 0,
      v_block_mistake: 0,
      v_block_used_mistake: 0,
      v_block_points: 0,
      v_general_passes: 0,
      v_pass_mistake: 0,
      v_pass_a: 0,
      v_pass_b: 0,
      v_pass_c: 0,
      v_defense_general: 0,
      v_defense_mistake: 0,
      v_defense_a: 0,
      v_defense_b: 0,
      v_defense_c: 0,
      v_lifting: 0,
      v_lifting_mistake: 0,
      v_lifting_correct: 0,
      v_initiative: 0,
      v_initiative_lack: 0
    })


    const history = useHistory()
    const { id } = useParams()

    const loadScout = async () => {
      const response = await getScoutById(token, id)
      setDataBody({
        ...dataBody,
        name: response.scout.name,
        v_floating_serve: response.scout.v_floating_serve,
        v_floating_serve_points: response.scout.v_floating_serve_points,
        v_floating_serve_mistake: response.scout.v_floating_serve_mistake,
        v_trip_serve: response.scout.v_trip_serve,
        v_trip_serve_points: response.scout.v_trip_serve_points,
        v_trip_serve_mistake: response.scout.v_trip_serve_mistake,
        v_attack: response.scout.v_attack,
        v_attack_points: response.scout.v_attack_points,
        v_attack_mistake: response.scout.v_attack_mistake,
        v_box_point: response.scout.v_box_point,
        v_block: response.scout.v_block,
        v_block_mistake: response.scout.v_block_mistake,
        v_block_used_mistake: response.scout.v_block_used_mistake,
        v_block_points: response.scout.v_block_points,
        v_general_passes: response.scout.v_general_passes,
        v_pass_mistake: response.scout.v_pass_mistake,
        v_pass_a: response.scout.v_pass_a,
        v_pass_b: response.scout.v_pass_b,
        v_pass_c: response.scout.v_pass_c,
        v_defense_general: response.scout.v_defense_general,
        v_defense_mistake: response.scout.v_defense_mistake,
        v_defense_a: response.scout.v_defense_a,
        v_defense_b: response.scout.v_defense_b,
        v_defense_c: response.scout.v_defense_c,
        v_lifting: response.scout.v_lifting,
        v_lifting_mistake: response.scout.v_lifting_mistake,
        v_lifting_correct: response.scout.v_lifting_correct,
        v_initiative: response.scout.v_initiative,
        v_initiative_lack: response.scout.v_initiative_lack
      })
    }

    useEffect(() => {
      if(id) {
        loadScout()
      }
    }, [id])

    const handleSubmit = async (e) => {
      e.preventDefault()

      const body = {
          name: dataBody.name,
          v_floating_serve: dataBody.v_floating_serve,
          v_floating_serve_points: dataBody.v_floating_serve_points,
          v_floating_serve_mistake: dataBody.v_floating_serve_mistake,
          v_trip_serve: dataBody.v_trip_serve,
          v_trip_serve_points: dataBody.v_trip_serve_points,
          v_trip_serve_mistake: dataBody.v_trip_serve_mistake,
          v_attack: dataBody.v_attack,
          v_attack_points: dataBody.v_attack_points,
          v_attack_mistake: dataBody.v_attack_mistake,
          v_box_point: dataBody.v_box_point,
          v_block: dataBody.v_block,
          v_block_mistake: dataBody.v_block_mistake,
          v_block_used_mistake: dataBody.v_block_used_mistake,
          v_block_points: dataBody.v_block_points,
          v_general_passes: dataBody.v_general_passes,
          v_pass_mistake: dataBody.v_pass_mistake,
          v_pass_a: dataBody.v_pass_a,
          v_pass_b: dataBody.v_pass_b,
          v_pass_c: dataBody.v_pass_c,
          v_defense_general: dataBody.v_defense_general,
          v_defense_mistake: dataBody.v_defense_mistake,
          v_defense_a: dataBody.v_defense_a,
          v_defense_b: dataBody.v_defense_b,
          v_defense_c: dataBody.v_defense_c,
          v_lifting: dataBody.v_lifting,
          v_lifting_mistake: dataBody.v_lifting_mistake,
          v_lifting_correct: dataBody.v_lifting_correct,
          v_initiative: dataBody.v_initiative,
          v_initiative_lack: dataBody.v_initiative_lack,
      }
      
      try {
        await updateScout(id, body, token)
        loadScout()
        setIsActive(false)
      } catch (e) {
        console.log(e)
      }
    }

    const handleModalOpen = (id) => {
      setIsActive(true)
      setIdAth(id)
    }

    return (
      <Container className={`${styles.dash}`}>
        <Row>
          <Options />
          <Col className={`${styles.centerCol}`}>
            <Row className={`${styles.containerAbout}`} >
                <Col>
                  <span><b>Nome:</b> {dataBody.name} </span>
                  {
                    dataBody.v_floating_serve && 
                    <span>
                      <b>Valor Saque Flutuante: </b> 
                      {dataBody.v_floating_serve}
                    </span>
                  }
                  {
                    dataBody.v_floating_serve_points &&
                    <span>
                      <b>Pontos Saque Flutuante: </b> 
                      {dataBody.v_floating_serve_points} 
                    </span>
                  }
                  {
                    dataBody.v_floating_serve_mistake &&
                    <span>
                      <b>Erros Saque Flutuante: </b> 
                      {dataBody.v_floating_serve_mistake} 
                    </span>
                  }
                  { 
                    dataBody.v_trip_serve && 
                    <span>
                      <b>Valor Saque Viagem: </b> 
                      {dataBody.v_trip_serve} 
                    </span>
                  }
                  {
                    dataBody.v_trip_serve_points &&
                    <span>
                      <b>Pontos de Saque Viagem: </b> 
                      {dataBody.v_trip_serve_points} 
                    </span>
                  }
                  {
                    dataBody.v_trip_serve_mistake &&
                    <span>
                      <b>Saque Viagem Erro: </b> 
                      {dataBody.v_trip_serve_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_attack &&
                    <span>
                      <b>Valor Ataque: </b> 
                      {dataBody.v_attack} 
                    </span>
                  }
                  {
                    dataBody.v_attack_points &&
                    <span>
                      <b>Pontos Ataque: </b> 
                      {dataBody.v_attack_points} 
                    </span>
                  }
                  {
                    dataBody.v_attack_mistake &&
                    <span>
                      <b>Ataque Erro: </b> 
                      {dataBody.v_attack_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_box_point &&
                    <span>
                      <b>Saque Caixinha: </b> 
                      {dataBody.v_box_point} 
                    </span>
                  }
                  {
                    dataBody.v_block &&
                    <span>
                      <b>Valor Bloqueio: </b> 
                      {dataBody.v_block} 
                    </span>
                  }
                  {
                    dataBody.v_block_mistake &&
                    <span>
                      <b>Erro Bloqueio: </b> 
                      {dataBody.v_block_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_block_mistake &&
                    <span>
                      <b>Erro Bloqueio: </b> 
                      {dataBody.v_block_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_block_points &&
                    <span>
                      <b>Pontos de Bloqueio: </b> 
                      {dataBody.v_block_points} 
                    </span>
                  }
                  {
                    dataBody.v_general_passes &&
                    <span>
                      <b>Passes Gerais: </b> 
                      {dataBody.v_general_passes} 
                    </span>
                  }
                  {
                    dataBody.v_pass_mistake &&
                    <span>
                      <b>Erros de Passe: </b> 
                      {dataBody.v_pass_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_pass_a &&
                    <span>
                      <b>Passe A: </b> 
                      {dataBody.v_pass_a} 
                    </span>
                  }
                  {
                    dataBody.v_pass_b &&
                    <span>
                      <b>Passe B: </b> 
                      {dataBody.v_pass_b} 
                    </span>
                  }
                  {
                    dataBody.v_pass_c &&
                    <span>
                      <b>Passe C: </b> 
                      {dataBody.v_pass_c} 
                    </span>
                  }
                  {
                    dataBody.v_defense_general &&
                    <span>
                      <b>Defesa Geral: </b> 
                      {dataBody.v_defense_general} 
                    </span>
                  }
                  {
                    dataBody.v_defense_mistake &&
                    <span>
                      <b>Erros de Defesa: </b> 
                      {dataBody.v_defense_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_defense_a &&
                    <span>
                      <b>Defesa A: </b> 
                      {dataBody.v_defense_a} 
                    </span>
                  }
                  {
                    dataBody.v_defense_b &&
                    <span>
                      <b>Defesa B: </b> 
                      {dataBody.v_defense_b} 
                    </span>
                  }
                  {
                    dataBody.v_defense_c &&
                    <span>
                      <b>Defesa C: </b> 
                      {dataBody.v_defense_c} 
                    </span>
                  }
                  {
                    dataBody.v_lifting &&
                    <span>
                      <b>Valor Levantamento: </b> 
                      {dataBody.v_lifting} 
                    </span>
                  }
                  {
                    dataBody.v_lifting_mistake &&
                    <span>
                      <b>Erros de Levantamento: </b> 
                      {dataBody.v_lifting_mistake} 
                    </span>
                  }
                  {
                    dataBody.v_lifting_correct &&
                    <span>
                      <b>Levantamento Correto: </b> 
                      {dataBody.v_lifting_correct}
                    </span>
                  }
                  {
                    dataBody.v_initiative &&
                    <span>
                      <b>Iniciativa: </b> 
                      {dataBody.v_initiative} 
                    </span>
                  }
                  {
                    dataBody.v_initiative_lack &&
                    <span>
                      <b>Falta de Iniciativa:</b> 
                      {dataBody.v_initiative_lack} 
                    </span>
                  }
                </Col>
            </Row>
            <Row className={`${styles.contentButton}`} >
              <Button type="button" onClick={() => history.push('/dashboard/scouts')} >Voltar</Button>
              <Button type="button" onClick={() => handleModalOpen(id)} >Editar</Button>
            </Row>
            <Modal isActive={isActive} setIsActive={setIsActive} >
              <form>
                <Card>
                  <Card.Header as="h1">
                    Editar Informações
                  </Card.Header>
                  <Card.Body>
                  <Form.Row>
                    <Col>
                      <Input label="Nome" type="text" name="name" onChange={e => setDataBody({ ...dataBody, name: e.target.value })} value={dataBody.name} />
                    </Col>
                    </Form.Row>
                    <Form.Row>
        
                      {
                        dataBody.v_floating_serve && 
                       <Col>
                        <Input
                          label="Valor Saque Flutuante" 
                          type="number" 
                          name="v_floating_serve" 
                          onChange={e => setDataBody({ ...dataBody, v_floating_serve: e.target.value })} 
                          value={dataBody.v_floating_serve} 
                        />
                        </Col>
                      }
                      {
                          dataBody.v_floating_serve_points &&
                          <Col>
                          <Input 
                            label="Pontos Saque Flutuante" 
                            type="number"
                            name="v_floating_serve_points" 
                            onChange={e => setDataBody({ ...dataBody, v_floating_serve_points: e.target.value })} 
                            value={dataBody.v_floating_serve_points} 
                          />
                          </Col>
                      }
                      </Form.Row>
                      <Form.Row>
                        {
                          dataBody.v_floating_serve_mistake &&
                          <Col>
                          <Input 
                            label="Errors Saque Flutuante" 
                            type="number" 
                            name="v_floating_serve_mistake" 
                            onChange={e => setDataBody({ ...dataBody, v_floating_serve_mistake: e.target.value })} 
                            value={dataBody.v_floating_serve_mistake} 
                          />
                          </Col>
                        }
                        { 
                          dataBody.v_trip_serve && 
                          <Col>
                          <Input 
                            label="Valor Saque Viagem" 
                            type="number" 
                            name="v_trip_serve" 
                            onChange={e => setDataBody({ ...dataBody, v_trip_serve: e.target.value })} 
                            value={dataBody.v_trip_serve} 
                          />
                          </Col>
                        }
                      </Form.Row>
                      <Form.Row>
                        {
                          dataBody.v_trip_serve_points &&
                          <Col>
                          <Input 
                            label="Pontos de Saque Viagem" 
                            type="number" 
                            name="v_trip_serve_points" 
                            onChange={e => setDataBody({ ...dataBody, v_trip_serve_points: e.target.value })} 
                            value={dataBody.v_trip_serve_points} 
                          />
                          </Col>
                        }
                        {
                          dataBody.v_trip_serve_mistake &&
                          <Col>
                          <Input 
                            label="Saque Viagem Erro" 
                            type="number"  
                            name="v_trip_serve_mistake" 
                            onChange={e => setDataBody({ ...dataBody, v_trip_serve_mistake: e.target.value })} 
                            value={dataBody.v_trip_serve_mistake} 
                          />
                          </Col>
                        }
                      </Form.Row>
                      <Form.Row>
                        {
                          dataBody.v_attack &&
                          <Col>
                          <Input 
                            label="Valor Ataque" 
                            type="number" 
                            name="v_attack" 
                            onChange={e => setDataBody({ ...dataBody, v_attack: e.target.value })} 
                            value={dataBody.v_attack} 
                          />
                          </Col>
                        }
                        {
                          dataBody.v_attack_points &&
                          <Col>
                          <Input 
                            label="Pontos Ataque" 
                            type="number" 
                            name="v_attack_points" 
                            onChange={e => setDataBody({ ...dataBody, v_attack_points: e.target.value })} 
                            value={dataBody.v_attack_points} 
                          />
                          </Col>
                        }
                      </Form.Row>
                      <Form.Row>
                        {
                          dataBody.v_attack_mistake &&
                          <Col>
                          <Input 
                            label="Ataque Erro" 
                            type="number" 
                            name="v_attack_mistake" 
                            onChange={e => setDataBody({ ...dataBody, v_attack_mistake: e.target.value })} 
                            value={dataBody.v_attack_mistake} 
                          />
                          </Col>
                        }
                        {
                          dataBody.v_box_point &&
                          <Col>
                          <Input 
                            label="Saque Caixinha" 
                            type="number"  
                            name="v_box_point" 
                            onChange={e => setDataBody({ ...dataBody, v_box_point: e.target.value })} 
                            value={dataBody.v_box_point} 
                          />
                          </Col>
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_block &&
                          <Col>
                          <Input 
                            label="Valor Bloqueio" 
                            type="number" 
                            name="v_block" 
                            onChange={e => setDataBody({ ...dataBody, v_block: e.target.value })} 
                            value={dataBody.v_block} 
                          />
                          </Col>  
                        }
                        {
                          dataBody.v_block_mistake &&
                          <Col>
                          <Input 
                            label="Erro Bloqueio" 
                            type="number" 
                            name="v_block_mistake" 
                            onChange={e => setDataBody({ ...dataBody, v_block_mistake: e.target.value })} 
                            value={dataBody.v_block_mistake} 
                          />
                          </Col>  
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_block_points &&
                          <Col>
                          <Input 
                            label="Pontos de Bloqueio" 
                            type="number"  
                            name="v_block_points" 
                            onChange={e => setDataBody({ ...dataBody, v_block_points: e.target.value })} 
                            value={dataBody.v_block_points} 
                          />
                          </Col>  
                        }
                        {
                          dataBody.v_general_passes &&
                          <Col>
                          <Input 
                            label="Passes Gerais" 
                            type="number"  
                            name="v_general_passes" 
                            onChange={e => setDataBody({ ...dataBody, v_general_passes: e.target.value })} 
                            value={dataBody.v_general_passes} 
                          />
                          </Col>  
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_pass_mistake &&
                          <Col>
                          <Input 
                            label="Erros de Passe" 
                            type="number" 
                            name="v_pass_mistake" 
                            onChange={e => setDataBody({ ...dataBody, v_pass_mistake: e.target.value })} 
                            value={dataBody.v_pass_mistake} 
                          />
                          </Col> 
                        }
                        {
                          dataBody.v_pass_a &&
                          <Col>
                          <Input 
                            label="Passe A" 
                            type="number" 
                            name="v_pass_a" 
                            onChange={e => setDataBody({ ...dataBody, v_pass_a: e.target.value })} 
                            value={dataBody.v_pass_a} 
                          />
                          </Col> 
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_pass_b &&
                          <Col>
                          <Input 
                            label="Passe B" 
                            type="number" 
                            name="v_pass_b" 
                            onChange={e => setDataBody({ ...dataBody, v_pass_b: e.target.value })} 
                            value={dataBody.v_pass_b} 
                          />
                          </Col> 
                        }
                        {
                          dataBody.v_pass_c &&
                          <Col>
                          <Input 
                            label="Passe C" 
                            type="number" 
                            name="v_pass_c" 
                            onChange={e => setDataBody({ ...dataBody, v_pass_c: e.target.value })} 
                            value={dataBody.v_pass_c} 
                          />
                          </Col> 
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_defense_general &&
                          <Col>
                          <Input 
                            label="Defesa Geral" 
                            type="number" 
                            name="v_defense_general" 
                            onChange={e => setDataBody({ ...dataBody, v_defense_general: e.target.value })} 
                            value={dataBody.v_defense_general} 
                          />
                          </Col> 
                        }
                        {
                          dataBody.v_defense_mistake &&
                          <Col>
                          <Input 
                            label="Erros de Defesa" 
                            type="number"  
                            name="v_defense_mistake" 
                            onChange={e => setDataBody({ ...dataBody, v_defense_mistake: e.target.value })} 
                            value={dataBody.v_defense_mistake} 
                          />
                          </Col> 
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_defense_a &&
                          <Col>
                          <Input 
                            label="Defesa A" 
                            type="number"  
                            name="v_defense_a" 
                            onChange={e => setDataBody({ ...dataBody, v_defense_a: e.target.value })} 
                            value={dataBody.v_defense_a} 
                          />
                          </Col> 
                        }
                        {
                          dataBody.v_defense_b &&
                          <Col>
                          <Input 
                            label="Defesa B" 
                            type="number"  
                            name="v_defense_b" 
                            onChange={e => setDataBody({ ...dataBody, v_defense_b: e.target.value })} 
                            value={dataBody.v_defense_b} 
                          />
                          </Col> 
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_defense_c &&
                          <Col>
                          <Input 
                            label="Defesa C" 
                            type="number" 
                            name="v_defense_c" 
                            onChange={e => setDataBody({ ...dataBody, v_defense_c: e.target.value })} 
                            value={dataBody.v_defense_c} 
                          />
                          </Col> 
                        }
                        {
                          dataBody.v_lifting &&
                          <Col>
                          <Input 
                            label="Valor Levantamento" 
                            type="number" 
                            name="v_lifting" 
                            onChange={e => setDataBody({ ...dataBody, v_lifting: e.target.value })} 
                            value={dataBody.v_lifting} 
                          />
                          </Col> 
                        }
                        </Form.Row>
                        <Form.Row>
                        {
                          dataBody.v_lifting_mistake &&
                          <Col>
                          <Input 
                            label="Erros de Levantamento" 
                            type="number" 
                            name="v_lifting_mistake" 
                            onChange={e => setDataBody({ ...dataBody, v_lifting_mistake : e.target.value })} 
                            value={dataBody.v_lifting_mistake } 
                          />
                          </Col> 
                        }
                        {
                          dataBody.v_lifting_correct &&
                          <Col>
                          <Input 
                            label="Levantamento Correto" 
                            type="number" 
                            name="v_lifting_correct" 
                            onChange={e => setDataBody({ ...dataBody, v_lifting_correct : e.target.value })} 
                            value={dataBody.v_lifting_correct } 
                          />
                          </Col> 
                        }
                      </Form.Row>
                      <Form.Row>
                        {
                          dataBody.v_initiative &&
                          <Col>
                          <Input 
                            label="Iniciativa" 
                            type="number" 
                            name="v_initiative" 
                            onChange={e => setDataBody({ ...dataBody, v_initiative: e.target.value })} 
                            value={dataBody.v_initiative} 
                          />
                          </Col> 
                        }
                        {
                          dataBody.v_initiative_lack &&
                          <Col>
                          <Input 
                            label="Falta de Iniciativa" 
                            type="number" 
                            name="v_initiative_lack" 
                            onChange={e => setDataBody({ ...dataBody, v_initiative_lack: e.target.value })} 
                            value={dataBody.v_initiative_lack} 
                          />
                          </Col> 
                        }
                    </Form.Row>
                  <Button type="submit" className={`dropdown animate__animated animate__fadeInUp`} onClick={handleSubmit}>Editar</Button>
                  </Card.Body>
                </Card>
              </form>
            </Modal>
          </Col>
        </Row>
      </Container>
    )

}
