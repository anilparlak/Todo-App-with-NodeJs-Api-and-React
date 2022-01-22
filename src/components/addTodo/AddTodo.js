import React,{useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { api } from '../../api';
import ListTodo from '../listTodos/ListTodo';

import { deleteAll } from '../../store/todo'

const INITIAL_TODO = {
    title: "",
    description: ""
}
const AddTodo = () =>{

    const [todo,setTodo] = useState(INITIAL_TODO)
    const [submit,setSubmit] = useState(false);
    const { deleteAllStatus } = useSelector((state) => state.todo)
    
    const dispatch = useDispatch();

    const handleInput = (event) => {
        setTodo({...todo,[event.target.name]:event.target.value})
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(event.target.name === "submit"){
            api().post("/save",todo)
                .then((response => {
                    console.log(response)
                    setSubmit(!submit)
                })).catch((err)=>{
                    console.log(err)
                })
            setTodo(INITIAL_TODO)
        }
         
    }

    const handleDeleteEvent = () => {
        dispatch(deleteAll())
        const interval = setInterval(() => {
            setSubmit(!submit)
            clearInterval(interval)
        },500)
    }
   
    return(
        <>
            <form className="ui form">
                <div className="field">
                    <input type="text" name="title" placeholder="New Task" value={todo.title} onChange={handleInput}/>
                </div>
                <div className="field">
                    <input type="text" name="description" placeholder="Description (optional)" value={todo.description} onChange={handleInput}/>
                </div>
                <button className="ui primary button" type="button" name="submit" onClick={handleSubmit}>Submit</button>
                <button className="ui red button" type="button" name="deleteAll" onClick={() => handleDeleteEvent()}>Delete All</button>
            </form>
            <ListTodo submit={submit} />
        </>
    )
}

export default AddTodo;