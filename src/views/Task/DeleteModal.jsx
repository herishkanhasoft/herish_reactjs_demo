import React from "react";
import Modal from "react-modal";

const DeleteModal = (props) => {
  console.log("props", props);
  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={() => props.onClose()}
        contentLabel="Confirm Delete Modal"
        className="custom-modal"
        ariaHideApp={false}
        overlayClassName="custom-modal-overlay"
      >
        <div className="custom-modal-content">
          {" "}
          {/* Custom class for modal content */}
          <h2 className="custom-modal-title text-center">Confirm Deletion</h2>
          <p className="custom-modal-message text-center">
            {/* Are you sure you want to delete this item = {props.name} ? */}
            Are you sure you want to delete <b>{props.title}</b> with ID {props.id}?
          </p>
          <div className="custom-modal-buttons text-center">
            {" "}
            {/* Add the "text-center" class */}
            <button
              onClick={() => props.onDelete(props.id)}
              className="btn btn-danger mx-5"
            >
              Delete
            </button>
            <button
              onClick={() => props.onClose()}
              className="btn btn-info mx-5"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
