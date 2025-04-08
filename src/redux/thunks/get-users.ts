import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
    'getUsers/actorsSlice',
    async () => {
        try {
            const response = await axios.get('/data/actors.json');
            return {status: response.status, data: response.data}
        } catch (err) {
            console.log(err)
        }
    },
);
