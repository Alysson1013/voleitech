import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardMain from './Main/DashboardMain' 
import Athlete from './Athlete/Athlete'
import Team from './Team/Team'
import Training from './Training/Training'
import Assistant from './Assistant/Assistant'
import User from './User/User'


function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardMain />} />
      <Route path="/athletes" element={<Athlete />} />
      <Route path="/teams" element={<Team />} />
      <Route path="/trainings" element={<Training />} />
      <Route path="/assistants" element={<Assistant />} />
      <Route path="/user" element={<User />} />
    </Routes>
  )
}

export default Dashboard
