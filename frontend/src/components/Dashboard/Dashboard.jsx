import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardMain from './Main/DashboardMain' 
import Athletes from './Athlete/Athletes'
import Athlete from './Athlete/Athlete'
import Team from './Team/Team'
import Training from './Training/Training'
import Assistant from './Assistant/Assistant'
import User from './User/User'
import Scouts from './Scouts/Scouts'


function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardMain />} />
      <Route path="/athletes" element={<Athletes />} />
      <Route path="/athletes/:id" element={<Athlete />} />
      <Route path="/teams" element={<Team />} />
      <Route path="/trainings" element={<Training />} />
      <Route path="/assistants" element={<Assistant />} />
      <Route path="/user" element={<User />} />
      <Route path="/scouts" element={<Scouts />} />
    </Routes>
  )
}

export default Dashboard
