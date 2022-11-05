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
import { app,db,storage } from "../firebase-config";
import Table from "@mui/material/Table";
import { reactLocalStorage } from "reactjs-localstorage";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Card from '@mui/material/Card';
import Paper from "@mui/material/Paper";
import "./AddSubject.css";
import {useDropzone} from 'react-dropzone';
//import { reactLocalStorage } from "reactjs-localstorage";
import {
  collection,
  addDoc,
  doc,
  documentId,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref,getDownloadURL, uploadBytes} from '@firebase/storage'
import { upload } from "@testing-library/user-event/dist/upload";
function  Profile() {
  const linkpicture = reactLocalStorage.getObject("Xuser")[0]?.imges
  const nameProfile = reactLocalStorage.getObject("Xuser")[0]?.name
  const lastnameProfile = reactLocalStorage.getObject("Xuser")[0]?.lastname
  const emailProfile = reactLocalStorage.getObject("Xuser")[0]?.email
  const telProfile = reactLocalStorage.getObject("Xuser")[0]?.tel
  const passProfile = reactLocalStorage.getObject("Xuser")[0]?.password
  const userProfile = reactLocalStorage.getObject("Xuser")[0]?.user
  const roleProfile = reactLocalStorage.getObject("Xuser")[0]?.role
  const idProfile = reactLocalStorage.getObject("Xuser")[0]?.id
    const [userx, setUserx] = useState(userProfile);
    const [name, setName] = useState(nameProfile);
    const [passx, setPassx] = useState(passProfile);
    const [rolex, setRolex] = useState(roleProfile);
    const [email, setEmail] = useState(emailProfile);
    const [lastname, setLasName] = useState(lastnameProfile);
    const [tel,setTel] = useState(telProfile);
    const [user, setUser] = useState([]);
    const [after, setAfter] = useState(0);
    //  const usersCollectionRef = collection(db, "user");
    const [equal, setEqual] = useState(0);
    const [userror, setUserror] = useState(false);
    const [passerror, setPasserror] = useState(false);
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
   console.log(idProfile,"aa");
   console.log(user,"a");
      const getUser = async () => {//,where(documentId(),"==",idProfile)
        const q = query(usersCollectionRef,where(documentId(),"==",idProfile));
        console.log(q,"Error");
        const data = await getDocs(q);
        if (data.docs.length >= 1) {
        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        else{
            console.log("Error");
        }
      }
    const getUsers = async (e) => {
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
    
      useEffect(() => {
        //  getSubjects();
         getUser();
      //  reactLocalStorage.getItem('Xuser');

        }, []);
  /* */
      
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
            {user.map((e)=>(      
<Box sx={{display:"flex",alignItems:'center',justifyContent: 'center',flexDirection: 'column' }}>

               <Avatar
     alt="Remy Sharp"
     src={e.image}
     sx={{ display:"flex",justifyContent: 'center' ,width: 150, height: 150 }}
   /> 
 <br/>
         <Typography  sx={{display:"flex",justifyContent: 'center'}}variant="subtitle1" gutterBottom>
       Name:{e.name} {e.lastname}
      </Typography>
  
      <Typography  sx={{display:"flex",justifyContent: 'center'}}variant="subtitle1" gutterBottom>
          Email:{e.email}
      </Typography>
      <Typography  sx={{display:"flex",justifyContent: 'center'}}variant="subtitle1" gutterBottom>
          Tel:{e.tel}
      </Typography>
          </Box> 
          ))} 
          </Box>
             
        </Card>
        </Box>
{user.map((e)=>(

          <Box sx={{display:"flex",justifyContent: 'center',ml:"10px"}}  >
        <Card   variant="outlined"
        sx={{
          m:"auto",mt:"10px", p: 0, maxWidth: 1000, mr:"10px",
        }} >
        <Box
          sx={{
            padding: "15px ",
          }}
          display="flex"
          // alignItems="center"
       flexDirection = 'column'
       justifyContent= 'center'
        >
            <br />
                  
          <Box flexGrow={1} component="div">
            <Typography
             variant="h4"
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
      
            <FormControl sx={{  pl:"5px",m: 1, width: "50ch" }}>
            
              <TextField
                     disabled
               variant="outlined"
                label="User"
                id="userx"
                value={e.user}
                
          
              />{" "}
            </FormControl> 
            <FormControl sx={{pl:"5px", m: 1, width: "50ch" }} variant="outlined">
              <TextField
                     disabled
                label="Tel"
                id="tel"
             value={e.tel}
             
       
              />{""}
            </FormControl>
         
            <br />
            <FormControl sx={{ pl:"5px",m: 1, width: "50ch" }} variant="outlined">
              <TextField
                     disabled
                label="Password"
                id="passx"
                value={e.password}
             
            
              />{" "}
            </FormControl>
            <FormControl sx={{pl:"5px", m: 1, width: "50ch" }} variant="outlined">
              <TextField
                 disabled
                label="Email"
                id="email"
              value={e.email}
             
    
              />{""}
            </FormControl>
         
            <br />
            <FormControl sx={{m: 1, width: "25ch" }} variant="outlined">
              <TextField disabled label="Name" id="name" 
              value={e.name}  
           />{" "}
              
            </FormControl>
              <FormControl>
              <TextField disabled variant="outlined" sx={{mt:1, width: "25ch" ,mr:"5px" }} label="LastName" id="lastname" 
              value={e.lastname}  
          
           
            />{""}
              </FormControl>
              <FormControl sx={{pl:"5px", m: 1, width: "50ch" }} variant="outlined">
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                     disabled
                labelId="demo-simple-select-label"
                id="rolex"
                value={e.role}
                label="Role"
               
          
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>     
             
            </FormControl>  
            <br />
            <Box sx={{display:"flex",justifyContent: 'center',alignItems:'center'}}>
            <Link  to="/editprofile" state={{sname:e}}>
          <Button sx={{m:'10px',}} variant="contained" >Edit</Button>
             </Link>
             </Box>
        </Card>
        </Box>
           ))}

      </Box>
  );
}
export default Profile;
//{user.map((e)=>(               ))} 