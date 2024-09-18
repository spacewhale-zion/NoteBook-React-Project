import React ,{useContext, useState} from 'react';
import NoteContext from  "../context/Notes/NoteContext"


function AddNote(props) {
    const context=useContext(NoteContext);
    const {addNote}=context;

    const [note,setNote] = useState({title:"",description:"", tag:"defalult"})

    const handleClick=(e) => {
      if(note.title.length<5 ||note.description.length<5 ||note.tag.length<5){
        e.preventDefault();
        props.showAlert("Minimum required Length of Field is 5 Characters ","danger")
        
      }
      else{
        addNote(note.title,note.description,note.tag);
  e.preventDefault();
  setNote({title:"",description:"", tag:"defalult"});
  props.showAlert("Note Added Successfully","success")
  
      }

    };
  const onChange=(e) => {

  setNote({...note,[e.target.name]: e.target.value});
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title'
              value={note.title}
              onChange={onChange}
              
            />
      
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name='description'
              value={note.description}

              onChange={onChange}
            />
         
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              value={note.tag}

              onChange={onChange}
            />
         
          </div>
          
          
          
        
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
      <div/>
    </div>
  );
}

export default AddNote;
