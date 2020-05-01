import React from 'react'
import { Container, Box } from './styles'

const InformationBox = ({ name, email, description }) => {
  const infoText = [
    { title: 'Name', value: name },
    { title: 'Email', value: email },
    { title: 'Description', value: description },
  ]

  const box = infoText.map(info => (
    <Box>
      <div>
        <span>{`${info.title}: `} </span>
        <span>{info.value}</span>
      </div>
    </Box>
  ))
  return (
    <Container>
      {box}
    </Container>
  )
}

export default InformationBox
