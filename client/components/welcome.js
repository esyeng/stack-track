import React from "react";
import { Link } from "react-router-dom";
// import Header from "./layouts/Header";
import history from "../history";

export default function Welcome() {
  const [user, setUser] = useState();

  return (
    <div>
      <section>
        <div className="auth">
          Welcome,
          <Link to="/login">Login</Link>
          or
          <Link to="/signup">Sign Up</Link>
          to get started
        </div>
      </section>
    </div>
  );
}
