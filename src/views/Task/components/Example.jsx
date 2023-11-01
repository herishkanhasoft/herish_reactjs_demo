import React, { useEffect } from 'react';
import { useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

const Example = () => {
  //const { data, loading } = useSelector((state) => state.api);
  const getApiData = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second delay before showing the data
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, []);

  return (
    <>
      {loading ? ( // Display a loader if loading is true
        <div>loading...</div>
      ) : // Display the data when loading is false
      getApiData.api.data && getApiData.api.data.length > 0 ? (
        <div>
          <h2>API Data</h2>
          <MDBTable>
            <MDBTableHead>
              <tr className="table-info">
                <th scope="col">ID</th>
                <th scope="col">UserId</th>
                <th scope="col">Title</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {getApiData.api.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.userId}</td>
                  <td>{item.title}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};

export default Example;
