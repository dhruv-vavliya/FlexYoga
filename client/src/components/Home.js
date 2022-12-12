import React, { useRef, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { userContext } from '../App';
import '../CSS/Home.css'
import Login from './Login';
import Payment from './Payment';
import Register from './Register';
import User from './User';

export default function Home() {
  const location = useLocation();
  const {user} = useContext(userContext);

  return (
    <>
      <div className="container">
        <div className="window">
          <div className="order-info">
            <div className="order-info-content">
              {(() => {
                switch (location.pathname) {
                  case '/login': return <Login />
                  case '/register': return <Register />
                  case '/user': return <User/>
                  default: return <Login />
                }
              })()}

            </div>
          </div>

          <Payment/>

        </div>
      </div>
    </>
  )
}
