import { GraphQLClient, gql } from 'graphql-request'

const endpoint = "http://localhost:4000/"

const signUpUser = async ({ name, email, password, dt_birth, n_enrollment }) => {
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

const signInUser = async ({ email, password }) => {
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
  } catch (error) {
    return error
  }
}

const getUser = async (user_id, token) => {
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
  } catch (error) {
    console.log(error)
  }
}

const getAthletes = async (token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    {
      athletes {
        id
        name
        n_enrollment_atl
        teams {
          name
          assignment
        }
      }
    }
  `

  try {
    const response = await graphQLClient.request(query)
    return response
  } catch (error) {
    console.log(error)
    return;
  }
}

const getAthleteById = async (token, id) => {

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    {
      collaborator(filter: {
        id: ${id}
      }){
        id
        phone_1
        email_1
        name
        dt_birth
        function
        n_enrollment_atl
        positions
        n_uniform
        height
        weight
        width
        gender
        bmi
        jump_distance
        jump_height
        adresses {
          id
          main
          cep
          uf
          district
          road
          number
          complement
          describe
        }
        results {
          n_floating_serve_points
          n_trip_serve_points
          n_attack_points
          n_dripping_point
          n_box_point
          n_block_points
        }
        describe
      }
    }
  `

  try {
    const response = await graphQLClient.request(query)
    return response
  } catch (error) {
    console.log(error)
    return;
  }
}


const updateUser = async (data, id, token) => {
  console.log(id)
  console.log(token)
  console.log(data)

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
  mutation{
    editCollaborator(
      filter: {
              id: ${id}
      }
      data: {
        name: "${data.name}"
      }
    ){
     id
      phone_1
      phone_2
      phone_3
      email_1
      email_2
      email_3
      name
      dt_birth
      gender
      function
      bmi
      positions
      n_uniform
      height
      weight
      describe
      teams {
        id
        name
      }
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

export {
  signUpUser,
  signInUser,
  getUser,
  getAthletes,
  getAthleteById,
  updateUser
}
