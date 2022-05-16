import type { NextPage } from 'next'
import Head from 'next/head'
import {TodoList} from '../components/todo-list'
import {TodoCreate} from '../components/todo-create'
import isEmpty from 'lodash/isEmpty';
import { ResponseTodoDto } from './api/api-types';
import { useState } from 'react'

const Home: NextPage<ResponseTodoDto[],{}> = (todos: ResponseTodoDto[], error) => {
  if (!isEmpty(error)) {
    return <div>An error occured: {error.message}</div>;
  }

  const [todoCreated, setTodoCreated] = useState(false);

  const handleCreate = () => {
    todoCreated? setTodoCreated(false): setTodoCreated(true);
  }



  return (
    <div className="container">
      <Head>
        <title>Basic To-Do List</title>
        <meta name="description" content="a next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <h1>To-Do List</h1>

      <div>
        <TodoCreate onCreate={handleCreate} />
      </div>

      <div>
        <TodoList todoCreated={todoCreated}/>
      </div>

    </div>
  );
}

export default Home
