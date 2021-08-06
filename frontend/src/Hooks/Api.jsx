import { GraphQLClient, gql } from 'graphql-request'

const endpoint = "http://localhost:4000/"

const signUpUser = async (body) => {
  const graphQLClient = new GraphQLClient(endpoint)

  const mutation = gql`
    mutation {
      signupUser(data: {
        name: "${body.name}",
        email: "${body.email}",
        password: "${body.password}",
        describe: "Adicione uma descrição",
        dt_birth: "${body.dt_birth}",
        n_enrollment: "${body.subscription}"
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

export {
  signUpUser
}