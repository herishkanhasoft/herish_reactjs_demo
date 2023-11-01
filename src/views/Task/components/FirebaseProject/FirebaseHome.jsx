import React from "react";
import { useNavigate } from "react-router-dom";

const FirebaseHome = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/firebase");
  };
  const storedUserData = localStorage.getItem("userData");

  // Parse the data back to an object
  const userData = JSON.parse(storedUserData);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Home</h1>
        <div className="row justify-content-center w-25 m-auto p-3">
          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-center">User Data</h2>

          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-center w-25 p-4 border rounded">
              {userData && (
                <>
                  <div className="m-auto">
                    <img src={userData.photoURL} alt="" />
                  </div>
                  <div className="my-3">
                    <div className="font-weight-bold"><b>Email:</b></div>
                    <div>{userData.email}</div>
                  </div>
                  <div className="my-3">
                    <div className="font-weight-700"><b>Display Name:</b></div>
                    <div>{userData.displayName}</div>
                  </div>
                  <div className="my-3">
                    <div className="font-weight-bold"><b>First Name:</b></div>
                    <div>{userData.firstName}</div>
                  </div>
                  <div className="my-3">
                    <div className="font-weight-bold"><b>Last Name:</b></div>
                    <div>{userData.lastName}</div>
                  </div>
                  <div className="my-3">
                    <div className="font-weight-bold"><b>Provider ID:</b></div>
                    <div>{userData.providerId}</div>
                  </div>
                  {/* Add more divs for additional data if needed */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirebaseHome;
