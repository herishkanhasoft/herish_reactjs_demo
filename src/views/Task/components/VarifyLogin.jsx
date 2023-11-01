import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Grid, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Box } from '@mui/system';
import OtpInput from 'react-otp-input';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function QRCodeWithOTP() {
  const [otp, setOTP] = useState('');
  const [verificationCode, setVerificationCode] = useState({
    secretkey: '',
    email: ''
  });
  const navigate = useNavigate();

  const SignInData = localStorage.getItem('userSignInData');
  const signInUserData = JSON.parse(SignInData);
  const secretKeyData = signInUserData.otpauth_url;
  const email = signInUserData.email;

  React.useEffect(() => {
    setVerificationCode({ secretkey: secretKeyData, email: email });
  }, [secretKeyData]); // Dependency array ensures this effect runs only when secretKey changes

  const verifyOTP = async () => {
    const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/VerifyOtp`, {
      secretkey: otp,
      email: verificationCode.email
    });
    console.log('verifyotp===', response.data.message);

    if (response.data.message == 'verify successfully') {
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 1500, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          navigate('/dashboard/default');
        }
      });
    } else {
      //   alert('Invalid Otp');
      toast.error('Invalid OTP', {
        position: 'top-right',
        autoClose: 1500, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };
  const fetch = async () => {
    if (otp.length === 6) {
      const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/VerifyOtp`, {
        secretkey: otp,
        email: verificationCode.email
      });
      console.log('verifyotp===', response.data.message);

      if (response.data.message === 'verify successfully') {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 1500, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            navigate('/dashboard/default');
          }
        });
      } else {
        // alert('Invalid OTP');
        toast.error('Invalid OTP', {
          position: 'top-right',
          autoClose: 1500, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
  };
  fetch();

  const handleBack = async () => {
    const SignInData = localStorage.getItem('userSignInData');
    const signInUserData = JSON.parse(SignInData);
    console.log('signinparseduserdata::::>', signInUserData);
    const tokenData = signInUserData.auth_token;
    console.log('udatafrom localstrg', tokenData);
    // return false

    const config = {
      headers: {
        Authorization: `${tokenData}`
      }
    };
    const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/Logout`, null, config);
    console.log('logout resp token', response);

    navigate('/pages/login/login3');
  };

  return (
    <>
      <ToastContainer />
      <Grid container maxWidth={'sm'} margin={'auto'} justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
        <Grid item xs={12} textAlign="center">
          <QRCode value={verificationCode.secretkey} />
        </Grid>
        <Grid item xs={12} textAlign="center" boxShadow={5} borderRadius={7} padding={3} margin={3}>
          <Typography variant="h6" gutterBottom>
            Enter OTP:
          </Typography>

          <Box display="flex" justifyContent="center">
            <OtpInput
              id="otpInput"
              label="OTP"
              variant="outlined"
              value={otp}
              onChange={setOTP}
              shouldAutoFocus
              inputType="tel"
              numInputs={6}
              inputStyle={{ width: '32px', height: '32px', fontSize: '16px' }}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </Box>

          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={verifyOTP}>
              Verify OTP
            </Button>
          </Box>

          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default QRCodeWithOTP;
