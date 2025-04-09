import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUsers} from "../thunks/get-users.ts";
import {getSingleUsers} from "../thunks/get-single-user.ts";

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
    showLoader: boolean;
    actors: Actor[];
    singleActor: Actor | null;
}

const initialState: InitialState = {
    showLoader: false,
    actors: [],
    singleActor: null,
}

export const actorsSlice = createSlice({
    name: 'actorsSlice',
    initialState,
    reducers: {
        setShowLoader: (state, action: PayloadAction<boolean>) => {
            state.showLoader = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.actors = action.payload?.data;
            state.showLoader = false;
        });
        builder.addCase(getSingleUsers.fulfilled, (state, action) => {
            state.singleActor = action.payload?.data;
            state.showLoader = false;
        });
    }
})

export const {setShowLoader} = actorsSlice.actions;
