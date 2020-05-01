import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import InformationBox from '../../components/informationBox'
import { AUTH_TOKEN } from '../../constants'
import { Box, Form, InputContainer } from './styles'

const GET_DATA = gql`
  query getData {
    feed {
      id
      url
      description
      postedBy {
        name
        email
      }
    }
  }
`

const CREATE_LINK = gql`
  mutation CreateLink($url: String!, $description: String!){
    post(
      url: $url,
      description: $description
    ) {
      url
      description
    }
}
`

const Panel = () => {
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const { loading, error, data } = useQuery(GET_DATA)
  const [createLink] = useMutation(CREATE_LINK, {
    refetchQueries: [ { query: GET_DATA } ]
  })
  const token = localStorage.getItem(AUTH_TOKEN)

  const onChange = setter => e => setter(e.target.value)
  const onSubmit = () => {
    createLink({ variables: { url, description } })
  }

  const createForm = (
    <Form onSubmit={onSubmit}>
      <InputContainer>
        <label>Url: </label>
        <input type='text' name='url' value={url} onChange={onChange(setUrl)} required />
      </InputContainer>
      <InputContainer>
        <label>Description: </label>
        <input type='text' name='description' value={description} onChange={onChange(setDescription)} required />
      </InputContainer>
      <input type="submit" value="submit" />
    </Form>
  )
  
  if (loading) return <div>LOADING</div>
  if (error) return console.log('Error in Home', error)
  
  const information = (
    <Box>
      {data.feed.map(o => o.postedBy && (
        <InformationBox name={o.postedBy.name} email={o.postedBy.email} description={o.description} />
      ))}
    </Box>
  )

  return (
    <div>
      {token && createForm}
      {information}
    </div>
  )
}

export default Panel;
