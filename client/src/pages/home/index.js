import React, { useState } from 'react'
import Login from '../../components/login'
import { Container, HomeTitle, HomeFooter, SignupText } from './styles'

const Home = () => {
  const [loginState, setLoginState] = useState(true)

  const onClick = () => setLoginState(false)

  const login = <Login loginState={loginState} />
  const intro = (
    <>
      <HomeTitle>Home to your panel!</HomeTitle>
      <p>Please {loginState ? 'login' : 'signup'} to your system and enjoy our services!</p>
    </>
  )
  const footer = (
    <HomeFooter>Don't have an account? Then <SignupText onClick={onClick}>signup</SignupText></HomeFooter>
  )

  return (
    <Container>
      {intro}
      {login}
      {footer}
    </Container>
  )
}

export default Home
