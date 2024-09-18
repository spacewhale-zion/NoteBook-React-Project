import React ,{useContext,useState, useEffect,useRef} from 'react';
import NoteContext from  "../context/Notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const navigate=useNavigate();
    const context=useContext(NoteContext);
    const {notes,getNotes,editNote}=context;
    useEffect(() => {
      if(localStorage.getItem("token")){
        console.log(localStorage.getItem("token"))
      getNotes();
      }
      else{
      
        navigate('/login');
        props.showAlert("Login first","danger");
      }
    },[]);
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  
    const ref=useRef(null);
    const refClose=useRef(null);

    const updateNote=(currentNote)=>{

      ref.current.click()
      setNote({
        id: currentNote._id,
        etitle: currentNote.title,
        edescription: currentNote.description,
        etag: currentNote.tag

      });
      console.log(currentNote.title);

    }
    const handleClick=(e) => {
      if(note.etitle.length<5 ||note.edescription.length<5 ||note.etag.length<5){
        e.preventDefault();
      }
      else{
        refClose.current.click()
        editNote(note.id,note.etitle,note.edescription,note.etag);
        e.preventDefault();
        props.showAlert("Note Updated Successfully","success")
      }
      
  };
const onChange=(e) => {
setNote({...note,[e.target.name]: e.target.value});
}
  
  return (
<>
<AddNote showAlert={props.showAlert}/>
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={note.etitle}
              className="form-control"
              id="etitle"
              name='etitle'
              onChange={onChange}
              minLength={5}required
            />
      
          </div>
          <div className="mb-3">
            <label htmlFor="eDescription" className="form-label">
              description
            </label>
            <input
              type="text"
              value={note.edescription}
              className="form-control"
              id="edescription"
              name='edescription'
              onChange={onChange}
              minLength={5}required

            />
         
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              value={note.etag}
              className="form-control"
              id="etag"
              name='etag'
              onChange={onChange}
              minLength={3}required

            />
         
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className=' row my-3'>
        <h2>Your Notes</h2>
        {/* Showing Notes As Card */}
        <div className="container">
        {notes.length==0 && "No Notes to Display"}
        </div>
{ notes && notes.map((note)=>{
  return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
}) }


    </div>
    </>
  )
}

export default Notes