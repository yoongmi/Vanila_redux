import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Detail({ toDos }) {
  const myid = useParams().id;
  const todo = toDos.reducer.find((toDo) => toDo.id === parseInt(myid));
  console.log(todo);
  return (
    <>
      <h1>{todo?.text}</h1>
      <h5>Created at : {todo?.id}</h5>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state };
}

export default connect(mapStateToProps)(Detail);
