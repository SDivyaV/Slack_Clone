import React from 'react';
import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if(loading) {
    return(
      <AppLoading>
        <AppLoadingContent>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1024px-Slack_icon_2019.svg.png'
                alt='' />
          <Spinner 
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn='none'
          />
        </AppLoadingContent>
      </AppLoading>
    )
  }

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div>
          <Header />
          <AppBody>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />}/>
            </Routes>
          </AppBody>
          </div>
        )}
      </Router>
    </div>
  )
}

export default App;

const AppBody = styled.div`
  display:flex;
  height:100vh;
`

const AppLoading = styled.div`
   display: grid;
   place-items: center;
   height: 100vh;
   width: 100%;
`;

const AppLoadingContent = styled.div`
  text-align:center;
   padding-bottom: 100px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
   }
`;
