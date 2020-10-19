import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <section>
        <div>
          Welcome, log in to get started
          <Link to="/login"> Login </Link>
        </div>
      </section>
    </div>
  );
}
