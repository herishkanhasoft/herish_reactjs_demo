import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Container } from '@mui/system';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BasicModal() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState(false);
  const navigate = useNavigate();

  const url = window.location.href;

  React.useEffect(() => {
    if (url.split('?')[1]) {
      setToken(url.split('?')[1]);
    } else {
      setToken(false);
    }
  }, [url]);

  const handleSave = async () => {
    console.log('called save');
    const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/SendLink`, { email: email });
    console.log(response.data.data.token);

    const yopmailURL = 'https://yopmail.com/en/wm'; // Replace with the actual URL of the Yopmail verification page

    toast.success(response.data.message, {
      position: 'top-right',
      autoClose: 2000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        window.open(yopmailURL, '_blank');
      }
    });
  };

  const handleResetPasswordSubmit = async () => {
    const config = {
      headers: {
        Authorization: `${token}`
      }
    };
    const responce = await axios.post(`${process.env.REACT_APP_COMMON_API}/ForgetPassword`, { password }, config);
    console.log('resp from forget password', responce);
    toast.success(responce.data.message, {
      position: 'top-right',
      autoClose: 2000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        navigate('/pages/login/login3');
      }
    });
  };

  const handleBack = () => {
    navigate('/pages/login/login3');
  };

  return (
    <>
      <ToastContainer />
      <Grid container direction="column" justifyContent="center" height={'100vh'} alignItems="center">
        <Container maxWidth="xs">
          {!token && (
            <Typography id="modal-modal-description" display="flex" justifyContent="center" flexDirection="column">
              <div className="m-auto w-50 ">
                <TextField
                  label="Email"
                  variant="outlined"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Send
              </Button>
              <Button onClick={handleBack} variant="contained" color="secondary" sx={{ marginTop: 2 }}>
                Back
              </Button>
            </Typography>
          )}

          {token && (
            <Typography id="modal-modal-description" display="flex" justifyContent="center" flexDirection="column">
              <ToastContainer />
              <div className="m-auto w-50 ">
                <TextField
                  label="password"
                  variant="outlined"
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button onClick={handleResetPasswordSubmit} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Send
              </Button>
              <Button onClick={handleBack} variant="contained" color="secondary" sx={{ marginTop: 2 }}>
                Back
              </Button>
            </Typography>
          )}
        </Container>
      </Grid>
    </>
  );
}
