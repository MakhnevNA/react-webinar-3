import { Link } from "react-router-dom";
import "./style.css"

function TopNav(props) {
  return (
    <div className="TopNav">
      {props.isAuth ? (
        <>
          <Link to="/profile">{props.name}</Link>
          <button onClick={props.callback}>{props.t("logout")}</button>
        </>
      ) : (
        <Link to="/login">
          <button>{props.t("login")}</button>
        </Link>
      )}
    </div>
  );
}

export default TopNav;