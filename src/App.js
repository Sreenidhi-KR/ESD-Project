import React from "react";
import "./App.css";
import { Fragment, useState } from "react";

import Login from "./components/login";

import TableView from "./components/table";

function App() {
  const [userID, setUserId] = useState(localStorage.getItem("Id"));

  return userID <= 0 ? (
    <Login user={setUserId} />
  ) : (
    <Fragment>
      <div class="logout">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem("Id", -1);
            setUserId(-1);
          }}
          class="btn btn-sm btn-circle btn-danger "
        >
          ⏻
        </button>
      </div>

      <TableView />
    </Fragment>
  );
}

export default App;
