import React from 'react'

function Dummy(props) {

  return (
    <div onClick ={props.handler()}>Dummy</div>
  )
}

export default Dummy