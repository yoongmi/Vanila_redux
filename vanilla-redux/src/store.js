import { legacy_createStore, combineReducers } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};
const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      const newToDoObj = { id: Date.now(), text: action.text };
      return [newToDoObj, ...state];
    case DELETE:
      const cleaned = state.filter((toDos) => toDos.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

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
