import { legacy_createStore, combineReducers } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

console.log(addToDo(), deleteToDo());

const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    // state를 mutate해줌. 리턴x
    state.push({ id: Date.now(), text: action.payload });
  },
  [deleteToDo]: (state, action) =>
    // state를 리턴. mutate X
    state.filter((toDos) => toDos.id !== action.payload),
});

/*
const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      const newToDoObj = { id: Date.now(), text: action.payload };
      return [newToDoObj, ...state];
    case deleteToDo.type:
      const cleaned = state.filter((toDos) => toDos.id !== action.payload);
      return cleaned;
    default:
      return state;
  }
};
*/
const rootReducer = combineReducers({ reducer });

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = legacy_createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
