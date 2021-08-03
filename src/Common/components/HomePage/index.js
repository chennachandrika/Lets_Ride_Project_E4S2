import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../logo.svg'

function Home() {
   return (
      <div className='App'>
         <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
               Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
               className='App-link'
               href='https://reactjs.org'
               target='_blank'
               rel='noopener noreferrer'
            >
               Learn React
            </a>
            <Link
               to='/commute-dashboard/home/matched-requests'
               className='mt-12'
            >
               Commute Dashboard
            </Link>
            <Link to='/pagination' className='mt-12'>
               Pagination
            </Link>
            <Link to='/practice-common-components'>
               Practice Common Components
            </Link>
         </header>
      </div>
   )
}

export default Home
