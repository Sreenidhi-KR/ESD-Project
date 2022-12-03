import Modal from "react-bootstrap/Modal";

function CoursesModal(props) {
  console.log(props);
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Courses under {props.specialisation.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul class="list-group list-group-flush list-group-numbered">
          {props.specialisation.courseList &&
          props.specialisation.courseList.length > 0 ? (
            props.specialisation.courseList.map((i) => {
              return (
                <li key={i.code} class="list-group-item">
                  {i.name}
                </li>
              );
            })
          ) : (
            <p>No Courses</p>
          )}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
export default CoursesModal;
