import axios from "axios";
import { fetchDataStart, fetchDataSuccess } from "./ApiSlice";


export const fetchData = () => async (dispatch) => {
    try {
        dispatch(fetchDataStart()); // Indicate that data fetching has started
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        dispatch(fetchDataSuccess(response.data)); // Store data in Redux
        console.log('Data from action:', response.data);
      }
    catch(error){
        console.log(error);
    }
}