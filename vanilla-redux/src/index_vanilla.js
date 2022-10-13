import { legacy_createStore } from "redux";

// counter
const plus = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const Add = "Add";
const Minus = "Minus";

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case Add:
      return count + 1;
    case Minus:
      return count - 1;
    default:
      return count;
  }
};

const countStore = legacy_createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: Add });
};
const handleMinus = () => {
  countStore.dispatch({ type: Minus });
};

plus.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

//to do list
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { id: Date.now(), text: action.text };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter((toDos) => toDos.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};
const store = legacy_createStore(reducer);

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};
const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
