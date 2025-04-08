import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {actorsSlice} from "./slices/actors-slice.ts";

const RootStateReducer = combineReducers({
    actors: actorsSlice.reducer,
});

export const store = configureStore({reducer: RootStateReducer});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
