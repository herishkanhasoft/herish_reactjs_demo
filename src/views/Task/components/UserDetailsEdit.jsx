// import * as React from 'react';
// import Modal from '@mui/material/Modal';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router';
// import axios from 'axios';
// import { Grid, OutlinedInput } from '@mui/material';

// export default function MyModal({ isOpen, handleClose }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Extract values from location.state or use empty values
//   const { _id, first_name, last_name, email, img } = location.state || {};

//   // Initialize the form data with the extracted values
//   const [formData, setFormData] = useState({
//     _id,
//     first_name: first_name || '',
//     last_name: last_name || '',
//     email: email || '',
//     image: null
//   });

//   useEffect(() => {
//     // Update the form data when the location state changes (e.g., when editing)
//     setFormData({
//       ...formData,
//       first_name: first_name || '',
//       last_name: last_name || '',
//       email: email || '',
//     });
//   }, [location.state]);

//   const handleBack = () => {
//     navigate('/userdetails');
//   };

//   const handleSelectChange = (event) => {
//     const { value, name } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageUpload = (event) => {
//     const imageFile = event.target.files[0];
//     setFormData({
//       ...formData,
//       image: imageFile,
//     });
//   };

//   const handleEditUser = async () => {
//     // Handle user addition or editing logic with the captured input field values
//     const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/EditUser`, formData);
//     console.log('create or edit user response:', response);
//     navigate('/userdetails')
//   };

//   return (
//     <Modal open={true} onClose={true}>
//       <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//         <div style={{ padding: '16px' }}>
//         <TextField
//             id="outlined-basic"
//             label="ID"
//             variant="outlined"
//             fullWidth
//             name="_id"
//             value={_id}
//             InputProps={{ disabled: true }}
//             margin="normal"
//           />
//           <TextField
//             id="outlined-basic"
//             label="First Name"
//             variant="outlined"
//             fullWidth
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleSelectChange}
//             margin="normal"
//           />
//           <TextField
//             id="outlined-basic"
//             label="Last Name"
//             variant="outlined"
//             fullWidth
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleSelectChange}
//             margin="normal"
//           />
//           <TextField
//             id="outlined-basic"
//             label="Email"
//             variant="outlined"
//             fullWidth
//             name="email"
//             value={formData.email}
//             onChange={handleSelectChange}
//             margin="normal"
//           />

//           <Grid xs={12} sm={12}>
//             <OutlinedInput
//               type="file"
//               accept="image/*"
//               onChange={(event) => {
//                 handleImageUpload(event);
//               }}
//             />
//           </Grid>
//           <Button variant="contained" onClick={handleEditUser}>
//             Save
//           </Button>
//           <Button variant="contained" onClick={handleBack}>
//             Back
//           </Button>
//         </div>
//       </Paper>
//     </Modal>
//   );
// }

// ==============================================================================================================
// ==============================================================================================================
// code above is without validation
// ==============================================================================================================
// ==============================================================================================================

import * as React from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import axios from 'axios';
import { Grid, OutlinedInput } from '@mui/material';

export default function MyModal() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract values from location.state or use empty values
  const { _id, first_name, last_name, email } = location.state || {};

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  // Initialize the form data with the extracted values
  const formik = useFormik({
    initialValues: {
      _id,
      first_name: first_name || '',
      last_name: last_name || '',
      email: email || '',
      image: null || '',
    },
    validationSchema,
    onSubmit: async (values) => {

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      // Handle user addition or editing logic with the captured input field values
      const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/EditUser`, values,config);
      console.log('create or edit user response:', response);
      navigate('/userdetails');
    },
  });

  const handleClose = ()=>{
    navigate('/userdetails')
  }

  return (
    <Modal open={true} onClose>
      <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ padding: '16px' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="outlined-basic"
              label="ID"
              variant="outlined"
              fullWidth
              name="_id"
              value={_id}
              InputProps={{ disabled: true }}
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={formik.touched.first_name && Boolean(formik.errors.first_name)}
              helperText={formik.touched.first_name && formik.errors.first_name}
              onBlur={formik.handleBlur}
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
              onBlur={formik.handleBlur}
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
              margin="normal"
            />
            <Grid xs={12} sm={12}>
              <OutlinedInput
                type="file"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
              />
            </Grid>
            <Button type="submit" variant="outlined" style={{ backgroundColor: 'green', color: 'white' }}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose} style={{ backgroundColor: 'blue', color: 'white' }}>
              Back
            </Button>
          </form>
        </div>
      </Paper>
    </Modal>
  );
}
