import React from "react";
import "./App.css";
import { Fragment, useState } from "react";

import Login from "./components/Login";
import Add from "./components/Add";
import Table from "./components/Table";

function App() {
  const [userID, setUserId] = useState(-1);
  const [specialisations, setSpecialisations] = useState([]);

  return userID <= 0 ? (
    <Login user={setUserId} />
  ) : (
    <Fragment>
      <Add setSpecialisations={setSpecialisations} />
      <Table
        specialisations={specialisations}
        setSpecialisations={setSpecialisations}
      />
    </Fragment>
  );
}

export default App;
