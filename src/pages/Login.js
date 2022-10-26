import React, { useEffect, useState } from "react";
//import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
//import { pathToFileURL } from 'url';
//import React, { FC, useState, useEffect}  from 'react';
import './Login.css';
import { Link as RouterLink } from 'react-router-dom';
//import Home from './Home';
//import Home from './pages/Home';
//const [path, setPath] = React.useState("");
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { Button } from '@mui/material';
import { reactLocalStorage } from 'reactjs-localstorage';



import {
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  Checkbox,
  FormControlLabel,
  Box 
  } from "@mui/material";

export default function Login() {

  const [USER, setUsers] = useState([]);
  const [seeUser, SeeUser] = useState([]);
  const [seePassword, SeePassword] = useState([]);
  const usersCollectionRef = collection(db, "addTeach");

  const getUsers = async () => {
    console.log(seeUser, seePassword)
    console.log(q)
    const data = await getDocs(q);
    console.log(data)
    if (data.docs.length < 1) {
      alert("Username or Password not found")

    }
    else {
      reactLocalStorage.setObject('Xuser', data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      window.location.href = "/home"
    }

  };


  function rubTextbox1(e) {
    SeeUser(e.target.value)
  }
  function rubTextbox2(e) {
    SeePassword(e.target.value)
  }
  

  const shoot = () => {
   getUsers()
  }
  const q = query(collection(db, "user"), where("user", "==", seeUser), where("password", "==", seePassword));
  return ( <div className="lContainer">
  <div  className="form" style={{ padding: 40 }} >
   <div className="title">
         Login
        </div>
      <Grid
        container
        spacing={3}
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
      >
        <Grid item xs={12}>
          <TextField sx={{ m: 1, width: '30ch' }} label="Username" onChange={rubTextbox1} ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField sx={{ m: 1, width: '30ch' }} label="Password" onChange={rubTextbox2} ></TextField>
        </Grid>
      
        <Grid item xs={12}>
          <Button  variant="contained" onClick={() => {
              shoot()
            }} color= 'primary'> Login </Button>
        </Grid>
      </Grid>
 
      
  </div>
  </div>
  );
}