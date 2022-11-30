import axios from "axios";
const urlBase = "http://localhost:8080/api";

const getSpecialisations = (setSpecialisations) => {
  axios
    .get(`${urlBase}/specialisation/all`)
    .then((json) => {
      setSpecialisations(json.data);
      console.log(json.data);
      return json.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getSpecialisations;
