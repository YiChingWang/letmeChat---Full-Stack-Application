import "../Header/Header.css";

function Header({ onNavigate }) {
  return (
    <>
      <div className="header">
        <button className="header-logo" onClick={() => onNavigate("main")}>
          LetmeChat.
        </button>
        <button
          className="header-nav-button-about"
          onClick={() => onNavigate("about")}
        >
          About
        </button>
        <button
          className="header-nav-button-howtowork"
          onClick={() => onNavigate("howtowork")}
        >
          How to work
        </button>
      </div>
    </>
  );
}
export default Header;
