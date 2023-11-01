import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    imageEdit: null,
    image: null
    // password: '',
  });
  const [imagePreview, setImagePreview] = useState(); // To display the image preview
  console.log('editimg', formData.imageEdit);

  // ======================================================================================================
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // ======================================================================================================

  const SignInData = localStorage.getItem('userSignInData');
  const signInUserData = JSON.parse(SignInData);
  const tokenData = signInUserData.auth_token;
  console.log('tokendata', tokenData);

  useEffect(async () => {
    const config = {
      headers: {
        Authorization: `${tokenData}`
      }
    };

    const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/UserDetails`, formData, config);
    console.log('userdatials resp', response.data.data);
    const userDetails = response.data;

    console.log('userDetails::::>', userDetails);
    if (userDetails) {
      setFormData({
        first_name: userDetails.data.first_name,
        last_name: userDetails.data.last_name,
        email: userDetails.data.email,
        image: userDetails.data.image
      });
    }
  }, []);

  // ---------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------

  const saveChanges = async () => {
    try {
      const config = {
        headers: {
          Authorization: `${tokenData}`,
          'content-type': 'multipart/form-data'
        }
      };

      // Create the request data based on formData
      const requestData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        image: formData.imageEdit
      };
      const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/EditProfile`, requestData, config);

      // Update user data if needed
      console.log('response==>', response);
      const token = response.data.data.auth_token;

      console.log('token', token);
      // toast.success(response.message);
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 2000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } catch (err) {
      // Handle errors
      setError(err);
      console.error('Error updating data:', err);
      console.log(error);
    }
  };
  // -----------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile));
      setFormData({ ...formData, imageEdit: selectedFile });
    }
  };
  // ======================================================================================================
  // ======================================================================================================

  return (
    <>
      <ToastContainer />
      <h2>Edit Profile</h2>
      <div className="row justify-content-center m-3 p-3 align-center">
        <div className="m-2 w-100">
          <label htmlFor="profileImage">Profile Image</label>
          <input type="file" accept="image/*" id="profileImage" name="profileImage" onChange={handleImageChange} />
        </div>
        <div>
          {imagePreview ? (
            <img src={imagePreview} alt="User Avatar" width="150px" height="150px" />
          ) : (
            <img src={`${process.env.REACT_APP_COMMON_API}/uploads/${formData.image}`} alt="Profile Avatar" width="150px" height="150px" />
          )}
        </div>

        <div className="m-2 w-100">
          <TextField
            label="First Name"
            variant="outlined"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-100">
          <TextField
            label="Last Name"
            variant="outlined"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleFormChange}
          />
        </div>
        <div className="m-2 w-100">
          <TextField label="Email" variant="outlined" type="text" name="email" value={formData.email} onChange={handleFormChange} />
        </div>
      </div>
      <button onClick={saveChanges} className="btn btn-success w-25">
        Save Changes
      </button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.first_name}</td>
            <td>{formData.last_name}</td>
            <td>{formData.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default EditProfile;
