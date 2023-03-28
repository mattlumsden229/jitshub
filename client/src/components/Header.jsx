import logo from "./assets/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Header() {
  return (
    <nav className="navbar p-2 mb-5">
      <a href="/" className="navbar-brand">
        <div className="d-flex">
          <img src={logo} alt="" />
          <span>JitsHUB</span>
        </div>
      </a>
      <div className="d-flex">
        <Dropdown>
          <DropdownButton
            variant="dark"
            id="dropdown-basic"
            drop="down-centered"
            title="Forums"
          >
            <Dropdown.Item href="/forums/general">General</Dropdown.Item>
            <Dropdown.Item href="/forums/tournaments">
              Tournaments
            </Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        <a href="/users" className="btn btn-dark">
          Users
        </a>
        <a href="/groups" className="btn btn-dark">
          Groups
        </a>
      </div>
      <a href="/login" className="link-secondary">
        Login/Sign Up
      </a>
    </nav>
  );
}
