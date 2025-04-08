import {createSlice} from "@reduxjs/toolkit";
import {getUsers} from "../thunks/get-users.ts";

export interface Actor {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    age: number;
    address: {
        street: string;
        city: string;
    },
    company: {
        name: string;
        catchPhrase: string;
    },
    photo: string;
}

interface InitialState {
    actors: Actor[];
    selectedActor: Actor | null;
}

const initialState: InitialState = {
    actors: [],
    selectedActor: null,
}

export const actorsSlice = createSlice({
    name: 'actorsSlice',
    initialState,
    reducers: {
        setSelectActor: (state, action) => {
            state.selectedActor = action.payload;
        }
    },
    extraReducers: builder => [
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.actors = action.payload?.data
        })
    ]
})

export const {setSelectActor} = actorsSlice.actions;
