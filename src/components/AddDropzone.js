import React , {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Box from '@mui/material/Box';
import '../pages/Home.css'
import { useTab } from '@mui/base';
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
  } from "firebase/firestore";
export default function AddDropzone() {
  
return(
 
  <h1>Bookkeeper!</h1>

  );
}