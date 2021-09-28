import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import Home from '../pages/Home'
import DashboardMain from '../components/Dashboard/Main/DashboardMain'
import Athletes from '../components/Dashboard/Athlete/Athletes'
import Trainings from '../components/Dashboard/Training/Trainings'
import Training from '../components/Dashboard/Training/Training'
import User from '../components/Dashboard/User/User'
import Scouts from '../components/Dashboard/Scouts/Scouts'
import Scout from '../components/Dashboard/Scouts/Scout'
import LoginForm from '../components/Login/LoginForm'
import LoginCadastro from '../components/Login/LoginCadastro'
import Athlete from '../components/Dashboard/Athlete/Athlete'
import Teams from '../components/Dashboard/Team/Teams'
import Team from '../components/Dashboard/Team/Team'
import Assistants from '../components/Dashboard/Assistant/Assistants'
import Assistant from '../components/Dashboard/Assistant/Assistant'


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/login" isSign component={LoginForm} />
      <Route path="/criar" isSign component={LoginCadastro} />

      {/* Private Routes */}
      <Route path="/dashboard" isPrivate component={DashboardMain} />
      <Route path="/dashboard/athletes" isPrivate component={<Athletes />} />
      <Route path="/athlete/:id" isPrivate component={Athlete} />
      <Route path="/dashboard/teams" component={<Teams />} />
      <Route path="/team/:id" component={Team} />
      <Route path="/dashboard/trainings" component={<Trainings />} />
      <Route path="/training/:id" component={Training} />
      <Route path="/dashboard/assistants" component={<Assistants />} />
      <Route path="/assistant/:id" component={Assistant} />
      <Route path="/dashoboard/user" component={<User />} />
      <Route path="/dashboard/scouts" component={<Scouts />} />
      <Route path="/scout/:id" isPrivate component={Scout} />
      <Route path="/dashboard/user" component={User} />
    </Switch>
  )
}
