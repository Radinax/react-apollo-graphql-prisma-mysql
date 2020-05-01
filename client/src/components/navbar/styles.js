import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: sticky;
  background-color: #404040;
`

export const NavMenu = styled.ul`
  display: flex;
  list-style-type: none;
`

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 20px;
`
export const RegLink = styled.li`
  color: white;
  text-decoration: none;
  margin-right: 20px;
`
