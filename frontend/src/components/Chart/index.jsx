import React from 'react'

export default function Chart({TypeChart, state, className}){
  return(
    <TypeChart className={className} data={state} />
  )
}
