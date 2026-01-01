---
title: "Master Redux Toolkit: From Basics to Building Simple React Todo App"
slug: "redux-toolkit-guide"
banner: "/projects/reduxjs.png"
author: "Aman Pandey"
authorImage: "/projects/myimg.jpg"
date: "April 13, 2025"
summary: "Redux Toolkit is the official, modern way to manage state in React apps. In this blog, you'll learn the core concepts of Redux Toolkit like slices, actions, and store setup in a simplified way. Then we’ll build a complete Todo app using Redux Toolkit step-by-step. Perfect for React devs looking to write cleaner, scalable code."
tags: ["React", "Redux Toolkit", "State Management", "Frontend"]
---

<img src="/projects/reduxjs.png" alt="Redux Toolkit" style="margin-bottom: 28px;" />

If you’ve worked with React before, there’s a good chance you’ve heard of Redux. It’s a powerful tool for managing state in large applications but let’s be honest, the setup can feel like a lot. That’s where Redux Toolkit comes in. It’s the official, recommended way to write Redux logic, and it makes everything cleaner, faster, and much easier to work with.

In this blog, we’ll first break down all the essential concepts behind Redux Toolkit in a beginner-friendly way. And once we’re ok and comfortable with the theory, we’ll build a simple but practical Todo App using Redux Toolkit step by step so stay tuned here.

## What is Redux Toolkit?

Redux Toolkit (RTK) is the official, opinionated toolset for efficient Redux development.

Prior to RTK, developers had to manually wire up Redux stores using a lot of boilerplate code. This included setting up reducers, actions, selectors, actions, and middleware just to get a basic store running. RTK handles these painful tasks by providing a set of utility functions that simplify the standard way you’d use Redux.

The Redux team knew that developers had problems with the complexity of Redux. So, they set out to create a soln that would streamline Redux workflow and make state management simpler for developers and React Toolkit was the result.

## Let's Understand Redux Flow with below Image

<img src="/projects/reduxflow.png" alt="Redux flow" style="margin-bottom: 28px;" />

The image above shows how Redux works behind the scenes when you interact with a UI (like clicking a button).

### Let’s break it down step by step:

- #### Button Click (UI Layer):
        It all starts when a user clicks a button in your app. This button lives inside the UI layer.

- #### Handler Function:
        The click triggers a handler function. This function decides what kind of action to send (like “add a todo”).

- #### Dispatching an Action:
        The handler dispatches an action to the Redux Store.”

- #### Redux Store:
        The store receives the action and passes it to a Reducer.

- #### Reducer:
        A reducer is a function that looks at the action and updates the store’s state. returns the new updated state.

- #### Update UI:
        Once the store’s state is updated, the UI layer re-renders with the new data — for example, showing the new todo item.

And that’s it! It’s a simple loop: User interaction → Action → Store → Reducer → Updated Store → UI updates

## Let's Build a Simple Todo App

A simple Todo App built with React and Redux Toolkit to demonstrate clean and scalable state management. Users can add and remove todos using Redux-powered actions and reducers.

#### 1. Install Redux Toolkit
    npm install reduxjs/toolkit react-redux

#### 2. Create a Redux Store

```javascript
// src/app/store.js

import {configureStore} from '@reduxjs/toolkit';

// Create an empty store(reducers will be added later)
export const store = configureStore({
    reducer: {}, // No reducers yet
})
```
- **configureStore:** Automatically sets up the Redux store with good defaults, such as middleware and development tools.
- **reducer:** An object that maps slice names (like "todo") to their corresponding reducers. This structure helps organize state and logic for different features. to connect to the store and interact with state easily.

#### 3. Creating the Todo Slice

A slice combines state, reducers, and actions for a specific feature. With our store ready, the next step is to define the logic behind adding and removing todos. Redux Toolkit makes this part super smooth through a concept called slices.

In our case, we’re creating a todo slice — here’s what that looks like:

```javascript
// src/features/todo/todoSlice.js

import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{ id: 1, text: "Hello world" }]
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        }
    }
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;

```

##### What’s Happening Here?

- **initialState:** We’re starting with a simple array of todos. Right now, there’s just one default todo to keep things from looking empty.

- **createSlice:** This is Redux Toolkit’s magic wand. It creates:

        The state
        The reducers (functions that change the state)
        The action creators (functions that fire off changes)

- **addTodo**
When we want to add a new todo, we use the nanoid() function to give it a unique ID. This keeps our list manageable when we start adding/removing items dynamically. The new todo is pushed into the state array.

- **removeTodo**
To remove a todo, we just filter the list and leave out the one that matches the given ID. Clean and efficient.

#### 4. Now Import the Slice into the Store

```javascript
// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: todoReducer // Now i have added the todo reducer here 
});
```
#### 5. Creating the Add Todo Component

Alright, now that our slice is ready, let’s start building the UI beginning with the part where the user adds a new todo.

```javascript
// src/components/AddTodo.jsx

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

function AddTodo() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()
    dispatch(addTodo(input))
    setInput('')
  }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo
```
##### What’s Going On Here?

- We use useState to track whatever the user types into the input box. useDispatch is a hook from react-redux. It lets us send actions to our Redux store.

- When the form is submitted, we call dispatch(addTodo(input)) — this triggers the reducer we created earlier.

- After dispatching, we clear the input field with setInput('').

#### 6. Displaying Todos and Adding Delete Functionality

Now that users can add todos, we need to show them on the screen — and of course, give them a way to remove them too.

Here’s how we’re handling that in the Todos component:

```javascript
// src/components/Todos.jsx

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
          >
            <div className="text-white">{todo.text}</div>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21..."
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
```
##### What’s Going On Here?

- We use useSelector to grab the current list of todos from our Redux store. For each todo, we render a styled list item with:

        The todo text
        A delete button that dispatches the removeTodo action with that todo’s ID

#### 7. Final Step -  Provide the Store to React

```javascript
// main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```
**Provider:** A higher-order component that makes the Redux store available to all components in the app.

And that’s a wrap! Hope this guide helped you understand Redux Toolkit a little better — and if you followed along, you now have a fully functional Todo app to show for it.