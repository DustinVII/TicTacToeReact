import { useState } from 'react'
import Logo from './components/Logo';
import MainMenu from './components/MainMenu';
import LoginForm from './components/LoginForm';
import Gameboard from './components/Gameboard';
import Footer from './components/Footer';
//import reactLogo from './assets/react.svg'
//import './App.css'

export default function App() {
  const [ShowMainMenu, setShowMainMenu] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showGameBoard, setShowGameBoard] = useState(false);

  const handleMainMenu = () => {
    setShowMainMenu(true);
    setShowGameBoard(false);
    setShowLoginForm(false);
  };

  const handleLogin = () => {
    setShowLoginForm(true);
    setShowGameBoard(false);
  };


  const handlePlayAsGuest = () => {
    setShowGameBoard(true);
  };

  return (
    <div className="container-md">
      <Logo showMainMenu={handleMainMenu} />

      <div className="row">
        <div className="col text-center">

        {!showGameBoard && !showLoginForm && (
            <MainMenu onLogin={handleLogin} onPlayAsGuest={handlePlayAsGuest} />
          )}

        {showLoginForm && <LoginForm />}

        {showGameBoard && <Gameboard />}


        </div>
      </div>

      

      <Footer />
    </div>
  );
}