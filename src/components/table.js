import React, { useState, useEffect } from "react";
import axios from "axios";
import getSpecialisations from "../services/service.js";
function Table({ specialisations, setSpecialisations }) {
  const urlBase = "http://localhost:8080/api";

  const [shouldEdit, setEdit] = useState("");

  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editCredits, setEditCredits] = useState("");

  const handleEdit = (specialisation) => {
    setEdit(specialisation.code);
    setEditCode(specialisation.code);
    setEditName(specialisation.name);
    setEditDescription(specialisation.description);
    setEditYear(specialisation.year);
    setEditCredits(specialisation.creditsRequired);
  };

  const handleDelete = (code) => {
    axios
      .delete(`${urlBase}/specialisation/delete?specialisationCode=${code}`)
      .then((json) => {
        getSpecialisations(setSpecialisations);
      });
  };

  const viewCourses = (code) => {};

  const handleUpdate = () => {
    const data = {
      code: editCode,
      name: editName,
      description: editDescription,
      year: editYear,
      creditsRequired: editCredits,
    };
    console.log(data);
    axios
      .patch(`${urlBase}/specialisation/update`, data)
      .then((json) => {
        //clear();
        setEdit(-1);
      })
      .then(() => {
        getSpecialisations(setSpecialisations);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSpecialisations(setSpecialisations);
  }, []);

  return (
    <table>
      <thead>
        <th>No</th>

        <th>Code</th>

        <th>Name</th>

        <th>Description</th>

        <th>Year</th>

        <th>Credits Required</th>

        <th colSpan={3}>Action</th>
      </thead>
      <tbody>
        {specialisations &&
          specialisations.map((specialisation, index) => {
            return specialisation.code === shouldEdit ? (
              <tr>
                <td>{index + 1}</td>
                <td>{editCode}</td>
                <td>
                  <input
                    type="text"
                    value={editName}
                    placeholder="Specialisation Name"
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editDescription}
                    placeholder="Specialisation Description"
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editYear}
                    placeholder="Specialisation Year"
                    onChange={(e) => setEditYear(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editCredits}
                    placeholder="Specialisation Credits Required"
                    onChange={(e) => setEditCredits(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdate()}>Update</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setEdit("");
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>{index + 1}</td>
                <td>{specialisation.code}</td>
                <td>{specialisation.name}</td>
                <td>{specialisation.description}</td>
                <td>{specialisation.year}</td>
                <td>{specialisation.creditsRequired}</td>
                <td>
                  <button onClick={() => handleEdit(specialisation)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(specialisation.code)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => viewCourses(specialisation.code)}>
                    View Courses
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
export default Table;
