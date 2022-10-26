import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { db } from "../firebase-config";
import { app } from "../firebase-config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useLocation } from 'react-router-dom';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
//import { DropzoneArea } from 'material-ui-dropzone';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from '@mui/icons-material/Add';
import { reactLocalStorage } from "reactjs-localstorage";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { v4 as uuidv4 } from 'uuid';
import './AddSubject.css' ;
//import { reactLocalStorage } from "reactjs-localstorage";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  updateDoc
  
} from "firebase/firestore";
function AddSubject() {
  const projectsDefault = [
    {  id:uuidv4(),objectt:""},
   
  ]
  const location = useLocation();
    const [idx, setUserx] = useState(location.state?.sname?.idx);
    const [name, setName] = useState(location.state?.sname?.name);
    const [detail, setDetail] = useState(location.state?.sname?.detail);
    const [link, setLink] = useState(location.state?.sname?.link);
    //  const usersCollectionRef = collection(db, "user");
    const [comment, setComment] = useState(location.state?.sname?.comment);
    const [userror, setUserror] = useState(false);
    const [passerror, setPasserror] = useState(false);
    const [imagelink, setImage] = useState("");
    const usersCollectionRef = collection(db, "addteach");
    const [inputObject, setInputObject] = useState(location.state?.sname?.objectt);
    console.log(inputObject)
    const getUserx = (e) => {
        setUserx(e.target.value);
      };
      const getDetail = (e) => {
        setDetail(e.target.value);
      };
      const getComment = (e) => {
        setComment(e.target.value);
      };
      const getName = (e) => {
        setName(e.target.value);
      };
      const getLink = (e) => {
        setLink(e.target.value);
      };
      const getImLink = (e) => {
        setImage(e.target.value);
      };
    const getUsers = async (e) => {
      /*
        const q = query(collection(db, "subject"), where("idx", "==", idx));
        const data = await getDocs(q);
        console.log(data, " +++");
        console.log(q, " +++");
        if (data.docs.length > 0) {
          alert("มีชื่อผู้ใช้นี้อยู่แล้ว");
        }  else { }*/
          e.preventDefault();
          setUserror(false);
          setPasserror(false);
          if (idx != "" &&name!="") {
            await updateDoc(doc(db, "subject",location.state?.sname?.id ), {
              idx: idx,
              link:link,
              name: name,
              comment:comment,
              detail:detail,
              objectt:[...inputObject]
         //     id:[...inputObject.id]
            
            }) .then((res) => {
              console.log("User ed");
               alert("กรอกข้อมูลสำเร็จ");
              setUserx("");
              setName("");
              setLink("");
              setComment("");
              setDetail("");
              setInputObject([...inputObject, {id: '',  objectt: '' }]);
              window.location.reload()
            })
            .catch((err) => {
              console.log(err);
            });
         
        } else {
          alert("กรุณากรอกข้อมูลให้ครบ");
          
        }
            /*
            await updateDoc(collection(db,"subject"),{
              objectt:  app.firebase.FieldValue.arrayUnion(inputObject)
            })*/
             
       
      };
      const handleAddFields = (e) => {
      /**     const fields = [ ...inputObject];
	fields.splice(index+1, 0, { id: uuidv4(),  object: '' });
	this.setInputObject({
    inputObject: fields 
	});*/
        setInputObject([...inputObject, {id: '',  objectt: '' }])
      }
      const handleNameChange = evt => {
        this.setState({ name: evt.target.value });
      };
      const handleChangeInput =  (index,e) => {
        e.preventDefault();
        const newShareholders = inputObject.map((shareholder, sidx) => {
          if (index !== sidx) return shareholder;
          return { ...shareholder, id:uuidv4(),objectt: e.target.value };
        });
        setInputObject(newShareholders);
     /*    const value = e.target.value;
        const newInputFields = inputObject.map((i,ii) => {
          if(index === i.objectid) {
         
            i[e.target.name] = value 
        
          }
          return i;
        })   */
       // console.log(id ,"sss");
       // setInputObject(newInputFields);  setInputObject({...inputObject, [e.target.name] :  value  });
   
     //    setInputObject({...inputObject[index], [e.target.name] :  e.target.value })///**/
    
   //  const {name,value} = e.target ;
    //  const name = e.target.name;
  //    const valuess = e.target.value; 
     /* const list = [...inputObject] ;
    
    console.log('name', e.target.name);
    console.log('value', e.target.value ); 
      list[index][e.target.name] = e.targetvalue;
      setInputObject(list);
     */
     //setInputObject({ ...list, [prop][index]: e.target.value })
      };
      const handleRemoveFields = (id) => {
        const values  = [...inputObject];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputObject(values);
      }
    return(
       
      <div className="Boxmaster">
          <div className="Boxmastercenter">
            <div>
  
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <TextField
                label="รหัส"
                id="idx"
                value={idx}
                onChange={getUserx}
              />{" "}
            </FormControl>
            </div>
          
            <div>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <TextField
                label="ชื่อวิชา"
                id="name"
                value={name}
                onChange={getName}
              />{" "}
            </FormControl>
            </div>
       
            <div>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <TextField
                label="ลิงค์รูปภาพ"
                id="link"
                value={link}
                onChange={getLink}
              />{" "}
            </FormControl>
            </div>
            
            <div className="Boxmastercenter">
            <TextField
          id="comment"
          label="comment"
          multiline
          rows={4}
          sx={{width:"50ch"}}
          value={comment}
          onChange={getComment}
        /></div>    <br/>
          <div className="Boxmastercenter">
            <TextField
          id="comment"
          label="รายเอียดวิชา"
          multiline
          rows={4}
          sx={{width:"50ch"}}
          value={detail}
          onChange={getDetail}
        />    </div> 
  
          </div>
     
        <br/> 
        {inputObject.map((inputobject, index) => ( <div key={index}  className="Boxmuilti">
        <Box sx={{  ml: '180px', display: 'inline-flex'}}>
        <br/>
        <TextField
          id="objective"
          label="วัตถุประสงค์"
          multiline
          rows={4}
          sx={{width:"50ch"}}
          value={inputobject.objectt}
          onChange={(e) => handleChangeInput(index,e)}
        />
             <br/>
      </Box>
      <Box sx={{ml:'10px', display: 'inline-flex'}}>
      {
       <Button 
            sx={{  }}
             onClick={handleAddFields}
            >
              <AddIcon />    
            </Button>}
         <br/>
          {

            <Button 
            sx={{ }}
            disabled={index === 0} 
            onClick={() => handleRemoveFields(inputobject.id)}
             
            >
              <RemoveRoundedIcon />
            </Button>} </Box>
            <br/>  </div>
            )  ) }
          
      
          <div className="Boxmastercenter">       
    <Button
        variant="contained"
        sx={{ mt:'10px', width: "25ch" }}
        onClick={getUsers} color= 'primary'
      >
        Save
      </Button>
    </div>
          </div>
       
     
    );
}
export default AddSubject;