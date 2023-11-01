import { Grid, TextField, Button, Typography } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const initialValues = {
    password: '',
    newpassword: '',
    confirmpassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    newpassword: Yup.string().required('New Password is required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const SignData = localStorage.getItem('userSignInData');
  const signInUserData = JSON.parse(SignData);
  const tokenData = signInUserData.auth_token;

  const handleSubmit = async (values, { setSubmitting }) => {
    const config = {
      headers: {
        Authorization: tokenData,
      },
    };

    if (values.newpassword === values.confirmpassword) {
      const requestData = {
        password: values.password,
        Newpassword: values.newpassword,
        ConfirmNewpassword: values.confirmpassword,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_COMMON_API}/ChangePassword`,
          requestData,
          config
          
        );

        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 2000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        console.log('Response:', response);
        // Handle success or do other actions on success
      } catch (error) {
        console.error('Error:', error);
        // Handle error or do other actions on error
      }
    } else {
      alert('Password and Confirm Password do not match');
    }

    setSubmitting(false);
  };

  return (
    
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
       
      <Form>
      <ToastContainer />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field
              as={TextField}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              fullWidth
            />
            <ErrorMessage name="password" component={Typography} color="error" />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              label="New Password"
              variant="outlined"
              type="password"
              name="newpassword"
              fullWidth
            />
            <ErrorMessage name="newpassword" component={Typography} color="error" />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="confirmpassword"
              fullWidth
            />
            <ErrorMessage name="confirmpassword" component={Typography} color="error" />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default ChangePassword;

