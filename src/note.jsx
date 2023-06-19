import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateDoc, doc, getDoc,db } from './firebase';
import{ useAuth } from "./AuthContext";

async function fetchData(userEmail, notexd) {
  try {
    const title = [];
    const note = [];

    const docref = doc(db, 'users', userEmail);
    const docSnap = await getDoc(docref);
    const titlearr = docSnap.data().Title;
    const notearr = docSnap.data().Note;

    const newNotes = titlearr.map((title, index) => ({
      title,
      content: notearr[index],
    }));

    titlearr.map((item) => { 
      title.push(item);
    });
    notearr.map((item) => {
      note.push(item);
    });
  
    title.splice(notexd, 1);
    note.splice(notexd, 1);
  
    await updateDoc(docref, {
      'Note': note,
      'Title': title,
    });

    console.log('Array modified in Firestore successfully!');
  } catch (error) {
    console.error('Error modifying array in Firestore:', error);
  }
}

function Note(props) {
  const { user } = useAuth();
  const userEmail = user.email;

  async function handleClick() {
    console.log(props.id);
    await fetchData(userEmail, props.id);
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
