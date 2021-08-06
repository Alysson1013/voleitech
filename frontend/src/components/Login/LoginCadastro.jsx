import React from 'react'
import { Card, Form, Col } from 'react-bootstrap'
import styles from './LoginCadastro.module.css'
import Input from '../Forms/Input'
import useForm from '../../Hooks/useForm'
import DatePicker from "react-datepicker";
import Button from '../Forms/Button'
import "react-datepicker/dist/react-datepicker.css";
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';
import { GraphQLClient, gql } from 'graphql-request'

const LoginCadastro = () => {
    const name = useForm()
    const email = useForm('email')
    const password = useForm('password')
    const password2 = useForm()
    const subscription = useForm('number')
    const [startDate, setStartDate] = React.useState(new Date());

    const graphQLClient = new GraphQLClient("http://localhost:4000")

    const { userLogin } = React.useContext(UserContext);
    const { loading, error, request } = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();

        let year = startDate.getFullYear()
        let month = startDate.getMonth()
        let day = startDate.getDate()

        let dt_birth = `${year}-${month}-${day}`

        const mutation = gql`
            mutation {
                signupUser(data: {
                    name: "${name.value}",
                    email: "${email.value}",
                    password: "${password.value}",
                    describe: "Adicione uma descrição",
                    dt_birth: "${dt_birth}",
                    n_enrollment: "${subscription.value}"
                }){
                    name
                    n_enrollment
                }
            }
        `

        try {
            const data = await graphQLClient.request(mutation)
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <section className={`dropdown animate__animated animate__bounce animate__fadeInLeft ${styles.section}`}>
            <form onSubmit={handleSubmit}>
                <Card>
                    <Card.Header as="h1">
                        Login / Cadastro
                    </Card.Header>
                    <Card.Body>
                        <Form.Row>
                            <Col>
                                <Input label="Nome" type="text" name="name" {...name} />
                            </Col>
                            <Col>
                                <Input label="E-mail" type="email" name="email" {...email} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Input label="Senha" type="password" name="password" {...password} />
                            </Col>
                            <Col>
                                <Input label="Confirmar Senha" type="password" name="password" {...password2} />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Input label="Número de Inscrição" type="text" name="subscription" {...subscription} />
                            </Col>
                            <Col>
                                <label htmlFor={name} className={styles.label}>
                                    Data de Nascimento
                                </label>
                                <DatePicker locale="pt-BR" className={styles.date} name="date" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </Col>
                        </Form.Row>
                        <Button className={`dropdown animate__animated animate__fadeInUp`}>Cadastrar</Button>
                    </Card.Body>
                </Card>
            </form>
        </section>
    )
}

export default LoginCadastro
