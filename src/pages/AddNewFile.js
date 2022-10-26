import React, { Fragment,useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
//import Button from "@mui/material/Button";
import { styled } from '@mui/system'
import {useDropzone} from 'react-dropzone';
import { db } from "../firebase-config";
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import './AddFile.css' ;
import Paper from '@mui/material/Paper'
import FormControl from "@mui/material/FormControl";
import { reactLocalStorage } from "reactjs-localstorage";
import Select from "@mui/material/Select";
import {BrowserRouter as Router, Link} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {
  Button,
  Icon,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
//import "./AddSubject.css";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
function AddNewFile() {
  const [name, setName] = useState("");
 
  const [link, setLink] = useState("");
  const [commentvideo, setCommenvideo] = useState("");
  const location = useLocation();
  const [idtop, setIDtop] = useState(location.state?.aname);
  const [stat,Setstat] = useState(location.state?.sname);
  const [topic, setTopic] = useState(location.state?.sname?.topic);
  const [nameidd,setNameIDD]= useState(location.state?.sname);
  //const {namesub} = props ;
 console.log(idtop,"gg");
/*  
  const [link,  setLink] = useState("");
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
*/
const nameuser = reactLocalStorage.getObject("Xuser")[0]?.user;
const role = reactLocalStorage.getObject("Xuser")[0]?.role;
const getCommentvideo =(e)=> {
  setCommenvideo(e.target.value);
}
const getIDtop= (e) => {

  setIDtop( e.target.value );
};
const getName= (e) => {

  setNameIDD( e.target.value );
};

const getTopic = (e) => {
  setTopic(e.target.value);
};
const getLink = (e) => {
  let storyWords = e.target.value ;
  let unnecessaryWords = storyWords.split('https://www.youtube.com/watch?v=');
  let joined = unnecessaryWords.join('https://www.youtube.com/embed/');
  setLink (joined);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  await addDoc(collection(db, "addfile"), {
   topic: topic,
    link: link,
    name: nameidd,
    idtop:idtop,
    commentvideo:commentvideo,
  })
    .then((res) => {
      console.log("User ed");
       alert("กรอกข้อมูลสำเร็จ");
      setTopic("");
      setLink("");
      setName("");
      setIDtop("");
      setCommenvideo("");
      window.location.reload()
    })
    .catch((err) => {
      console.log(err);
    });
}/* 
const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
   
}))*/
//let storyWords = 'https://www.youtube.com/watch?v=PUF154qdM_Eely' ;
//let unnecessaryWords = storyWords.split('https://www.youtube.com/watch?v=');
//let joined = unnecessaryWords.join('https://www.youtube.com/embed/');

//console.log(joined,'5555') ;// ['hi' 'bye' 'okay]
    return (     
   
    
           <Box sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
   
        marginTop:'10px',
        margin:'auto',
        flexDirection:'column ',alignItems:'center'
      },
    }}>
             <Paper >
             <h2 > &nbsp;  ADD</h2>
       <br />
       <div className='textFieldbox'>
            <TextField 
            disabled
            label="รหัสหัวข้อ"
             id="idtop" 
            value={idtop} 
            onChange={getIDtop}  className='textFileFont'/>{" "}
        
        <br />   <br />
          
             <TextField
         
              label="หัวข้อ"
            id="topic"
            value={topic}
            onChange={getTopic}
            className='textFileFont'
          />{" "}
       
          <br /><br />
         
          <TextField
                 disabled
    
            label="วิชา"
              id="name"
              value={nameidd}
              onChange={getName}
              className='textFileFont'
            />{" "}
        
          <br /><br />
          
            <TextField 
            label="ลิงค์"
             id="link" 
            value={link} 
            onChange={getLink}  className='textFileFont'/>{" "}
          
          <br /><br />
         
         <TextField
          id="commentvideo"
          label="คำบรรยายวิดีโอ"
          multiline
          rows={4}
         value={commentvideo}
          className='textFileFont'
          onChange={getCommentvideo}
        />
         
         
     
          <br /><br />
          </div>
          <Button
      variant="contained"
      sx={{ m: 1, width: "20ch" }}
     // type="submit"
    onClick={handleSubmit} //color= 'secondary'
     >
      Save
     </Button>
   
     </Paper>
     </Box>
       

 


    )
  }
  export default AddNewFile;
/*   <Link to='/Show' state={{sname:stat}}>
     <Button
      variant="contained"
     >
     Back
     </Button></Link>*/



/*

  <div className="container">
  <div {...getRootProps({className: 'dropzone'})}>
    <input {...getInputProps()} />
    <p>Drag 'n' drop some files here</p>
    <button type="button" onClick={open}>
      Open File Dialog
    </button>
  </div>
  <aside>
    <h4>Files</h4>
    <ul>{files}</ul>
  </aside>
</div>
*/