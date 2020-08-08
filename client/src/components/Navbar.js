import React, { useContext } from "react";
import { AppContext } from "../context api/Appcontext";
import { Button } from "semantic-ui-react";

export default function Navbar() {
  const { user } = useContext(AppContext);
  const logout = {};
  return (
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#">
        <h2>
          <strong>Vidco</strong>
        </h2>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          {/* <li class="nav-item">
        <a class="nav-link" href="#">Dashboard</a>
      </li> */}
          {user._id ? (
            <Button onClick={logout} secondary class="nav-item">
              <a class="nav-link" href="#">
                Logout
              </a>
            </Button>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}
