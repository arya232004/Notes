import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Demo from "./demo";
import Createarea from "./CreateArea";
import Note from "./note";
import { useState } from "react";
import Login from "./login";
import { AuthProvider } from "./AuthContext";
import Loading from "./loading";

function App()
{
    // const [notes, setNotes] = useState([]);

    // function addNote(newNote) {
    //   setNotes(prevNotes => {
    //     return [...prevNotes, newNote];
    //   });
    // }
  
    // function deleteNote(id) {
    //   setNotes(prevNotes => {
    //     return prevNotes.filter((noteItem, index) => {
    //       return index !== id;
    //     });
    //   });
    // }

    return (
        <div>
          {/* <Loading  /> */}
          <Router>
             <AuthProvider>  
              <Routes>
                <Route path="/notes" Component={Demo}/>
                <Route path="/" Component={Login}/>
              </Routes>
              </AuthProvider>
          </Router>
          {/* <Login/> */}
        {/* <Demo />
        <div className="Gridhelp">
       <Createarea  onAdd={addNote}/>  
       {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
       </div> */}
       </div>
    );
}

export default App;