import React from 'react'
import { Card } from 'react-bootstrap'
import styles from './LoginForm.module.css'
import useForm from '../../Hooks/useForm'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import { Link } from 'react-router-dom'
import stylesBtn from '../Forms/Button.module.css';

const LoginForm = () => {
    const email = useForm('email')
    const password = useForm()

    async function handleSubmit(event) {
        event.preventDefault()

    }

    return (
        <section className={`dropdown animate__animated animate__bounce animate__fadeInRight ${styles.section} `}>
            <Card>
                <Card.Header as='h1'>
                    Login / Cadastro
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input label="E-mail" type="email" name="email" {...email} />
                        <Input label="Senha" type="password" name="password" {...password} />
                        <Button>Entrar</Button>
                    </form>
                    <div className={styles.cadastro}>
                        <p>Ainda não possui conta? Cadastre-se no site. <br /><Link to="login/criar">Cadastre-se</Link> </p>
                    </div>
                </Card.Body>
            </Card>
        </section>
    )
}

export default LoginForm
