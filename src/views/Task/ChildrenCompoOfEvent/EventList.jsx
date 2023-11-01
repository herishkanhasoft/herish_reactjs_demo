import React, { useState } from 'react';
import { MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addEventList, storeExpDataList } from '../redux/EventSlice';

const EventList = () => {
  const storeJsonData = useSelector((state) => state.events.jsonDataList);
  const events = useSelector((state) => state.events.eventCatagory);
  const dispatch = useDispatch();

  const [jsonData, setJsonData] = useState(null);
  const eventListData = useSelector((state) => state.events.eventList);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState('');
  const [inputData, setInputData] = useState({
    catagory: '',
    name: '',
    location: '',
    date: '',
    inocation: ''
  });

  console.log(jsonData, 'jsondata');
  console.log(tableData, 'tabledata');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveData = () => {
    if (!inputData.catagory || !inputData.name || !inputData.location) {
      setError('Please fill in all required fields.'); // Display error message
    } else {
      setError(''); // Clear error message
      setTableData((prevData) => [...prevData, inputData]);
      dispatch(addEventList(inputData));
      setSelectedEvent({ id: '', name: '' });
      setInputData({
        catagory: '',
        name: '',
        location: '',
        date: '',
        inocation: ''
      });
    }
  };

  const [selectedEvent, setSelectedEvent] = useState({
    id: '',
    name: ''
  });

  const handleSelectChange = (event) => {
    // Get the selected value and label from the event object
    const selectedValue = event.target.value;
    const selectedLabel = event.target.options[event.target.selectedIndex].text;
    console.log('selectedValue-id', selectedValue);
    console.log('selectedLabel-id', selectedLabel);

    // Update the state with the selected value and label
    setSelectedEvent({
      id: selectedValue,
      name: selectedLabel
    });
    setInputData((prevData) => ({
      ...prevData,
      catagory: selectedLabel
    }));
  };
  // ----------------------- csv start -----------------------------

  const handleDownloadCSV = () => {
    if (eventListData.length === 0) {
      alert('No data to export.');
      return;
    }

    // Define the CSV content
    const csvContent =
      'CATAGORY,NAME,LOCATION,DATE,INAUGATION\n' +
      eventListData
        .map((data) => {
          return `${data.catagory},${data.name},${data.location},${data.date},${data.inocation}`;
        })
        .join('\n');

    // Create a data URL for the CSV content
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);

    // Create an anchor element for downloading
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'eventList.csv');
    link.style.display = 'none';

    // Append the link to the document and trigger the click event
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----------------------- csv End -----------------------------
  // _______________________json start ____________________________
  const HandleExpJsonFile = () => {
    if (eventListData && eventListData.length > 0) {
      // Convert eventListData to a formatted JSON string
      const jsonString = JSON.stringify(eventListData, null, 2);

      // Create a Blob with the JSON data
      const blob = new Blob([jsonString], { type: 'application/json' });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Set the JSON data
      setJsonData(jsonString);
      dispatch(storeExpDataList(jsonString));
      // Create an anchor element to download the JSON file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'event_ListData.json';

      // Trigger a click on the anchor element to initiate the download
      a.click();

      // Revoke the URL to free up resources
      URL.revokeObjectURL(url);
    } else {
      alert('Data Field is empty');
    }
  };
  // _______________________json End ____________________________

  return (
    <div className="row">
      <div className="col-md-6">
        <div>
          <b>{error}</b>
        </div>
        <select id="eventSelect" onChange={handleSelectChange} value={selectedEvent.id}>
          <option value="">-- Select an event --</option>
          {events?.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>

        <div className="col-md-4 my-1">
          <MDBInput label="Name" id="name" type="text" name="name" value={inputData.name} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 my-1">
          <MDBInput label="Location" id="location" type="text" name="location" value={inputData.location} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 my-1">
          <MDBInput label="Date" id="date" type="date" name="date" value={inputData.date} onChange={handleInputChange} />
        </div>
        <div className="col-md-4 my-1">
          <MDBInput
            label="inocation"
            id="inocation"
            type="text"
            name="inocation"
            value={inputData.inocation}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSaveData}>
          Save Data
        </button>
        <button className="btn btn-secondary mx-1" onClick={handleDownloadCSV}>
          Csv{' '}
        </button>
        <button className="btn btn-info" onClick={HandleExpJsonFile}>
          Exp json
        </button>
      </div>
      <div className="col-md-6">
        <MDBTable>
          <MDBTableHead>
            <tr className="table-info">
              <th>CATAGORY</th>
              <th>NAME</th>
              <th>LOCATION</th>
              <th>DATE</th>
              <th>INAUGATION</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {eventListData?.map((data, index) => (
              <tr key={index}>
                <td>{data.catagory}</td>
                <td>{data.name}</td>
                <td>{data.location}</td>
                <td>{data.date}</td>
                <td>{data.inocation}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      {storeJsonData && (
        <div>
          <h2>Exported JSON Data</h2>
          <pre>{storeJsonData}</pre>
        </div>
      )}
    </div>
  );
};

export default EventList;

// -----------------------------------------------------------------------------------------------
