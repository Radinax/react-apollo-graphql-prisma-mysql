import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { AUTH_TOKEN } from '../../constants'
// import { onError } from "apollo-link-error"
import { Container, InputContainer, Form } from './styles'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login( email: $email, password: $password) {
      token
    }
  }
`

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup( email: $email, password: $password, name: $name) {
      token
    }
  }
`

const Login = ({ loginState }) => {
  let history = useHistory()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  // login false === signup mode

  const handleError = ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
        setError('Wrong password or email')
      })
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
      setError(networkError)
    }
  }

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => confirm(data),
    onError: handleError
  })
  const [signup] = useMutation(SIGNUP, {
    onCompleted: (data) => confirm(data),
    onError: handleError
  })

  const saveUserData = token => localStorage.setItem(AUTH_TOKEN, token)

  const confirm = async data => {
    const { token } = loginState ? data.login : data.signup
    saveUserData(token)
    history.push(`/panel`)
  }

  const onChange = setter => e => setter(e.target.value)
  const onSubmit = e => {
    e.preventDefault()
    loginState ? login({ variables: { email, password } }) : signup({ variables: { name, email, password } })
  }

  const input = (type, name, value, onChange) => (
    <InputContainer>
      <label>{name}</label>    
      <input type={type} name={name} value={value} onChange={onChange} />
    </InputContainer>
  )

  const loginComp = (
    <Form onSubmit={onSubmit}>
      {!loginState && input('text', 'Name', name, onChange(setName))}
      {input('email', 'Email', email, onChange(setEmail))}
      {input('password', 'Password', password, onChange(setPassword))}
      <input type="submit" value="submit" />
    </Form>
  )

  const title = <h1>{loginState ? 'Login' : 'Signup'}</h1>
  const errorComp = <span>There was an error: {`${error}`}</span>

  return (
    <Container>
      {title}
      {loginComp}
      {error && errorComp}
    </Container>
  )

}

export default Login
