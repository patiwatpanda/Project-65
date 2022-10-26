import React, { useEffect, useState }from 'react'
import { Box } from '@mui/system';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography';
import SimpleCard from '../components/SimpleCard';
import Row from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import VideocamIcon from '@mui/icons-material/Videocam';

import { useLocation } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Linkk from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import './Show.css';
import AddFile from '../pages/AddFile';
import Button from "@mui/material/Button";
import {BrowserRouter as Router, Link} from "react-router-dom";
import { CardMedia } from '@mui/material';
import VideoImageThumbnail from 'react-video-thumbnail-image';
import {
    Grid,
    Card,
    CardContent,
    CardHeader
} from '@mui/material';
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
    where
  } from "firebase/firestore";
import { sub } from 'date-fns';
import { timePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import { TimeToLeave } from '@material-ui/icons';
import { async } from '@firebase/util';
/*
const ExpansionPanel = styled(Accordion)(() => ({
    '&.root': {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
}))
*/
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  /*
const ExpansionPanelSummary = styled(AccordionSummary)({
    "&.root": {
        backgroundColor: 'rgba(0,0,0, .03)',
        borderBottom: '2px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    '& .content': {
        '&$expanded': {
            margin: '12px 0',
        },
      
    },
})
*/
/*
const ExpansionPanelDetails = styled(AccordionDetails)(({ theme }) => ({
    '&.root': {
        padding: theme.spacing(2),
    },
}))
*/
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
const CardTitle = styled('div')(({ subtitle }) => ({
    fontSize: '1rem',
    fontWeight: '800',
    textTransform: 'capitalize',
    marginBottom: !subtitle && "16px",
}))

const Container = styled('span')(({ theme }) => ({
    margin : '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '15px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

 function ShowSubject() {
    const subjectCollectionRef = collection(db, "subject");
    const titileCollectionRef = collection(db, "addfile");

    const getSubjects = async () => {
        const q = query( subjectCollectionRef);
        const data = await getDocs(q);
        console.log(data);
        setSubject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      
      const getAddfile = async () => {
        const q = query(titileCollectionRef);
        const data = await getDocs(q);
        console.log(data);
        setTitle(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      const getDetail = async () => {
        const q = query(titileCollectionRef);
        const data = await getDocs(q);
        console.log(data);
        setDetail(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    const [expanded, setExpanded] = React.useState(false)
    const [subject, setSubject] = React.useState([]);
    const [title, setTitle] = React.useState([]);
    const [detial, setDetail] = React.useState([]);
    const location = useLocation();

    const [namesubject,setNamesubject] = useState(location.state?.sname?.name);
    const [comment , setCommentsub] = useState(location.state?.sname?.comment);
    const [picturelink ,setPicturelink] = useState(location.state?.sname?.link);
    const [objectt , setObjectt] = useState(location.state?.sname?.objectt);
    console.log(namesubject,'ss')
    const [idx,setIdx]= useState(location.state?.sname?.idx);
    console.log(idx,'ss');
    const deleteAll = async (topic) => {
  
      console.log(topic,"aaaaaa")
      const q = query(titileCollectionRef, where("topic","==", topic))
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
      results.forEach(async (result) =>{
        const docRef = doc(db,"addfile",result.id)
        await deleteDoc(docRef);
      })
      
      
      
      getAddfile();
    };
    const deletesingle = async (topic) => {
  
      console.log(topic,"aaaaaa")
      const q = query(titileCollectionRef, where("topic","==", topic))
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
      results.forEach(async (result) =>{
        const docRef = doc(db,"addfile",result.id)
        await deleteDoc(docRef);
      })
      
      
      
      getAddfile();
    };
    function confirmsingle(id) {
      console.log("456",id)
      const confirm = window.confirm("ยืนยันที่จะลบไหม?");
      /**/if (confirm) {
        console.log("OK")
        deletesingle(id);
      }
      else {
        console.log("Cancle")
      }
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
    const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded? panel : false)
      /*
      if(newExpanded==newExpanded2 )
      setExpanded(true);
      else
      setExpanded(false);*/
    }
    
    useEffect(() => {
      //  getSubjects();
        getAddfile();
      
      }, []);
    //  const sub = subject.name ;
    /*
      const sub = subject.map(e=>{

      })*/
     // const see = subject.map( e=>e.id )
    const uniqueAges =[... new Set(title.map(data => data))] ;
  console.log(uniqueAges, "55");

    return (  
        
   // <Container>    
<div>
  <div  className='background' >
  <Box sx={{   display: 'flex' }}>
  <Paper  sx={{width:'500px',padding:'10px',border:'solid 1px black',m:'auto',mt:'50px'}} className='background'  variant="outlined">
  <Typography variant="h5" gutterBottom>
    รายละเอียด
      </Typography>
      <Typography variant="body2" gutterBottom>
      {comment }
      </Typography>
     
  </Paper>
  <Paper variant="outlined" sx={{width:'300px' ,p:'10px',border:'solid 1px black',m:'auto',mt:'10px',mb:'10px'}}>
   <img src={picturelink} alt="Girl in a jacket" margin='10px' width="300px" height="200px"/>
   <Typography variant="h5"  gutterBottom>
   { namesubject} 
      </Typography>
   </Paper>
</Box>
  </div>
  <Box sx={{ display: 'flex',justifyContent: 'space-evenly'}}>
<Box sx={{}}>
<Paper  sx={{width:'500px',height:'auto',padding:'10px',mt:'10px' }} variant="outlined">
  <Typography variant="h5" gutterBottom>
      วัตถุประสงค์
      </Typography>
      {objectt.map((e)=>(
          <Typography variant="subtitle1" gutterBottom>
  {e.objectt}
</Typography>
      ))


      }
    
      </Paper>
 
      </Box>
      
<Box sx={{  }} > 
<Typography variant="h6" gutterBottom>
       เนื้อหา
      </Typography>
     <Paper sx={{ width:500, height: "500",
    padding: '10px' ,marginTop:'20px', }} variant="outlined"  >
        


     <CardTitle  >
        {namesubject}
        &nbsp;  <Link to="/addnewfile"  state={{sname:namesubject , aname:idx}}>
             <Button variant="outlined" size="small"   /**/onClick={() => {
                    //  confirm(e.id);
                    }}>add</Button> </Link>  
            </CardTitle>
        
            {title.filter((ti,i,a) => ( ti.idtop == idx && a.findIndex(v=>v.topic===ti.topic) === i) ).map((titl,i)=>(
    
   
            <Accordion
                square
            
                expanded={expanded === titl } 
                onChange={handleChange(titl)}
    
            >

                <AccordionSummary
                 aria-controls="panel1d-content"
                 id="panel1d-header"
           //    expanded={expanded === titl } 
               //  onChange={handleChange(titl)}
        
                >
            
  
             <Typography sx={{width: '70%', flexShrink: 0 }} variant="button" key={titl.idx}>{titl.topic}</Typography>
             <Link to="/addfile" state={{sname:titl}}>
             <Button variant="outlined" size="small"   /**/onClick={() => {
                    //  confirm(e.id);
                    }}>add</Button> </Link>  &nbsp;
              <Button variant="outlined" color="error" size="small"   /**/onClick={() => {
                     confirm(titl.topic);
                    }}>delete</Button>
  
                </AccordionSummary>
               
                            <AccordionDetails>
                 <h3>วิดิโอ</h3>
                
                 {title.filter((tii,i,a) => ( tii.topic ==titl.topic && tii.name == namesubject)).map((ee,i)=>(
                  <Box    sx={{ display: 'inline' }} key={ee.id}>
    <Box  sx={{
          display: 'flex', justifyContent: 'space-between'}}>  <Typography variant="subtitle1" gutterBottom component='span'>    <VideocamIcon sx={{}} />  <Link to="/video"   state={{slink:ee}}><a  href="/video"   >{ee.commentvideo}</a>
        </Link > </Typography> <span>
          <Link  to="/updatefile" state={{sname:ee}}><Button  variant="outlined" size="small"   /**/onClick={() => {
                    //  confirm(ee.id);
                    }}  >edit</Button> </Link>  <Button variant="outlined" color="error" size="small"   /**/onClick={() => {
                     confirm(ee.id);
                    }}>delete</Button></span></Box>  </Box>
                
                 ))}
                  
                </AccordionDetails>
   
            </Accordion>
           
         
    
      
      
        ))}
        
  
        </Paper>
        </Box>
        </Box>
      </div>
      // </Container>
    )
}
export default ShowSubject ; 
/* <div > 
<Link to="/addfile" state={{nameid:e }} > 
   <Typography sx ={{border:'solid 2px black'}}>test</Typography>
<Button sx={{ width: "10px" ,margin:'10px' }} variant="contained">addFile</Button>
      </Link>    
      </div> 
         <Box
   sx={{
    display: 'inline-block',
    '& > :not(style)': {
      m: 1,
      border:'solid 1px red',m:'auto',mt:'10px',
      height: "auto",
      marginBottom:'100px',
     
    },}}
 >      </Box>
  <Paper  sx={{width:'500px',padding:'10px',m:'auto',mt:'10px',backgroundColor:'gray',display: 'inline-block'}} variant="outlined">
    </Paper>
  */