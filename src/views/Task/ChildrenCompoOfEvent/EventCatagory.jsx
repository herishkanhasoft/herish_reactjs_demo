import { Button, InputAdornment,TextField } from "@mui/material";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import React, { useState } from "react";
// import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  deleteEvent,
  storeExpDataCatagory,
} from "../redux/EventSlice";
import DeleteModal from "../DeleteModal";

const EventCatagory = () => {
  const storeJsonData = useSelector((state) => state.events.jsonDataStore);
  const eventData = useSelector((state) => state.events.eventCatagory);
  const StoredExpData = useSelector((state) => state.events.jsonDataStore);
  console.log("===>", StoredExpData);
  const dispatch = useDispatch();

  const [jsonData, setJsonData] = useState(null);
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  console.log("from catagory", eventData);
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };
console.log(jsonData,'data');
  const handleAddEvent = () => {
    if (eventName) {
      const newEvent = {
        id: eventData.length + 1, // Generate a unique ID for the event
        name: eventName,
      };
      setEvents([...events, newEvent]);
      dispatch(addEvent(newEvent));
      setEventName("");
    }
  };

  const openModal = (name) => {
    console.log(name);
    setDeleteId(name);
    setModalDelete(true);
  };

  const handleCloseModal = () => {
    setDeleteId("");
    setModalDelete(false);
  };

  const handleDeleteItem = (delId) => {
    console.log("me-here", delId);
    console.log("sddsdd", eventData);
    console.log(delId, eventData);
    const filterData = eventData.filter((data) => data.name !== delId);
    console.log("after-delete", filterData);
    dispatch(deleteEvent(delId));
    handleCloseModal();
  };

  const HandleExpJsonFile = () => {
    if (eventData && eventData.length > 0) {
      // Convert eventData to a formatted JSON string
      const jsonString = JSON.stringify(eventData, null, 2);

      // Create a Blob with the JSON data
      const blob = new Blob([jsonString], { type: "application/json" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Set the JSON data
      setJsonData(jsonString);
      dispatch(storeExpDataCatagory(jsonString));
      // Create an anchor element to download the JSON file
      const a = document.createElement("a");
      a.href = url;
      a.download = "event_catagoryData.json";

      // Trigger a click on the anchor element to initiate the download
      a.click();

      // Revoke the URL to free up resources
      URL.revokeObjectURL(url);
    } else {
      alert("Data Field is empty");
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6">
            <TextField
              label="Event Name"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={eventName}
              onChange={handleEventNameChange}
            />
            <div className="ms-2">
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddEvent}
              >
                Add Event
              </Button>
              <button className="btn btn-info mx-1" onClick={HandleExpJsonFile}>
                Exp json
              </button>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <MDBTable>
              <MDBTableHead>
                <tr className="table-info">
                  <th scope="col">ID</th>
                  <th scope="col">Event</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {eventData?.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => openModal(event.name)}
                        className="btn btn-danger mx-1"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
        {modalDelete && (
          <DeleteModal
            name={"delectus aut autem"}
            // title={title}
            id={deleteId}
            onClose={() => handleCloseModal()}
            onDelete={(delId) => handleDeleteItem(delId)}
          />
        )}

        {storeJsonData && (
          <div>
            <h2>Exported JSON Data</h2>
            <pre>{storeJsonData}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default EventCatagory;
