import React, { useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import {
  MDBBtn,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch } from "react-redux";
import { fetchDataStart, fetchDataSuccess } from "./redux/ApiSlice";
import { useNavigate } from "react-router-dom";


const App = () => {
  const [data, setData] = useState({
    Username: "",
    email: "",
    Phone: "",
  });
  // console.log(typeof data, data);
  const [listData, setListData] = useState([]);
  // console.log(typeof listData, listD ata);
  const [editIndex, setEditIndex] = useState(-1);
  const [addMode, setAddMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    Username: "",
    email: "",
    Phone: "",
  });
  console.log(isModalOpen,'ismodelopen');
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setDataInFormState = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!data.Username.trim()) {
      newErrors.Username = "Username is required.";
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(data.Username.trim())) {
      newErrors.Username = "Username can only contain alphabetic characters.";
      isValid = false;
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!data.Phone.trim()) {
      newErrors.Phone = "Phone is required.";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(data.Phone)) {
      newErrors.Phone = "Invalid phone number format (10 digits).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  // ------------------------------------------------------------------------------------

  const handleAddToList = () => {
    if (validateForm()) {
      console.log(data.Username);

      const isDuplicate = listData.some(
        (item) =>
          item.Username === data.Username ||
          item.email === data.email ||
          item.Phone === data.Phone
      );

      if (addMode) {
        // debugger;
        if (isDuplicate) {
          alert("Data already exists in the list.");
          setData({ Username: "", email: "", Phone: "" });
          return true;
        } else {
          setListData([...listData, data]);
        }
      } else {
        // If in edit mode, save the edited item
        const updatedData = [...listData];
        updatedData[editIndex] = { ...data };
        setListData(updatedData);
        setEditIndex(-1); // Exit edit mode
        console.log(updatedData);
      }

      // Reset the form data and switch back to add mode
      setData({
        Username: "",
        email: "",
        Phone: "",
      });
      setAddMode(true);
    }
  };

  // ------------------------------------------------------------------------------------

  const handleEdit = (index) => {
    // Set the data of the item being edited into the form fields
    const itemToEdit = listData[index];
    setData({
      Username: itemToEdit.Username,
      email: itemToEdit.email,
      Phone: itemToEdit.Phone,
    });
    setEditIndex(index);
    console.log("edit btn clicked", itemToEdit);
    setAddMode(false);
  };
  // ------------------------------------------------------------------------------------

  const handleSaveEdit = () => {
    // Save the edited data and reset editIndex

    const updatedData = [...listData];
    updatedData[editIndex] = { ...data };
    setListData(updatedData);
    setEditIndex(-1);
    setAddMode(true);
    console.log("saved", updatedData);
  };
  console.log(handleSaveEdit,'saveedit');
  // ------------------------------------------------------------------------------------

  const handleDeletee = (index) => {
    const updatedList = [...listData];
    updatedList.splice(index, 1);
    setListData(updatedList);

    closeModal();
  };
  // ------------------------------------------------------------------------------------

  const handleSearch = (event) => {
    console.log("called");
    setSearchQuery(event.target.value);
  };
    const filteredData = listData.filter(
      (item) =>
        item.Username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Phone.includes(searchQuery)
    );

    // -----------------------------Fetch data ----------------------------------------------------
    const getData = () => {
      // console.log("called");
      dispatch(fetchDataStart());

      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then(function (response) {
          console.log('from main - btn pressed',response.data);
          dispatch(fetchDataSuccess(response.data));  
          
          toast.success('Data fetched successfully!', {
            position: 'top-right',
            autoClose: 2000, // 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose:()=>{
              navigate('/example')
            }
          }); 
        });
       
    };
  

  return (
    <>
     
      <div className="container-lg py-4">
        <div>
          <h2 className="text-center ">
            {addMode ? "Add New Data" : "Update Data"}
          </h2>
          <div className="row">
            <div className="col-md-6">
              <MDBInput
                label="Username"
                onChange={setDataInFormState}
                type="text"
                name="Username"
                className="mt-2"
                pattern="[A-Za-z]+"
                value={data.Username}
              />

              <span className="text-danger">{errors.Username}</span>
            </div>
            <div className="col-md-6">
              <MDBInput
                label="email"
                onChange={setDataInFormState}
                type="email"
                className="mt-2"
                name="email"
                value={data.email}
              />
              <span className="text-danger">{errors.email}</span>
            </div>
          </div>
          <MDBInput
            label="Phone"
            className="mt-2 no-spinner"
            onChange={setDataInFormState}
            type="tel"
            name="Phone"
            maxLength={10}
            value={data.Phone}
          />

          <span className="text-danger">{errors.Phone}</span>
          <br />
          <button
            onClick={handleAddToList}
            className="btn btn-primary btn-sm my-2"
          >
            {addMode ? "Submit" : "Update"}
          </button>
        </div>

        {/* -------------------------------------------------------------- */}
        <div className="row justify-content-between">
          <h1 className="text-center w-25">Crud Data</h1>

          <form className="d-flex input-group w-25 ">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              onChange={handleSearch}
            />
            {/* <MDBBtn color="primary">Search</MDBBtn> */}
          </form>
          <MDBBtn className="my-3" onClick={getData}>
          Fetch Data
        </MDBBtn>
        <ToastContainer />
        </div>
       

{searchQuery.trim() !== '' && (
  <MDBTable hover>
    
    <MDBTableBody>
      {filteredData.map((item, index) => (
        <tr key={index} className="text-center">
          <td>{item.Username}</td>
          <td>{item.email}</td>
          <td>{item.Phone}</td>
          <td>
            <button
              className="btn btn-info mx-1"
              onClick={() => handleEdit(index)}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>

            <button onClick={() => openModal(index)} className="btn btn-danger mx-1">
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      ))}
    </MDBTableBody>
  </MDBTable>
)}

        {/* -------------------------------------------------------------- */}

        <MDBTable hover>
          <MDBTableHead>
            <tr className="text-center table-info">
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
           
            {listData.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.Username}</td>
                <td>{item.email}</td>
                <td>{item.Phone}</td>
                <td>
                  <button
                    className="btn btn-info mx-1"
                    onClick={() => handleEdit(index)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>

                  <button
                        className="btn btn-danger mx-1"
                        onClick={() => handleDeletee(index)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                {/* <DeleteModal onDelete={()=>handleDelete(index)} itemId={item.id}/> */}
                
                </td>
              </tr>
            ))}
          </MDBTableBody>


          {/* <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Confirm Delete Modal"
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
          >
            <div className="custom-modal-content">
              {" "}
              <h2 className="custom-modal-title text-center">
                Confirm Deletion
              </h2>
              <p className="custom-modal-message text-center">
                Are you sure you want to delete this item?
              </p>
              <div className="custom-modal-buttons">
                <button onClick={handleDelete} className="btn btn-danger mx-4">
                  Delete
                </button>
                <button onClick={closeModal} className="btn btn-info mx-4">
                  Cancel
                </button>
              </div>
            </div>
          </Modal> */}

          {/* ------------------------------------------mdb modal---------------------------------------------- */}
        </MDBTable>
      </div>
    </>
  );
};

export default App;
