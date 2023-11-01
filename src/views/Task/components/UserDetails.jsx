import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Grid, InputAdornment, Pagination, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import 'views/Task/paginate-style.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export default function CustomizedTables() {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const navigate = useNavigate();
console.log(searchQuery);
  useEffect(() => {
    const itemsPerPage = 10;
    async function fetchData() {
      const response = await axios.post(
        `${process.env.REACT_APP_COMMON_API}/User2List?sort=${sortDirection}&column=last_name&search=&page=${page}&limit=${itemsPerPage}`
      );
      setUserData(response.data.data.data);
    }
    fetchData();
  }, [sortDirection, page]);

  const handleAdd = () => {
    navigate('/userdetailscreate');
  };

  const handleDelete = async (user) => {
    const response = await axios.post(`${process.env.REACT_APP_COMMON_API}/DeleteUser`, { _id: user._id });
    console.log('deleted by _id----', response);
    const updatedUserData = userData.filter((u) => u._id !== user._id);
    setUserData(updatedUserData);
  };

  const handleEdit = (user) => {

    navigate('/userdetailsedit', {
      state: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        img: user.image
      }
    });
  };

  const handleSearch = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      // Filter the data based on the search query
      const filteredData = userData.filter(
        (item) =>
          item.first_name.toLowerCase().includes(query) ||
          item.last_name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
      );

      // Set the filtered data or empty array if there are no matches
      setUserData(filteredData);
    } else {
      // Clear the search query
      setSearchQuery('');

      // Fetch the initial data from the API
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_COMMON_API}/User2List?sort=asc&column=email&search=&page=1&limit=10`
        );
        setUserData(response.data.data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
  };

  const toggleSortDirection = () => {
    // Toggle between 'asc' and 'desc' when clicking a button or a UI element.
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
  };

  return (
    <Container maxWidth="md" align="center">
      <h1>User List</h1>
      <Grid container alignItems="center">
      <Grid item xs={6} display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleAdd}>
          Add User
        </Button>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="center">
        <TextField
          label="Search..."
          variant="outlined"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
      </Grid>
    </Grid>
      <Button onClick={toggleSortDirection}>{sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align='center'>
                  <img
                    style={{ borderRadius: '50%' }}
                    src={`${process.env.REACT_APP_COMMON_API}/uploads/${row.image}`}
                    alt="Profile Avatar"
                    width="100px"
                    height="100px"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.first_name}</StyledTableCell>
                <StyledTableCell align="center">{row.last_name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                  <Button style={{ backgroundColor: 'red', color: 'white' }} variant="contained" onClick={() => handleDelete(row)}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>{page}</Typography>
      <Pagination
        style={{
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
          bottom: '10px',
          left: '50%',
          right: '50%'
        }}
        defaultPage={page}
        count={page+1}
        variant="outlined"
        color="error"
        onChange={(event, value) => setPage(value)}
      />
    </Container>
  );
}
