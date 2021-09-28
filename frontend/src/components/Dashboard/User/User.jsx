import React from 'react'
import styles from './User.module.css'
import jwtDecode from 'jwt-decode'
import { UserContext } from '../../../UserContext';
import { 
  getUserData
} from '../../../Hooks/Api'

const User = () => {
  const { getToken } = React.useContext(UserContext);
  const token = getToken()

  const [data, setData] = React.useState({})

  const { id } = jwtDecode(token)


  console.log("Aqui")
  console.log(id)

  async function loadUser(){
    const response = await getUserData(id, token)
    setData(response.user)
  }

  console.log(data)

  React.useEffect(() => {
    loadUser()
  }, [])

  return (
    <div>
      <h1>
        Dados de Usuário
      </h1>
      {
        data &&
        <span>
            <b>Nome: </b> 
            {data.name}
        </span>
      }
      <br />
            {
        data &&
        <span>
            <b>Email: </b> 
            {data.email}
        </span>
      }
      <br />
            {
        data &&
        <span>
            <b>Número de Cadastro: </b> 
            {data.n_enrollment}
        </span>
      }
      <br />
            {
        data &&
        <span>
            <b>Descrição: </b> 
            {data.describe}
        </span>
      }
      <br />
    </div>
  )
}

export default User
