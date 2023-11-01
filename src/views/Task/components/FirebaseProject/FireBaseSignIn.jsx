import React, { useEffect, useState } from "react";
import { auth, provider,providerFb } from "./Configuration";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FirebaseHome from "./FirebaseHome";


const FireBaseSignIn = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    displayName: "",
    firstName: "",
    lastName: "",
    providerId: "",
    photoURL: "",
  });


  const handleClickWithFb = () => {
    signInWithPopup(auth, providerFb)
      .then((data) => {
        console.log('fbdata==>', data);
        setValue({
          email: data.user.email,
          photoURL: data.user.photoURL,
          displayName: data.user.displayName,
          firstName: data._tokenResponse.firstName,
          lastName: data._tokenResponse.lastName,
          providerId: data._tokenResponse.providerId,
        });
  
        const userData = {
          email: data.user.email,
          photoURL: data.user.photoURL,
          displayName: data.user.displayName,
          firstName: data._tokenResponse.firstName,
          lastName: data._tokenResponse.lastName,
          providerId: data._tokenResponse.providerId,
          // Add more data here if needed
        };
  
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/firebaseHome");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      // navigate('/firebaseHome')

      console.log("sign data token", data._tokenResponse);
      console.log("sign data user", data.user);

      setValue({
        email: data.user.email,
        photoURL: data.user.photoURL,
        displayName: data.user.displayName,
        firstName: data._tokenResponse.firstName,
        lastName: data._tokenResponse.lastName,
        providerId: data._tokenResponse.providerId,
      });

      const userData = {
        email: data.user.email,
        photoURL: data.user.photoURL,
        displayName: data.user.displayName,
        firstName: data._tokenResponse.firstName,
        lastName: data._tokenResponse.lastName,
        providerId: data._tokenResponse.providerId,
        // Add more data here if needed
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/firebaseHome");
    });
  };

  useEffect(() => {
    setValue(
      localStorage.getItem(
        "email",
        "displayName",
        "firstName",
        "lastName",
        "providerId",
        "photoURL"
      )
    );
  }, []);


  

  return (
    <div>
      <div className="row justify-content-center w-100 m-auto p-2">
        {value ? (
          <FirebaseHome />
        ) : (
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="col-md-6">
              <button
                onClick={handleClick}
                className="btn btn-primary btn-block w-50 m-auto"
              >
                Sign in with Google
              </button>
            </div>
            <div className="col-md-6">
              <button
                onClick={handleClickWithFb}
                className="btn btn-info btn-block w-50 m-auto"
              >
                Sign in with Facebook
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FireBaseSignIn;
