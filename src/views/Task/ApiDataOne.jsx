import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import ReactPaginate from "react-paginate";
import './paginate-style.css'
import DeleteModal from "./DeleteModal";
import { fetchDataStart, fetchDataSuccess } from "./redux/ApiSlice";
const ApiDataOne = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  
  const [title, setTitle] = useState("")
  const dispatch = useDispatch();
  const getApiData = useSelector((state) => state.api);
  console.log("from api1", getApiData);

  useEffect(() => {
    dispatch(fetchDataStart());
  }, [dispatch, currentPage]);

  const itemsPerPage = 10; // Set the number of items per page
  const totalData = getApiData.data || [];
  const pageCount = Math.ceil(totalData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

const openModal = (id,title) => {
    console.log(id);
    setDeleteId(id);
    setTitle(title)
    setModalDelete(true);
}


  const handleCloseModal = ()=>{
    setDeleteId("");
    setModalDelete(false);
  }

  const handleDeleteItem = (delId) => {
    console.log(delId, totalData);
    const filterData = totalData.filter(data => data.id !== delId);
    dispatch(fetchDataSuccess(filterData));
    handleCloseModal();
  }
  

  return (
    <>
    {/* -------------------------without pagination all data ------------------------ */}

      {/* {getApiData.api.data && getApiData.api.data.length > 0 ? (
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
      )} */}
    {/* -----------------------without pagination all data ------------------------ */}

      {totalData.length > 0 ? (
        <div>
          <MDBTable>
            <MDBTableHead>
            <tr className="table-info">
                <th scope="col">ID</th>
                <th scope="col">UserId</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
              </tr>    
            </MDBTableHead>
            <MDBTableBody>
              {totalData
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.userId}</td>
                    <td>{item.title}</td>
                    <td> <button onClick={() => openModal(item.id,item.title)} className="btn btn-danger mx-1">
                                <i className="fa-solid fa-trash"></i>
                        </button></td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>

                    {modalDelete && (
                            <DeleteModal
                                name={"delectus aut autem"}
                                title={title}
                                id={deleteId}
                                onClose={() => handleCloseModal()}
                                onDelete={(delId) => handleDeleteItem(delId)}   
                            />
                    )}
         

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            disabledClassName={'disabled'}
          />
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};

export default ApiDataOne;
