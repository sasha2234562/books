import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {setShowLoader} from "../slices/actors-slice.ts";

export const getUsers = createAsyncThunk(
    'getUsers/actorsSlice',
    async (_, {dispatch}) => {
        try {
            dispatch(setShowLoader(true));
            const response = await axios.get('/data/actors.json');
            dispatch(setShowLoader(false));

            return {status: response.status, data: response.data};

        } catch (err) {
            console.log(err)
        }
    },
);
