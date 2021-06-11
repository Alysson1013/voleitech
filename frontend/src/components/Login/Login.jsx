import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm'
import LoginCadastro from './LoginCadastro' 

const Login = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="criar" element={<LoginCadastro />} />
            </Routes>
        </div>
    )
}

export default Login
