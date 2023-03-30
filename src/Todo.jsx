import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaRegEdit, FaRegCheckCircle } from 'react-icons/fa';
import { db } from './Firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import './Todo.css';

const Todo = () => {
    const [todo, setTodo] = useState([])
    const [text, setText] = useState(null)
    const [updateButn, setUpdateButn] = useState(false)
    const [newUpdateId, setNewUpdateId] = useState(null)


// Form submitting  & Sending data to firebase  
    let handleSubmit = async () => {
        if (text !== '') {
            const Fbcollec = collection(db, 'todos')
            const newDoc = { text, completed: false }
            await addDoc(Fbcollec, newDoc)
        }
        // getSetDocuments();
        setText('')
    }

// fetching Data in Firebase
    useEffect(() => {
        getSetDocuments();
    });

// Getting all docs in firebase & Set todo State
    let getSetDocuments = async () => {
        const fbColl = collection(db, 'todos')
        const allDocs = await getDocs(fbColl)
        const docs = allDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTodo(docs)
    }

// Deleting the Text  
    let handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id))
        // getSetDocuments();
    }

// Marking the text
    let handleMark = async (id, completed) => {
        await updateDoc(doc(db, "todos", id), { completed: !completed })
        // getSetDocuments();
    }

// handle clicked on editing button get text to input box & change the form button Add --> Update
    let handleUpdate = (id,text) => {
        setNewUpdateId(id)
        setText(text)
        setUpdateButn(!updateButn)
    }

// Update a new Edited Todo
    let newUpdate = async () => {
        await updateDoc(doc(db, "todos", newUpdateId), { text: text })
        setText('')
        setUpdateButn(!updateButn)
        // getSetDocuments()
    }

//  Delete All ToDo List
    let deleteAll = async () => {
        const fbColl = collection(db, 'todos')
        const allDocs = await getDocs(fbColl)
        const docs = allDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        docs.forEach(async (docsId) => {
            await deleteDoc(doc(fbColl, docsId.id))
        })
        // getSetDocuments();
    }

    return (
        <div>
            <header>
                <h1>Todo App</h1>
            </header>
            <main>
                <div className="inputForm">
                    <input onChange={(e) => { setText(e.target.value) }} value={text} type="text" placeholder='Enter your Task...' />
                    {updateButn ? <button onClick={newUpdate}>Update</button> : <button onClick={handleSubmit} type='submit' className='add'>Add</button>}
                </div>
                <div className="todoListDiv">
                    {
                        todo.length>0?todo.map((todoVal, i) => (
                               <ul key={todoVal.id}>
                                    <li className={todoVal.completed ? 'marked' : 'unmarked'}>{todoVal.text}</li>
                                    <li>
                                        <FaRegEdit onClick={() => { handleUpdate(todoVal.id,todoVal.text) }} className={todoVal.completed ? 'unshow' : 'edit button'} />
                                        <FaRegCheckCircle onClick={() => { handleMark(todoVal.id, todoVal.completed) }} className='mark button' />
                                        <FaTrashAlt onClick={() => { handleDelete(todoVal.id) }} className='delete button' />
                                    </li>
                                </ul> 
                        )): <h1 className='noTask'>No Tasks...</h1>
                    }
                </div>
                <div className="deleteAllDiv">
                    <button onClick={deleteAll} className="deleteAll">Delete All</button>
                </div>
            </main> 
        </div>
    )
}
export default Todo;
