export default function MainMenu({ onLogin, onPlayAsGuest }) {

    return (
        <div className="menu">
        <ul>
        {/*<li><a href="#" onClick={onLogin}>Login</a></li>*/}
        <li><a href="#" onClick={onPlayAsGuest}>Start a Game</a></li>
        {/*<li><a href="#">Register</a></li>*/}
        <li><a href="https://github.com/DustinVII" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
        </div>
    )
  }