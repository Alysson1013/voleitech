import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import Home from '../pages/Home'
import DashboardMain from '../components/Dashboard/Main/DashboardMain'
import Athletes from '../components/Dashboard/Athlete/Athletes'
import Athlete from '../components/Dashboard/Athlete/Athlete'
import Team from '../components/Dashboard/Team/Team'
import Training from '../components/Dashboard/Training/Training'
import Assistant from '../components/Dashboard/Assistant/Assistant'
import User from '../components/Dashboard/User/User'
import Scouts from '../components/Dashboard/Scouts/Scouts'
import LoginForm from '../components/Login/LoginForm'
import LoginCadastro from '../components/Login/LoginCadastro'


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <Route path="/login" isSign component={LoginForm} />
      <Route path="/criar" isSign component={LoginCadastro} />

      {/* Private Routes */}
      <Route path="/dashboard" isPrivate component={DashboardMain} />
      <Route path="/dashboard/athletes" isPrivate component={<Athletes />} />
      <Route path="/dashboard/teams" component={<Team />} />
      <Route path="/dashboard/trainings" component={<Training />} />
      <Route path="/dashboard/assistants" component={<Assistant />} />
      <Route path="/dashoboard/user" component={<User />} />
      <Route path="/dashboard/scouts" component={<Scouts />} />
    </Switch>
  )
}
