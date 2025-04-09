import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Actor, setShowLoader} from "../slices/actors-slice.ts";

// for example, how to get a separate object with actor data
export const getSingleUsers = createAsyncThunk(
    'getSingleUsers/actorsSlice',
    async (id: number, {dispatch}) => {
        try {
            dispatch(setShowLoader(true));
            const response = await axios.get('/data/actors.json');
            dispatch(setShowLoader(false));
            const singleActor = response.data.find((item: Actor) => item.id === id);
            return {status: response.status, data: singleActor};
        } catch (err) {
            console.log(err)
        }
    },
);
