import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Login from './components/login'
import Navbar from './components/navbar'
import Panel from './pages/panel'
import Home from './pages/home'
import './App.css'

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Navbar/>
        <Route path='/' exact component={Home} />
        <Route path='/panel' exact component={Panel} />
      </Router>
    </div>
  )
}

export default App;
