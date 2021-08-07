import { GraphQLClient, gql } from 'graphql-request'

const endpoint = "http://localhost:4000/"

const signUpUser = async ({name, email, password, dt_birth, n_enrollment}) => {
  const graphQLClient = new GraphQLClient(endpoint)
  
  const mutation = gql`
    mutation {
      signupUser(data: {
        name: "${name}"
        email: "${email}"
        password: "${password}"
        n_enrollment: "${n_enrollment}"
        dt_birth: "${dt_birth}"
        describe: "Adicione uma descrição"
    }){
      name
      n_enrollment
    }
  }
  `
  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const signInUser = async ({email, password}) => {
  const graphQLClient = new GraphQLClient(endpoint)
  const query = gql`
    query {
      login(data: {
        email: "${email}"
  	    password: "${password}"
      }){
        token
      }
    }
  `

  try {
    const response = await graphQLClient.request(query)
    return response
  } catch(error) {
    return error
  }
}

const getUser = async ( user_id, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    {
      user(filter: {
        id: ${user_id}
      }){
        id
        name
        email
        n_enrollment
        describe
        dt_birth
      }
    }
  `

  try {
    const response = await graphQLClient.request(query)
    console.log(response)
  } catch(error) {
    console.log(error)
  }
}

export {
  signUpUser,
  signInUser,
  getUser
}