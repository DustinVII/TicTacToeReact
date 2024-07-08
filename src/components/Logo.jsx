export default function Logo({ showMainMenu }) {

  return (
    <div className="row">
        <div className="col text-center">
          <div id="logo" className="no-highlight">
            <a href="#" onClick={showMainMenu} title="Tic Tac Toe by Dustin Refos">
              <img src="/src/assets/tictactoe-logo.png" alt="Tic Tac Toe Logo" />
            </a>
          </div>
        </div>
      </div>
  )
}