import React from 'react'
import { useContext } from 'react';
import { Redirect, Route as DOMRoute } from 'react-router-dom'
import DefaultLayout from '../pages/__layouts__/default';
import { UserContext } from '../UserContext';

export default function Route({
  isSign = false,
  isPrivate = false,
  component: Component,
  ...rest
}) {
  const { getToken } = useContext(UserContext)

  const token = getToken()

  if (!token && isPrivate) {
    return <Redirect to="/" />
  }

  if (token && isSign) {
    return <Redirect to="/" />
  }


  const Layout = DefaultLayout

  return (
    <DOMRoute {...rest} render={() =>
      <Layout>
        <Component />
      </Layout>}
    />
  )

}
