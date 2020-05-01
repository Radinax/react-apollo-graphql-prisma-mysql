import React from 'react'
import { useHistory } from 'react-router-dom'
import { AUTH_TOKEN } from '../../constants'
import { Container, NavMenu, NavLink, RegLink } from './styles'

const Navbar = () => {
  let history = useHistory()
  const _logout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    history.push('./')
  }
  const navbar = (
    <NavMenu>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/panel'>Panel</NavLink>
      <RegLink onClick={_logout}>Logout</RegLink>
    </NavMenu>
  )

  return (
    <Container>
      {navbar}
    </Container>
  )
}

export default Navbar
