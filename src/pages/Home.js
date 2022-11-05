import React , {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Divider from '@mui/material/Divider';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useLocation } from 'react-router-dom';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { DatePicker } from "@material-ui/pickers";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import './Home.css';
import { useTab } from '@mui/base';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
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
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

export default function Home() {
  const userid = reactLocalStorage.getObject("Xuser")[0]?.id
  const location = useLocation();
  const [name,setName] = useState("");
  const [comment,setComment]=useState("");
  const [image,setImage]=useState("");
  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };
  const [value, setValue] = useState(dayjs('2022-04-07'));
  const [subject,setSubjects] = useState([]);
  const subjectCollectionRef =  collection(db,"subject")
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  //const [date, changeDate] = useState(new Date());
  const [date, setDate] = useState(dayjs(new Date()));
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const getSubjects= async () =>{
    const q = query(subjectCollectionRef,where("user","==",userid));
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
    <Box sx={{  display: 'flex', flexDirection:'row', justifyContent: 'center' }}>
    <Box sx={{
      display: 'flex',
      '& > :not(style)': {
     
        width: "1025px",
        height: "auto",
       
      //  marginTop:'10px',
     //   margin:'auto'
      },    flexDirection:'column',
      justifyContent: 'center'
    }}>
      
        <Box sx={{mt:"10px", maxWidth: 1025, flexGrow: 1 }}>
      <Paper
      variant="outlined"
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 300,
                  display: 'block',
                  maxWidth: 1025,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Paper      variant="outlined" sx={{mb:"10px"}}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
          variant="outlined" 
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button  variant="outlined"  size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      /></Paper>
    </Box>
      <Paper  variant="outlined">
        <h3 className='h2title'>Course overview</h3>
        <Divider  style={{width:'100%'}}/>
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
   <Box  sx={{maxWidth: 490 ,mt:"10px",ml:"10px"}}>
    <Paper  variant="outlined" >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
    </LocalizationProvider>
        </Paper>
        </Box>
   </Box>
  );
}
/**   <Box sx={{ maxWidth: 500, flexGrow: 1 }}>
 * <div>
        <Paper  variant="outlined" >
    <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
      />
        </Paper></div
      </Box> */