import React,{useState} from 'react' ;
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; 
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import './Video.css';
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
import { Button, CardActionArea, CardActions } from '@mui/material';
function Video (){
  const [title,setTitle] = useState([]);
  const location = useLocation();
  const [videolink ,setVideolink] = useState(location.state?.slink?.link);
  const [namevideo ,setNameVideo] = useState(location.state?.slink?.topic);
  const [comment , setComment] = useState(location.state?.slink.commentvideo);
  console.log('55',videolink);
  const titileCollectionRef = collection(db, "addfile");
  const getAddfile = async () => {
    const q = query(titileCollectionRef);
    const data = await getDocs(q);
    console.log(data);
    setTitle(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

    return(
      <Box sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: "1000px",
          height: "auto",
          marginTop:'10px',
          margin:'auto'
        },
      }}>
        <Card sx={{ maxWidth:1000, padding:" 10px"}}>
 
        <CardMedia
  component="iframe"
  sx={{}}
  width="800"
  height="600"
  src={videolink}title="YouTube video player" frameborder="0"   allowfullscreen="allowfullscreen"

/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {namevideo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {comment}
            </Typography>
          </CardContent>
      
  
      </Card>
</Box>
    )
}

    export default Video ;