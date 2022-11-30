import React, { useEffect } from "react";
import "./App.css";
import { Fragment, useState } from "react";
import axios from "axios";

function App() {
  const [specialisationName, setSpecialisationName] = useState("");
  const [specialisationCode, setSpecialisationCode] = useState("");
  const [specialisationDescription, setSpecialisationDescription] =
    useState("");
  const [specialisationYear, setSpecialisationYear] = useState("");
  const [specialisationCredits, setSpecialisationCredits] = useState("");

  const [specialisations, setSpecialisations] = useState([]);

  const [shouldEdit, setEdit] = useState("");

  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editCredits, setEditCredits] = useState("");

  const [userID, setUserId] = useState(-1);

  useEffect(() => {
    getSpecialisations();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        if (json.status === 200) {
          alert("Success");
        } else {
          alert("Error");
        }
        clear();
        getSpecialisations();
      })
      .catch((error) => {
        console.log(error);
      });
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
        clear();
        setEdit(-1);
      })
      .then(() => {
        getSpecialisations();
      })
      .catch((error) => {
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

  const getSpecialisations = () => {
    axios
      .get(`${urlBase}/specialisation/all`)
      .then((json) => {
        setSpecialisations(json.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        getSpecialisations();
      });
  };

  const viewCourses = (code) => {};

  const startLogin = (credentials) => {
    axios
      .post(`${urlBase}/student/login`, credentials)
      .then((json) => {
        setUserId(json.data.studentId);
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        alert("Inavlid Credintials");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = {
      email,
      password,
    };
    startLogin(credentials);
  };

  return userID <= 0 ? (
    <div className="form-container">
      <div className="form-box regular-shadow">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i
              className="fa fa-user-circle"
              style={{ fontSize: "110px", color: "lightblue" }}
            ></i>
          </h4>
          <div className="image"></div>
        </div>

        <div className="body-form">
          <form onSubmit={handleLogin} id="login-form">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                required
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              id="login-submit"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Fragment>
      <input
        type="text"
        value={specialisationName}
        placeholder="Specialisation Name"
        onChange={(e) => setSpecialisationName(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        value={specialisationCode}
        placeholder="Specialisation Code"
        onChange={(e) => setSpecialisationCode(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        value={specialisationDescription}
        placeholder="Specialisation Description"
        onChange={(e) => setSpecialisationDescription(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        value={specialisationYear}
        placeholder="Specialisation Year"
        onChange={(e) => setSpecialisationYear(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        value={specialisationCredits}
        placeholder="Specialisation Credits Required"
        onChange={(e) => setSpecialisationCredits(e.target.value)}
      />
      <br></br>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>

      <br></br>

      <table>
        <th>No</th>
        <th>Code</th>
        <th>Name</th>
        <th>Description</th>
        <th>Year</th>
        <th>Credits Required</th>
        <th colSpan={3}>Action</th>
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
    </Fragment>
  );
}

export default App;
