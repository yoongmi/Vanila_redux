import { legacy_createStore, combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ id: Date.now(), text: action.payload });
    },
    remove: (state, action) =>
      state.filter((toDos) => toDos.id !== action.payload),
  },
});

const rootReducer = combineReducers({ reducer: toDos.reducer });

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = legacy_createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export const { add, remove } = toDos.actions;

export default store;
