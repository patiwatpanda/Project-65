import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { db,storage } from "../firebase-config";
import Table from "@mui/material/Table";
import { reactLocalStorage } from "reactjs-localstorage";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import Paper from "@mui/material/Paper";
import { useLocation } from 'react-router-dom';
import "./AddSubject.css";
import {useDropzone} from 'react-dropzone';
//import { reactLocalStorage } from "reactjs-localstorage";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  documentId
} from "firebase/firestore";
import { ref,getDownloadURL, uploadBytes} from '@firebase/storage'
import { upload } from "@testing-library/user-event/dist/upload";
function EditProfile() {
 
  const id = reactLocalStorage.getObject("Xuser")[0]?.id
  const userarray =reactLocalStorage.getObject("Xuser")[0]
console.log(userarray,"aa")
const location = useLocation();
    const [userx, setUserx] = useState(location.state?.sname?.user);
    console.log(userx,"aaaa");
    const [name, setName] = useState(location.state?.sname?.name);
    const [passx, setPassx] = useState(location.state?.sname?.password);
    const [rolex, setRolex] = useState(location.state?.sname?.role);
    const [email, setEmail] = useState(location.state?.sname?.email);
    const [lastname, setLasName] = useState(location.state?.sname?.lastname);
    const [tel,setTel] = useState(location.state?.sname?.tel);
    const [image,setImage] = useState(location.state?.sname?.image);
    const [user,setUser] = useState([]);
    const [picture, setPicture] = useState([]);
  //  const [after, setAfter] = useState(0);
    //  const usersCollectionRef = collection(db, "user");
 //   const [equal, setEqual] = useState(0);
    const [userror, setUserror] = useState(false);
    const [passerror, setPasserror] = useState(false);
    const [add, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "user");
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
    console.log(id,"ss");
    /** 
    const getUser = async ()=>{
      const q = query(usersCollectionRef,where(documentId(),"==",id));
      console.log(q,"Error");
      const data = await getDocs(q);
      if (data.docs.length >= 1) {
        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     //reactLocalStorage.setObject('Xuser', data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      else{
          console.log("Error");
      }
    };*/
    const getUserx = (e) => {
        setUserx(e.target.value);
      };
      const getPassx = (e) => {
        setPassx(e.target.value);
      };
      const getRolex = (e) => {
        setRolex(e.target.value);
      };
      const getName = (e) => {
        setName(e.target.value);
      };
      const getEmail = (e) => {
        setEmail(e.target.value);
      };
      const getLastName =(e)=> {
        setLasName(e.target.value);
      }
      const getTel =(e)=>{
        setTel(e.target.value);
      }

    const getUsers = async (e) => {
        e.preventDefault();
        const q = query(collection(db, "user"), where("user", "==", userx));
        const data = await getDocs(q);
        console.log(data, " +++");
        console.log(q, " +++");
        if (data.docs.length > 0) {
          alert("มีชื่อผู้ใช้นี้อยู่แล้ว");
        } else {
          e.preventDefault();
          setUserror(false);
          setPasserror(false);
          if (userx != "" && passx != ""&&name!=""&&rolex != "") {
           const docRef=  await updateDoc(doc(db, "user",id), {
              user: userx,
              password: passx,
              role: rolex,
              name: name,
              lastname:lastname,
              email:email,
              tel:tel,
            })
            await Promise.all(
              acceptedFiles.map(image=>{
                     const imageRef = ref(storage, `user/${docRef}/${image.path}`)
                     console.log(imageRef,"55")
                      uploadBytes(imageRef, image,"date_url").then(async()=>{
                        const downloadURL = await getDownloadURL(imageRef)
                        await updateDoc(doc(db,"user",docRef.id),{
                          imges:arrayUnion(downloadURL)
                        })
                      })
                    })
         )
              .then((res) => {
                console.log("User ed");
                 alert("กรอกข้อมูลสำเร็จ");
                setUserx("");
                setPassx("");
                setName("");
                setRolex("");
                setLasName("");
                setEmail("");
                setTel("");
              // window.location.reload()
              })
              .catch((err) => {
                console.log(err);
              });
           
            
          } else {
            alert("กรุณากรอกข้อมูลให้ครบ");
            
          }
        }
      };
     
      useEffect(()=>{
     //   getUser();
      })
     
    return(
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        m: 1,

        borderRadius: 1,
      }}
    >       

<Box sx={{display:"flex",justifyContent: 'center',}}  >
        <Card   variant="outlined"
        sx={{
          m:"auto",mt:"10px", p: 0, maxWidth: 920, mr:"10px",
        }} >
            <Box
          sx={{
            padding: "15px ",
          }}
          display="flex"
          // alignItems="center"
       flexDirection= 'column'
       
        >
            <br />
            
          <Box flexGrow={1} component="div">
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
           Profile
            </Typography>
          </Box>
         </Box>
          <Divider  style={{width:'100%'}}/>
          
          <br />
      <Box>
            <FormControl sx={{  pl:"5px",m: 1, width: "50ch" }}>
            
              <TextField
               variant="outlined"
                label="User"
                id="userx"
                value={userx}
             
                onChange={getUserx}
              />{" "}
            </FormControl> 
            <FormControl sx={{pl:"5px", m: 1, width: "50ch" }} variant="outlined">
              <TextField
                label="Tel"
                id="tel"
             value={tel}
              
            onChange={getTel}
              />{""}
            </FormControl>
            <br />
            <FormControl sx={{ pl:"5px",m: 1, width: "50ch" }} variant="outlined">
              <TextField
                label="Password"
                id="passx"
                value={passx}
           
                onChange={getPassx}
              />{" "}
            </FormControl>
          <FormControl sx={{pl:"5px", m: 1, width: "50ch" }} variant="outlined">
              <TextField
                label="Email"
                id="email"
              value={email}
            
            onChange={getEmail}
              />{""}
            </FormControl>
            <br />
            <FormControl sx={{m: 1, width: "25ch" }} variant="outlined">
              <TextField label="Name" id="name" 
              value={name}  
              onChange={getName} />{" "}
              
            </FormControl>
              <FormControl>
              <TextField variant="outlined" sx={{mt:1, width: "25ch" ,mr:"5px" }} label="LastName" id="lastname" 
              value={lastname}  
             
              onChange={getLastName}
            />{""}
              </FormControl>
              <FormControl sx={{pl:"5px", m: 1, width: "50ch" }} variant="outlined">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="rolex"
                value={rolex}
                label="Role"
                disabled
                onChange={getRolex}
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </FormControl>
              <FormControl sx={{pl:"5px", m: 1, width: "1000px" }} variant="outlined">
              <Card variant="outlined"
        sx={{
          m:"auto",mt:"10px", p: '10px', maxWidth: 850, m:"10px",
        }} >
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
    </div> </Card>
    </FormControl>

            </Box>
    <Box sx={{display:"flex",justifyContent: 'center',alignItems:'center'}}>
            <Button
              variant="contained"
              sx={{ m: 1, width: "20ch" }}
              onClick={getUsers} color= 'primary'
            >
              Save
            </Button>
     </Box>
   
        </Card>
        </Box>
  
        <Box   sx={{  }} >
        <Card   variant="outlined"
        sx={{
         m:"auto",mt:"10px", p: 0, maxWidth: 450
        }}>
          <CardHeader color="danger"  title=""/>
              
            
      
            <Box
          sx={{
            padding: "15px ",display:"flex",justifyContent:'center', // flexDirection: 'column'
          }}
     
      //   alignItems="center"
          
        
        >
            <br />
          
<Box sx={{display:"flex",alignItems:'center',justifyContent: 'center',flexDirection: 'column' }}>
       
               <Avatar
     alt="Remy Sharp"
     src={image}
     sx={{ display:"flex",justifyContent: 'center' ,width: 150, height: 150 }}
   /> 
 <br/>
         <Typography  sx={{display:"flex",justifyContent: 'center'}}variant="subtitle1" gutterBottom>
       Name:{name} {lastname}
      </Typography>
  
      <Typography  sx={{display:"flex",justifyContent: 'center'}}variant="subtitle1" gutterBottom>
          Email:{email}
      </Typography>
      <Typography  sx={{display:"flex",justifyContent: 'center'}}variant="subtitle1" gutterBottom>
          Tel:{tel}
      </Typography>
          </Box>
         </Box>
        </Card>
        </Box>
       
        </Box>
    );
}
export default EditProfile;
//      {user.map((e)=>(   ))}