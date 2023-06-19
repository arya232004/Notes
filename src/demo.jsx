import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRef, useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import Loading from './loading';

import {getAuth} from 'firebase/auth';
import Note from "./note";
import Createarea from "./CreateArea";
import { collectionRef,getDoc,doc,db,auth,signOut} from './firebase';
import { useAuth } from "./AuthContext";

function Demo() {
  
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const title=[];
  const note=[];

  const history = useNavigate();
  
  const [username, setUsername] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(user);

// try {
//   const fetchData = async () => {
//     try {
//       const docSnap = await getDoc(docref);
//       const titlearr=docSnap.data().Title;
//       titlearr.map((item)=>{
//         // console.log(item);
//         title.push(item);
//       })
//       const notearr=docSnap.data().Note;
//       notearr.map((item)=>{
//         // console.log(item);
//         note.push(item);
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchData();
// } catch (error) {
//   console.log(error);
// }
const { user } = useAuth();
console.log(user);




useEffect(() => {
  
  const fetchData = async () => {
    try {
      const docref = doc(db, 'users', user.email);
      const docSnap = await getDoc(docref);
      const titlearr = docSnap.data().Title;
      const notearr = docSnap.data().Note;

      const newNotes = titlearr.map((title, index) => ({
        title,
        content: notearr[index],
      }));
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData().then(() => {
    setLoading(false);
  }
  );
}, []);


  const handleLogout = async () => {
    const auth=getAuth();
    // const navigate=useNavigate();
    signOut(auth).then(() => {
      window.location.replace('/');
      // history.push('/');
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    // await help().signOut();
    // await signOut(auth);
    // history.push('/');
  };
  if(!user || loading){
    return <Loading/>;
  }
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //  console.log(title.length);
  //  console.log(note.length);
  //  console.log(title);
   if(title.length > 0  && note.length > 0)
    {
      console.log("hello");
      for(var i=0;i<title.length;i++)
      {
        console.log(title[i]);
        setNotes(prevNotes => {
          return [...prevNotes, {title:title[i],content:note[i]}];
        }
        );
      }
    }

    function addNote(newNote) {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    }
  
    function deleteNote(id) {
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }
    // console.log(title);
    // console.log(note);
    // console.log(notes);
  return (
    <div>  
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          // label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* <AccountCircle 
                src={user.photoURL}
                /> */}
                <Avatar alt="Name" src={user.photoURL} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
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
       </div>
    </div>
    
  );
}

export default Demo;
