// import * as React from 'react';
// import Modal from '@mui/material/Modal';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import { Alert, Grid, OutlinedInput, Snackbar } from '@mui/material';

// export default function MyModal() {
//   const navigate = useNavigate();
//   //   const [image, setImage] = useState(null); // To store the uploaded image
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     image: null,
//   });
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const handleBack = () => {
//     navigate('/userdetails');
//   };

//   const handleSelectChange = (event) => {
//     // event.preventDefault()
//     const { value, name } = event.target;
//     console.log('==>', event.target.value);
//     setFormData({
//       ...formData,
//       id: Date.now(),
//       [name]: value
//     });
//   };
//   const handleImageUpload = (event) => {
//     const imageFile = event.target.files[0];
//     console.log(imageFile);

//     setFormData({
//       ...formData,
//       image: imageFile // Store the image file in formData
//     });
//     // Create a URL for the image preview
//     // const imageUrl = URL.createObjectURL(imageFile);
//     // setImagePreview(imageUrl);
//   };

//   const handleAddUser = async () => {
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data'
//       }
//     };

//     // Handle user addition logic with the captured input field values
//     const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/AddUser`, formData, config);
//     console.log('create u details ----', response);
//     setOpenSnackbar(true);
//     // navigate('/userdetails');
//   };

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//     navigate('/userdetails');
//   };

//   return (
//     <>
//      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }} >
//           User added successfully!
//         </Alert>
//       </Snackbar>
//       <Modal open={true} onClose={true}>
//         <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//               {/* Snackbar for success message */}
     
//         <h1 style={{ textAlign: 'center', paddingTop:'7px' }}>Add User</h1>
//           <div style={{ padding: '16px' }}>
//             <TextField
//               id="outlined-basic"
//               label="First Name"
//               variant="outlined"
//               fullWidth
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleSelectChange}
//               margin="normal"
//             />
//             <TextField
//               id="outlined-basic"
//               label="Last Name"
//               variant="outlined"
//               fullWidth
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleSelectChange}
//               margin="normal"
//             />
//             <TextField
//               id="outlined-basic"
//               label="Email"
//               variant="outlined"
//               fullWidth
//               name="email"
//               value={formData.email}
//               onChange={handleSelectChange}
//               margin="normal"
//             />

//             <Grid xs={12} sm={12}>
//               <OutlinedInput
//                 type="file"
//                 accept="image/*"
//                 onChange={(event) => {
//                   handleImageUpload(event);
//                 }}
//               />
//             </Grid>
//             <Grid xs={2} sx={{ marginTop: '7px' }} spacing={4}>
//               <Button variant="contained" onClick={handleAddUser} sx={{ marginRight: '5px' }}>
//                 Add User
//               </Button>
//               <Button variant="contained" onClick={handleBack} style={{ backgroundColor: 'orangered' }}>
//                 Back
//               </Button>
//             </Grid>
//           </div>
//         </Paper>
      
//       </Modal>
//     </>
//   );
// }
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Alert, Grid, OutlinedInput, Snackbar } from '@mui/material';

export default function MyModal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    image: null
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const handleBack = () => {
    navigate('/userdetails');
  };

  const handleSelectChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      id: Date.now(),
      [name]: value
    });
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setFormData({
      ...formData,
      image: imageFile
    });
  };

  const handleAddUser = async () => {
    // Validate the input fields
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setError('Please fill in all required fields.');
      return;
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/AddUser`, formData, config);
    
    if (response.data.message) {
      setOpenSnackbar(true);
      setError('');
    } else {
      setError('An error occurred while adding the user.');
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    navigate('/userdetails');
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          User added successfully!
        </Alert>
      </Snackbar>
      <Modal open={true} onClose={true}>
        <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 style={{ textAlign: 'center', paddingTop: '7px' }}>Add User</h1>
          {error && <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>}
          <div style={{ padding: '16px' }}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth
              name="first_name"
              value={formData.first_name}
              onChange={handleSelectChange}
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
              name="last_name"
              value={formData.last_name}
              onChange={handleSelectChange}
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleSelectChange}
              margin="normal"
            />

            <Grid xs={12} sm={12}>
              <OutlinedInput
                type="file"
                accept="image/*"
                onChange={(event) => {
                  handleImageUpload(event);
                }}
              />
            </Grid>
            <Grid xs={2} sx={{ marginTop: '7px' }} spacing={4}>
              <Button variant="contained" onClick={handleAddUser} sx={{ marginRight: '5px' }}>
                Add User
              </Button>
              <Button variant="contained" onClick={handleBack} style={{ backgroundColor: 'orangered' }}>
                Back
              </Button>
            </Grid>
          </div>
        </Paper>
      </Modal>
    </>
  );
}
