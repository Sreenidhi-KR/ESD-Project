import React, { useState } from "react";
import axios from "axios";
import getSpecialisations from "../services/service.js";

function Add({ setSpecialisations, setAdd }) {
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

    if (
      !(
        specialisationCode &&
        specialisationName &&
        specialisationYear &&
        specialisationCredits
      )
    ) {
      alert("All Fields are Required");
    } else {
      axios
        .post(`${urlBase}/specialisation/create`, data)
        .then((json) => {
          //alert("Success");
          clear();
          getSpecialisations(setSpecialisations);
        })
        .catch((error) => {
          alert("Error While Adding");
          clear();
          console.log(error);
        });
    }
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
          className="form-control"
          required
          value={specialisationCode}
          placeholder="Code"
          onChange={(e) => setSpecialisationCode(e.target.value)}
        />
      </td>
      <td colSpan={2}>
        <input
          type="text"
          className="form-control"
          required
          value={specialisationName}
          placeholder="Name"
          onChange={(e) => setSpecialisationName(e.target.value)}
        />
      </td>

      <td colSpan={2}>
        <input
          type="text"
          className="form-control"
          required
          value={specialisationDescription}
          placeholder="Description"
          onChange={(e) => setSpecialisationDescription(e.target.value)}
        />
      </td>
      <td colSpan={2}>
        <input
          type="number"
          className="form-control"
          required
          value={specialisationYear}
          placeholder="Year"
          onChange={(e) => setSpecialisationYear(e.target.value)}
        />
      </td>
      <td colSpan={2}>
        <input
          type="number"
          className="form-control"
          required
          value={specialisationCredits}
          placeholder="Credits Required"
          onChange={(e) => setSpecialisationCredits(e.target.value)}
        />
      </td>
      <td>
        <button
          type="submit"
          className="btn btn-sm btn-circle btn-success "
          onClick={(e) => handleSubmit(e)}
        >
          ✔️
        </button>
        <span> </span>
        <button
          type="button"
          onClick={() => {
            setAdd((value) => !value);
          }}
          class="btn btn-sm btn-circle btn-light"
        >
          🔙
        </button>
      </td>
    </tr>
  );
}

export default Add;
