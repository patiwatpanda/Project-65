import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import './App.css';
import Home from './pages/Home';
import AddTeach from './pages/AddTeach';
import AddSubject  from './pages/AddSubject';
import Navbar from './components/Navbar';
import AddFile from './pages/AddFile' ;
//import AppFome from './components/AppFome' ;
import ShowSubject from './pages/ShowSubject';
//import Dropzone from 'react-dropzone';
import AddDropzone  from './components/Dropzone';
import Video  from './pages/Video';
import AddnewSubject from './pages/AddnewSubject';
import AddNewFile from './pages/AddNewFile';
import UpdateAddFile from './pages/UpdateAddFile';
import Profile from './pages/Profile';
import { reactLocalStorage } from "reactjs-localstorage";
import EditProfile from './pages/EditProfile';
function App() {  
  const [showNav, setShowNav ]= useState(true) ;
  const name = reactLocalStorage.getObject("Xuser")[0]?.user
  const role = reactLocalStorage.getObject("Xuser")[0]?.role
  //props.funcNav(false);
  if (role === "admin") {
  return (
  
      <Router>
       <Navbar/>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/addteach" element={<AddTeach />} />
        <Route path="/addsubject" element={<AddSubject/>} />
        <Route path="/addfile" element={<AddFile  />} />
        <Route path="/Show" element={<ShowSubject />} />
        <Route path="/video" element={<Video />} />
        <Route path="/getdrop" element={<AddDropzone />} />
        <Route path="/addnewsubject" element={<AddnewSubject />} />
        <Route path="/addnewfile" element={<AddNewFile />} />
        <Route path="/updatefile"  element={<UpdateAddFile />}/>
        <Route path="/profile"  element={<Profile />} />
        <Route path="/editprofile"  element={<EditProfile />} />
        </Routes>
       
      </Router>
   
  );
}else if (role === "user") {
  return (
  
      <Router>
       <Navbar/>
        <Routes>
  
        <Route path="/home" element={<Home />} />
        <Route path="/addteach" element={<AddTeach />} />
        <Route path="/addsubject" element={<AddSubject/>} />
        <Route path="/addfile" element={<AddFile  />} />
        <Route path="/Show" element={<ShowSubject />} />
        <Route path="/video" element={<Video />} />
        <Route path="/getdrop" element={<AddDropzone />} />
        <Route path="/addnewsubject" element={<AddnewSubject />} />
        <Route path="/addnewfile" element={<AddNewFile />} />
        <Route path="/updatefile"  element={<UpdateAddFile />}/>
        <Route path="/profile"  element={<Profile />} />
        <Route path="/editprofile"  element={<EditProfile />} />
        </Routes>
       
      </Router>
   
  );
}else {
  return (
  
      <Router>

        <Routes>
     <Route path='/' element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addteach" element={<AddTeach />} />
        <Route path="/addsubject" element={<AddSubject/>} />
        <Route path="/addfile" element={<AddFile  />} />
        <Route path="/Show" element={<ShowSubject />} />
        <Route path="/video" element={<Video />} />
        <Route path="/getdrop" element={<AddDropzone />} />
        <Route path="/addnewsubject" element={<AddnewSubject />} />
        <Route path="/addnewfile" element={<AddNewFile />} />
        <Route path="/updatefile"  element={<UpdateAddFile />}/>
        <Route path="/profile"  element={<Profile />} />
        <Route path="/editprofile"  element={<EditProfile />} />
        </Routes>
       
      </Router>
   
  );
}
}


export default App;
//<Route path='/addfile' element={<AppFome/>} />