import React, { useState } from "react";
import axios from "axios";
import getSpecialisations from "../services/service.js";

function Add({ setSpecialisations }) {
  const [specialisationName, setSpecialisationName] = useState("");
  const [specialisationCode, setSpecialisationCode] = useState("");
  const [specialisationDescription, setSpecialisationDescription] =
    useState("");
  const [specialisationYear, setSpecialisationYear] = useState("");
  const [specialisationCredits, setSpecialisationCredits] = useState("");

  const urlBase = "http://localhost:8080/api";

  const handleSubmit = (e) => {
    const data = {
      code: specialisationCode,
      name: specialisationName,
      description: specialisationDescription,
      year: specialisationYear,
      creditsRequired: specialisationCredits,
    };
    axios
      .post(`${urlBase}/specialisation/create`, data)
      .then((json) => {
        alert("Success");
        clear();
        getSpecialisations(setSpecialisations);
      })
      .catch((error) => {
        alert("error");
        clear();
        console.log(error);
      });
  };

  const clear = () => {
    setSpecialisationCode("");
    setSpecialisationName("");
    setSpecialisationDescription("");
    setSpecialisationCredits("");
    setSpecialisationYear("");
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={specialisationCode}
          placeholder="Code"
          onChange={(e) => setSpecialisationCode(e.target.value)}
        />
      </td>
      <td colSpan={2}>
        <input
          type="text"
          value={specialisationName}
          placeholder="Name"
          onChange={(e) => setSpecialisationName(e.target.value)}
        />
      </td>

      <td colSpan={2}>
        <input
          type="text"
          value={specialisationDescription}
          placeholder="Description"
          onChange={(e) => setSpecialisationDescription(e.target.value)}
        />
      </td>
      <td colSpan={2}>
        <input
          type="text"
          value={specialisationYear}
          placeholder="Year"
          onChange={(e) => setSpecialisationYear(e.target.value)}
        />
      </td>
      <td colSpan={2}>
        <input
          type="text"
          value={specialisationCredits}
          placeholder="Credits Required"
          onChange={(e) => setSpecialisationCredits(e.target.value)}
        />
      </td>
      <td>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </td>
    </tr>
  );
}

export default Add;
