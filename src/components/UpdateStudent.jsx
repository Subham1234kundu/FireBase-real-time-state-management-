import React, { useState } from 'react';
import {getDatabase,ref,update} from 'firebase/database';
import {getStorage,ref as storageRef,uploadBytes,getDownloadURL} from 'firebase/storage'
import { app } from '../FirebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const[name,setName] = useState(location.state[1].studentName);
    const[adm,setAdm] = useState(location.state[0]);
    const[phone,setPhone] = useState(location.state[1].phoneNo);
    const[selectedFile,setSelectedFile] = useState(null);
    

    console.log(location);


    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setSelectedFile(file)
    }


    const submitHandeler = async(e)=>{
        e.preventDefault();

        if(selectedFile){
            const db = getDatabase(app);
        const storage = getStorage(app);
        const studentRef = ref(db,"student1/"+adm);
        const imgRef = storageRef(storage,`image${adm}`);
        await uploadBytes(imgRef,selectedFile);
        
        const imgUrl = await getDownloadURL(imgRef);
        update(studentRef,{
            studentName:name,
            phoneNo:phone,
            imgURL:imgUrl
        })
        .then(res=>{
            navigate("/studentList");
        })
        .catch(err=>{
            console.log(err);
        })
        
        }else{
            const db = getDatabase(app);
        const studentRef = ref(db,"student1/"+adm);
        update(studentRef,{
            studentName:name,
            phoneNo:phone,
            
        })
        .then(res=>{
            navigate("/studentList");
        })
        .catch(err=>{
            console.log(err);
        })
        }
        
    }
  return (
    <div>
       <form onSubmit={submitHandeler}>
        <input value={adm} type="text" onChange = {(e)=>setAdm(e.target.value)} placeholder = "adm no."/>
       <input value={name} type="text" onChange = {(e)=>setName(e.target.value)}placeholder='student name' />
        <input value={phone} type='number' onChange = {(e)=>setPhone(e.target.value)} placeholder='phone number'/>
        <input type="file" onChange={handleFileChange} />
        <button>Update</button>
       
       </form>
    </div>
  )
}

export default UpdateStudent
