import React from 'react'
import { useParams } from 'react-router'

const Quiz = () => {
  const {id} = useParams()
  return (
    <div>Quiz</div>
  )
}

export default Quiz