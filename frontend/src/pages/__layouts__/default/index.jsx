import React from 'react'

import Header from '../../../components/Header'

import './styles.scss'

export default function DefaultLayout({ children }) {
  return (
    <div className="App area">
      <Header />
      <ul className="circles">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      {children}
    </div>
  )
}
