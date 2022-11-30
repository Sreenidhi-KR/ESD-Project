import React, { useState, useEffect } from "react";
import axios from "axios";
import getSpecialisations from "../services/service.js";
import CoursesModal from "./CoursesModal";

function Table({ specialisations, setSpecialisations }) {
  const urlBase = "http://localhost:8080/api";

  const [shouldEdit, setEdit] = useState("");

  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editCredits, setEditCredits] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [courses, setCourses] = useState([]);

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

  const viewCourses = (specialisation) => {
    setModalShow(true);
    setCourses(specialisation);
  };

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
    <div class="Table-form-container">
      <CoursesModal
        specialisation={courses}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <table class="table table-hover">
        <thead>
          <tr class="table-primary">
            <th scope="col ">Code</th>

            <th scope="col">Name</th>

            <th scope="col">Description</th>

            <th scope="col">Year</th>

            <th scope="col">Credits</th>

            <th colSpan={2}></th>
            <th>
              <button
                type="button"
                onClick={() => {}}
                class="btn btn-sm btn-circle btn-success "
              >
                ➕
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {specialisations &&
            specialisations.map((specialisation, index) => {
              return specialisation.code === shouldEdit ? (
                <tr>
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
                  <td></td>
                  <td>
                    <button
                      class="btn btn-sm btn-circle btn-success "
                      onClick={() => handleUpdate()}
                    >
                      ✔️
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-circle btn-danger"
                      onClick={() => {
                        setEdit("");
                      }}
                    >
                      ⛌
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>{specialisation.code}</td>
                  <td>{specialisation.name}</td>
                  <td>{specialisation.description}</td>
                  <td>{specialisation.year} </td>
                  <td>{specialisation.creditsRequired}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-primary "
                      onClick={() => viewCourses(specialisation)}
                    >
                      Courses
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-circle btn-warning"
                      onClick={() => handleEdit(specialisation)}
                    >
                      🖊️
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(specialisation.code)}
                      class="btn btn-sm btn-circle btn-danger "
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
