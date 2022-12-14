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
} from "firebase/firestore";
import { ref,getDownloadURL, uploadBytes} from '@firebase/storage'
import { upload } from "@testing-library/user-event/dist/upload";
function AddTeach() {
  const linkpicture = reactLocalStorage.getObject("Xuser")[0]?.imges
  const nameProfile = reactLocalStorage.getObject("Xuser")[0]?.name
  const lastnameProfile = reactLocalStorage.getObject("Xuser")[0]?.lastname
  const emailProfile = reactLocalStorage.getObject("Xuser")[0]?.email
  const telProfile = reactLocalStorage.getObject("Xuser")[0]?.tel
    const [userx, setUserx] = useState([]);
    const [name, setName] = useState("");
    const [passx, setPassx] = useState("");
    const [rolex, setRolex] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLasName] = useState("");
    const [tel,setTel] = useState("");
    const [picture, setPicture] = useState([]);
    const [after, setAfter] = useState(0);
    //  const usersCollectionRef = collection(db, "user");
    const [equal, setEqual] = useState(0);
    const [userror, setUserror] = useState(false);
    const [passerror, setPasserror] = useState(false);
    const [add, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "addteach");
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
      const getPicture = async () => {
        const q = query(usersCollectionRef);
        const data = await getDocs(q);
       
        setPicture(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    const getUsers = async (e) => {
        const q = query(collection(db, "user"), where("user", "==", userx));
        const data = await getDocs(q);
        console.log(data, " +++");
        console.log(q, " +++");
        if (data.docs.length > 0) {
          alert("?????????????????????????????????????????????????????????????????????");
        } else {
          e.preventDefault();
          setUserror(false);
          setPasserror(false);
          if (userx != "" && passx != ""&&name!=""&&rolex != "") {
           const docRef=  await addDoc(collection(db, "user"), {
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
                     const imageRef = ref(storage, `user/${docRef.id}/${image.path}`)
                     console.log(imageRef,"55")
                      uploadBytes(imageRef, image,"date_url").then(async()=>{
                        const downloadURL = await getDownloadURL(imageRef)
                        await updateDoc(doc(db,"user",docRef.id),{
                          image:arrayUnion(downloadURL) 
                       
                        })  
              window.location.reload()        }) 
                    })
         )
              .then((res) => {
                console.log("User ed");
                 alert("????????????????????????????????????????????????");
                setUserx("");
                setPassx("");
                setName("");
                setRolex("");
                setLasName("");
                setEmail("");
                setTel("");
              
              })
              .catch((err) => {
                console.log(err);
              });
           
            
          } else {
            alert("???????????????????????????????????????????????????????????????");
            
          }
        }
      };
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
           Create User
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
        </Box>
    );
}
export default AddTeach;