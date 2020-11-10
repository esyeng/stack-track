import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <section>
        <div>
          Welcome,
          <Link to="/login"> Login </Link> or
          <Link to="/signup"> Sign Up </Link>
          to get started
        </div>
      </section>
    </div>
  );
}
