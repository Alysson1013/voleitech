import { GraphQLClient, gql } from 'graphql-request'

const endpoint = "http://localhost:4000/"

const getCategories = async (token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    query {
      categories{
        id
        name_category
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

const createAthlete = async (body, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  console.log(body)

  const mutation = gql`
    mutation {
      newCollaborator(data: {
        name: "${body.name}"
        email_1: "${body.email_1}",
        phone_1: "${body.phone_1}",
        n_enrollment_atl: "${body.n_enrollment_atl}"
        function: "${body.function}"
        positions: "${body.positions}"
        n_uniform: ${body.n_uniform}
        height: ${body.height}
        weight: ${body.weight}
        width: ${body.width}
        gender: "${body.gender}"
        bmi: ${body.bmi}
        jump_distance: ${body.jump_distance}
        jump_height: ${body.jump_height}
        describe: "${body.describe}"
        dt_birth: "${body.dt_birth}"
        teams: {
          team_id: ${body.team_id}
          function: "${body.team_function}"
          status: true
        }
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
        describe
      }
    }
  `

  console.log(mutation)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const deleteCollaborator = async (id, token) => {

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
  mutation{
      deleteCollaborator(filter: {
  	    id: ${id}
      }){
		    id
        phone_1
        email_1
        name
      }
  }
  `

  console.log(mutation)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

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
        n_enrollment_ast
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
          n_floating_serve_mistake
          n_trip_serve_mistake
          n_attack_mistake
          n_block_mistake
          n_pass_mistake
          n_defense_mistake
          n_lifting_mistake
        }
        describe
      }
    }
  `

  try {
    const response = await graphQLClient.request(query)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    return;
  }
}



const updateAthlete = async (data, id, token) => {

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
        email_1: "${data.email_1}",
        phone_1: "${data.phone_1}",
        n_enrollment_atl: "${data.n_enrollment_atl}"
        function: "${data.function}"
        positions: "${data.positions}"
        n_uniform: ${data.n_uniform}
        height: ${data.height}
        weight: ${data.weight}
        width: ${data.width}
        gender: "${data.gender}"
        bmi: ${data.bmi}
        jump_distance: ${data.jump_distance}
        jump_height: ${data.jump_height}
        describe: "${data.describe}"
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

const getTeams = async (token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    query {
      teams {
		  id
      category {
			  name_category
      }
      gender
      name
      average_age
      average_height
      average_weight
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

const getTeamById = async (id, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    query{
	    team(filter: {
        id: ${id}
      }){
        id
        category_id
        category {
          name_category
        }
        name
        describe
        gender
        average_age
        average_height
        average_weight
        collaborators {
          name
          function
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

const createTeam = async (body, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
    mutation {
      newTeam(
        data: {
          name: "${body.name}"
          gender: "${body.gender}"
          category_id: ${body.category_id}
          average_age: ${body.average_age}
          average_height: ${body.average_height}
          average_weight: ${body.average_weight}
          describe: "${body.describe}"
        }
    ){
      id
      category {
        name_category
      }
      gender
      name
      category_id
      average_age
      average_height
      average_weight
      describe
    }
  }
  `

  console.log(mutation)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const updateTeam = async (id, body, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
    mutation {
      editTeam(
        filter: {
          id: ${id}
        }
        data: {
          name: "${body.name}"
          gender: "${body.gender}"
          category_id: ${body.category_id}
          average_age: ${body.average_age}
          average_height: ${body.average_height}
          average_weight: ${body.average_weight}
          describe: "${body.describe}"
        }
    ){
      id
      category {
        name_category
      }
      category_id
      gender
      name
      average_age
      average_height
      average_weight
      describe
    }
  }
  `
  
  console.log("Aqui - " + body.category_id)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const getScouts = async (token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    {
      scouts {
        id
        name
        v_floating_serve
        v_floating_serve_points
        v_floating_serve_mistake
        v_trip_serve
        v_trip_serve_points
        v_trip_serve_mistake
        v_attack
        v_attack_points
        v_attack_mistake
        v_box_point
        v_block
        v_block_mistake
        v_block_used_mistake
        v_block_points
        v_general_passes
        v_pass_mistake
        v_pass_a
        v_pass_b
        v_pass_c
        v_defense_general
        v_defense_mistake
        v_defense_a
        v_defense_b
        v_defense_c
        v_lifting
        v_lifting_mistake
        v_lifting_correct
        v_initiative
        v_initiative_lack
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

const getScoutById = async (token, id) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    query {
      scout(
        filter: {
          id: ${id}
        }
      ){
        id
        name
        v_floating_serve
        v_floating_serve_points
        v_floating_serve_mistake
        v_trip_serve
        v_trip_serve_points
        v_trip_serve_mistake
        v_attack
        v_attack_points
        v_attack_mistake
        v_box_point
        v_block
        v_block_mistake
        v_block_used_mistake
        v_block_points
        v_general_passes
        v_pass_mistake
        v_pass_a
        v_pass_b
        v_pass_c
        v_defense_general
        v_defense_mistake
        v_defense_a
        v_defense_b
        v_defense_c
        v_lifting
        v_lifting_mistake
        v_lifting_correct
        v_initiative
        v_initiative_lack
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

const updateScout = async (id, body, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
    mutation {
      editScout(
        filter: {
          id: ${id}
        }
        data: {
          name: "${body.name}"
          v_floating_serve: ${body.v_floating_serve}
          v_floating_serve_points: ${body.v_floating_serve_points}
          v_floating_serve_mistake: ${body.v_floating_serve_mistake}
          v_trip_serve: ${body.v_trip_serve}
          v_trip_serve_points: ${body.v_trip_serve_points}
          v_trip_serve_mistake: ${body.v_trip_serve_mistake}
          v_attack: ${body.v_attack}
          v_attack_points: ${body.v_attack_points}
          v_attack_mistake: ${body.v_attack_mistake}
          v_box_point: ${body.v_box_point}
          v_block: ${body.v_block}
          v_block_mistake: ${body.v_block_mistake}
          v_block_used_mistake: ${body.v_block_used_mistake}
          v_block_points: ${body.v_block_points}
          v_general_passes: ${body.v_general_passes}
          v_pass_mistake: ${body.v_pass_mistake}
          v_pass_a: ${body.v_pass_a}
          v_pass_b: ${body.v_pass_b}
          v_pass_c: ${body.v_pass_c}
          v_defense_general: ${body.v_defense_general}
          v_defense_mistake: ${body.v_defense_mistake}
          v_defense_a: ${body.v_defense_a}
          v_defense_b: ${body.v_defense_b}
          v_defense_c: ${body.v_defense_c}
          v_lifting: ${body.v_lifting}
          v_lifting_mistake: ${body.v_lifting_mistake}
          v_lifting_correct: ${body.v_lifting_correct}
          v_initiative: ${body.v_initiative}
          v_initiative_lack: ${body.v_initiative_lack}
        }
    ){
        id
        name
        v_floating_serve
        v_floating_serve_points
        v_floating_serve_mistake
        v_trip_serve
        v_trip_serve_points
        v_trip_serve_mistake
        v_attack
        v_attack_points
        v_attack_mistake
        v_box_point
        v_block
        v_block_mistake
        v_block_used_mistake
        v_block_points
        v_general_passes
        v_pass_mistake
        v_pass_a
        v_pass_b
        v_pass_c
        v_defense_general
        v_defense_mistake
        v_defense_a
        v_defense_b
        v_defense_c
        v_lifting
        v_lifting_mistake
        v_lifting_correct
        v_initiative
        v_initiative_lack
    }
  }
  `

  console.log(mutation)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const getAssistants = async (token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    {
      assistants {
        id
        phone_1
        email_1
        name
        dt_birth
        function
        n_enrollment_ast
        gender
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

const updateAssistant = async (data, id, token) => {

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
        email_1: "${data.email_1}"
        phone_1: "${data.phone_1}"
        n_enrollment_ast: "${data.n_enrollment_ast}"
        function: "${data.function}"
        gender: "${data.gender}"
      }
    ){
      name
      email_1
      phone_1
      n_enrollment_ast
      function
      gender
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

const createCategory = async (body, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
    mutation {
      newCategory(data: {
        name_category: "${body.name_category}"
        describe: "${body.describe}"
      }){
        name_category
        describe
      }
    }
  `

  console.log(mutation)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const getTrainings = async (token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    query {
      trainings {
        training_type {
          training_type_name
          describe
        }
        name
        dt_training
        hour_start
        hour_finish
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

const createScout = async (body, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
    mutation {
      newScout(data: {
        name: "${body.name}"
        v_floating_serve: ${body.v_floating_serve}
        v_floating_serve_points: ${body.v_floating_serve_points}
        v_floating_serve_mistake: ${body.v_floating_serve_mistake}
        v_trip_serve: ${body.v_trip_serve}
        v_trip_serve_points: ${body.v_trip_serve_points}
        v_trip_serve_mistake: ${body.v_trip_serve_mistake}
        v_attack: ${body.v_attack}
        v_attack_points: ${body.v_attack_points}
        v_attack_mistake: ${body.v_attack_mistake}
        v_box_point: ${body.v_box_point}
        v_block: ${body.v_block}
        v_block_mistake: ${body.v_block_mistake}
        v_block_used_mistake: ${body.v_block_used_mistake}
        v_block_points: ${body.v_block_points}
        v_general_passes: ${body.v_general_passes}
        v_pass_mistake: ${body.v_pass_mistake}
        v_pass_a: ${body.v_pass_a}
        v_pass_b: ${body.v_pass_b}
        v_pass_c: ${body.v_pass_c}
        v_defense_general: ${body.v_defense_general}
        v_defense_mistake: ${body.v_defense_mistake}
        v_defense_a: ${body.v_defense_a}
        v_defense_b: ${body.v_defense_b}
        v_defense_c: ${body.v_defense_c}
        v_lifting: ${body.v_lifting}
        v_lifting_mistake: ${body.v_lifting_mistake}
        v_lifting_correct: ${body.v_lifting_correct}
        v_initiative: ${body.v_initiative}
        v_initiative_lack: ${body.v_initiative_lack}
      }){
        id
        name
        v_floating_serve
        v_floating_serve_points
        v_floating_serve_mistake
        v_trip_serve
        v_trip_serve_points
        v_trip_serve_mistake
        v_attack
        v_attack_points
        v_attack_mistake
        v_box_point
        v_block
        v_block_mistake
        v_block_used_mistake
        v_block_points
        v_general_passes
        v_pass_mistake
        v_pass_a
        v_pass_b
        v_pass_c
        v_defense_general
        v_defense_mistake
        v_defense_a
        v_defense_b
        v_defense_c
        v_lifting
        v_lifting_mistake
        v_lifting_correct
        v_initiative
        v_initiative_lack
      }
    }
  `

  console.log(mutation)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}

const getTrainingsTypes = async (token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const query = gql`
    query {
      trainings_types{
        id
        training_type_name
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

const createTrainingType = async (body, token) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })

  const mutation = gql`
    mutation {
      newTrainingType(
        data:
          {
            training_type_name: "${body.training_type_name}"
            describe: "${body.describe}"
          }){
            id
            training_type_name
            describe
          }
    }
  `

  console.log(mutation)

  try {
    const response = await graphQLClient.request(mutation)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}

export {
  getCategories,
  signUpUser,
  signInUser,
  getUser,
  getAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteCollaborator,
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  getScouts,
  getScoutById,
  updateScout,
  getAssistants,
  updateAssistant,
  createCategory,
  getTrainings,
  getTrainingsTypes,
  createTrainingType,
  createScout
}
