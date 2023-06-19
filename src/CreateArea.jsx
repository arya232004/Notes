import { create } from '@mui/material/styles/createTransitions';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { Margin } from '@mui/icons-material';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import AddIcon from "@mui/icons-material/Add";
import { collectionRef,getDoc,db,arrayUnion,updateDoc,doc } from './firebase';
import { useAuth } from "./AuthContext";

function Createarea(props)
{
  const [isExpanded, setExpanded] = useState(false);
  const { user } = useAuth();

  const [note, setNote] = useState({
    title: "",
    content: ""
  });


  function expand() {
    setExpanded(true);
  }

    const modifyArrayInFirestore = async (note) => {
     
      const docref = doc(db, 'users', user.email);
      try {
        // const firestore = firebase.firestore();
        // const docRef = firestore.collection('users').doc('arya232004@gmail.com');
  
        // Update the "your-array-field" field in the document
        await updateDoc(docref,{
          // 'Note': firebase.firestore.FieldValue.arrayUnion(note.title),
          // 'Title': firebase.firestore.FieldValue.arrayUnion(note.content),
          'Note': arrayUnion(note.title),
          'Title': arrayUnion(note.content),
          // or use arrayRemove to remove an element from the array
          // yourArrayField: firebase.firestore.FieldValue.arrayRemove('element to remove'),
        });
  
        console.log('Array modified in Firestore successfully!');
      } catch (error) {
        console.error('Error modifying array in Firestore:', error);
      }
    };


  function submitNote(event) {
    // event.preventDefault();
    if(note.title!="" && note.content!="")
    {
    console.log(note);
    modifyArrayInFirestore(note);
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
  }


  function handleChange(event) {
    const { name, value } = event.target;
    console.log(value);
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
  

    return (
      <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
    );
    
}
export default  Createarea;