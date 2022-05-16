import type { NextPage } from 'next'
import Head from 'next/head'
import {TodoList} from '../components/todo-list'
import TodoElement from '../components/todo-element'
import {TodoCreate} from '../components/todo-create'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { TodosApi } from './api/todos-api';
import { ResponseTodoDto } from './api/api-types';
import { useState } from 'react'

const Home: NextPage<ResponseTodoDto[],{}> = (todos: ResponseTodoDto[], error) => {
  if (!isEmpty(error)) {
    // console.log('error: ', error);
    return <div>An error occured: {error.message}</div>;
  }

  const [todosArr, setTodosArr] = useState(Object.keys(todos).map((key: any) => { return todos[key]; }));
  // const [todosArr, setTodosArr] = useState();
  
  const handleGetTodos = async () => {
    // console.log('update todos after change in create or todolist edit');
    // e.preventDefault();
    try {
      todos = await TodosApi.getTodoList();
      setTodosArr(Object.keys(todos).map((key: any) => { return todos[key]; }))
    } catch (error) {
      return { error };
    }
  };


  return (
    <div className="container">
      <Head>
        <title>Basic To-Do List</title>
        <meta name="description" content="a next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <h1>To-Do List</h1>
      {/* <div>
        <button type="button" className="btn btn-primary" onClick={handleGetTodos}>update todo list</button>
      </div> */}

      <div>
        <TodoCreate onCreate={handleGetTodos} />
      </div>

      <div>
        <TodoList todos={todosArr} onChange={handleGetTodos}/>
      </div>

    </div>
  );
}

Home.getInitialProps = async ctx => {
  try {
    const todosList = await TodosApi.getTodoList();
    console.log('todosList[0]: ', todosList[0]);
    return todosList;

  } catch (error) {
    return { error };
  }
}
export default Home
