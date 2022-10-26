import React , {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Box from '@mui/material/Box';
import './Home.css';
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
export default function Home() {
  const location = useLocation();
  const [name,setName] = useState("");
  const [comment,setComment]=useState("");
  const [image,setImage]=useState("");

  const [subject,setSubjects] = useState([]);
  const subjectCollectionRef =  collection(db,"subject")
  const getSubjects= async () =>{
    const q = query(subjectCollectionRef);
    const data = await getDocs(q);
    console.log(data,"44");
    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  const deleteAll = async (id) => {
    const userDoc = doc(db, "subject", id);
    const a = await deleteDoc(userDoc);
    getSubjects();
  };

  function FLogout() {
    reactLocalStorage.remove('Xuser');
    window.location.href = "/login"
  }

  function confirm(id) {
    console.log("456",id)
    const confirm = window.confirm("ยืนยันที่จะลบไหม?");
    /**/if (confirm) {
      console.log("OK")
      deleteAll(id);
    }
    else {
      console.log("Cancle")
    }
  }
  useEffect (()=>{
    getSubjects();
  },[]);
  return (
    <Box sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
        width: "1025px",
        height: "auto",
        marginTop:'10px',
        margin:'auto'
      },
    }}>
      <Paper  variant="outlined">
        <h3 className='h2title'>Course overview</h3>
   {subject.map((e)=> ( 
    <Box component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)',}} key={e.id}>
       
    <Card sx={{ width: "250px",p:'10px' }}>
   <CardMedia
        component="img"
        height="150"
      
        image={e.link}
        alt="green iguana"
      />
       <CardContent  sx={{border:'solid 1px Gainsboro', borderBottom: 0}}>
       


        <Typography gutterBottom variant="h6" component="div">
       {e.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {e.comment}
        </Typography>
      </CardContent>
      <CardActions sx={{  bgcolor: '#F5F5F5',border:'solid 1px 	Gainsboro',}}>
        <Link to="/show" state={{sname:e}}>
        <Button size="small">view</Button>
        </Link>
       <Link to="/addsubject" state={{sname:e}}>
        <Button size="small">edit</Button>
        </Link>
  
        <Button variant="outlined" color="error" size="small"   /**/onClick={() => {
                      confirm(e.id);
                    }}>delete</Button>
  
      </CardActions> 
    
    </Card>  
    </Box>))}
    </Paper>
   </Box>
  );
}