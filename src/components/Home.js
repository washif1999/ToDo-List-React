import React, { useEffect, useState } from 'react';
import "../App.css";

import 'bootstrap/dist/css/bootstrap.css';

import CreateTask from '../Modals/CreateTask';
import Button from 'react-bootstrap/Button';

import Cards from './Cards';


function Home() {


    let [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    }

    // Default Load 
    useEffect(() => {
        const json = localStorage.getItem("todos");
        const savedtodos = JSON.parse(json);
        if (savedtodos) {
            setTodos(savedtodos.sort(function(a,b){
                return new Date(a.endtime) - new Date(b.endtime)
              }));
        }
    }, []);

    // To Save To-do
    const saveTask = (taskObj) => {
        taskObj["id"] = todos.length + 1;
        todos.push(taskObj);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        let setdata = JSON.parse(localStorage.getItem("todos"));
        setTodos(setdata.sort(function(a,b){
            return new Date(a.endtime) - new Date(b.endtime)
          }));
    }

    const deleteTask = (id) => {
        todos.splice(todos.findIndex(a => a.id === id), 1)
        window.localStorage.setItem("todos", JSON.stringify(todos));
        let setdata = JSON.parse(localStorage.getItem("todos"));
        setTodos(setdata.sort(function(a,b){
            return new Date(a.endtime) - new Date(b.endtime)
          }));
    }


    const updateTask = (taskobj) => {
        todos.map((value) => {
            if (value.id === taskobj.id) {
                value.task_name = taskobj.task_name;
                value.task_description = taskobj.task_description;
                value.status = taskobj.status;
                value.priority = taskobj.priority;
                value.endtime = taskobj.endtime;
            }
        });
        console.log(todos);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        let setdata = JSON.parse(localStorage.getItem("todos"));
        setTodos(setdata.sort(function(a,b){
            return new Date(a.endtime) - new Date(b.endtime)
          }));
    }

    return (
       
        <>
            <div className="header text-center">
                <h1>To Do List</h1>
                <Button variant="primary" size="sm" onClick={() => { setShow(true) }}>+ Add Task</Button>
            </div>
            <div className="task-container">
            
                {todos && todos.map((todo, index) => <Cards todoObj={todo} index={index} deleteTask={deleteTask} updateTask={updateTask} />)}
            </div>
            <CreateTask toggle={toggle} show={show} save={saveTask} />
        </>
    )
}

export default Home;