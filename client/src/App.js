import React, { useState } from 'react'
import './App.css'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const GET_DATA = gql`
  query getData {
    feed {
      id
      url
      description
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

const App = () => {
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const { loading, error, data } = useQuery(GET_DATA)
  const [createLink] = useMutation(CREATE_LINK, {
    refetchQueries: [ { query: GET_DATA } ]
  })

  if (loading) return <div>LOADING</div>
  if (error) return <div>There was an error: {error}</div>

  const onChange = setter => e => setter(e.target.value)
  const onSubmit = () => {
    createLink({ variables: { url, description } })
  }

  const createForm = (
    <form onSubmit={onSubmit}>
      <div>
        <label>Url: </label>
        <input type='text' name='url' value={url} onChange={onChange(setUrl)} required />
      </div>
      <div>
        <label>Description: </label>
        <input type='text' name='description' value={description} onChange={onChange(setDescription)} required />
      </div>
      <input type="submit" value="submit" />
    </form>
  )

  const information = (
    <ul>
      {data.feed.map(o => (
        <li key={o.id}>URL: {o.url} | DESCRIPTION: {o.description}</li>
      ))}
    </ul>
  )

  return (
    <div>
      {createForm}
      {information}
    </div>
  )
}

export default App;
