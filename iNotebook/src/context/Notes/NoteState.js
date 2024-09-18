import React, { useState } from "react";

import NoteContext from "./NoteContext";


const NoteState=(props)=>{
  const host="http://localhost:5000"
 const notesInitial=[]
  const  [notes, setNotes] = useState(notesInitial);

// get notes
const getNotes= async()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
  });
  
  const json= await response.json(); 
  setNotes(json);
}

//   Add a Note
const addNote=async (title ,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag}), 
  });
  
  
    const note=await response.json();
  setNotes(notes.concat(note));
 

}

//   Delete a Note
const deleteNote=async (id)=>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
  });
  const json= response.json(); 
  console.log(json);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes); 
}
// Edit A Note
const editNote=async (id ,title ,description,tag)=>{
  const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag}), 
  });
  const json= response.json(); 
  console.log(json);
  for(let index=0; index<notes.length; index++){
    const element=notes[index];
    if(element._id===id){
      element.title=title;
      element.description=description;
      element.tag=tag;
    }
    break;
    setNotes(notes);
  }
}


 
  
   
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
    { props.children }

        </NoteContext.Provider>
    )

}


export default NoteState;