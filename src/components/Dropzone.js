import React, {useCallback, useRef, useState} from 'react';
import { Button, TextField } from '@mui/material';
import {useDropzone} from 'react-dropzone';

import './Dropzone.css'
import { db, storage } from '../firebase-config';
import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  arrayUnion,
 updateDoc
} from "firebase/firestore";
import { ref, getDownloadURL , uploadBytes} from "@firebase/storage";
import { makeMaskFromFormat } from '@material-ui/pickers/_helpers/text-field-helper';
function Dropzone() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileName, setFileNames] = useState([]);
  const captionRef = useRef(null);
  const uploadPost = async()=>{
    const docRef = await addDoc(collection(db,"posts"),{
      caption:captionRef.current.value,
      timestamp:serverTimestamp()
      })
      await Promise.all()(
        selectedFile.map(image=>{
          const fileRef = ref(storage,`posts/${docRef.id}/${image.path}`);
           uploadBytes(fileRef,image,"data_url").then(async()=>{
            const downloadURL = await getDownloadURL(fileRef)
            await updateDoc(doc(db,"post",docRef.id),{
              images:arrayUnion(downloadURL)
            })
           })
        })
      )
  }
  const onDrop = useCallback(acceptedFiles => {
    setSelectedFile(acceptedFiles.map(file=>
      Object.assign(file,{
        preview:URL.createObjectURL(file),
  
      })))
      setFileNames(acceptedFiles.map(file => file.name))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  const select_files = selectedFile?.map(file=>(
    <div>
<img src={file.preview} style = {{width:"200px"}} atl="" />
        <ul>
          {fileName.map(fileName => (
            <p href='https://www.google.com'>{fileName}</p>
          ))}
        </ul>
    </div>
))
  return (
    <div>   
    <useDropzone>
    <div {...getRootProps({ className: "dropzone" })}>
   
      <input  {...getInputProps()} />
      {
  
          <p>Drop the files here ...</p> 
          
      }
      
    </div>
    </useDropzone>
    <div>
      <input ref={captionRef} type="text" placeholder='Enter caption' />
  
      <Button onClick={uploadPost}> post </Button>  
      <strong>Files:</strong>
      {select_files}
    </div>
    </div>
  )
}
export default Dropzone ;
//<img src={file.preview} style = {{width:"200px"}} atl="" />
/*
<Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag'n'drop files, or click to select files</p>
          </div>
        )}
      </Dropzone>*/