import React, { useState } from 'react';
import {getDatabase,ref,set} from 'firebase/database';
import {getStorage,ref as storageRef,uploadBytes,getDownloadURL} from 'firebase/storage'
import { app } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const[name,setName] = useState("");
    const[adm,setAdm] = useState(null);
    const[phone,setPhone] = useState(null);
    const[selectedFile,setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setSelectedFile(file)
    }

    const submitHandeler = async (e)=>{
        e.preventDefault();
        const db = getDatabase(app);
        const storage = getStorage(app);

        const imgRef = storageRef(storage,`image${adm}`);
        await uploadBytes(imgRef,selectedFile);
        const imgUrl = await getDownloadURL(imgRef);

        set(ref(db,"student1/"+adm),{
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
        
    }
  return (
    <div>
       <form onSubmit={submitHandeler}>
        <input type="text" onChange = {(e)=>setAdm(e.target.value)} placeholder = "adm no."/>
       <input type="text" onChange = {(e)=>setName(e.target.value)}placeholder='student name' />
        <input type='number' onChange = {(e)=>setPhone(e.target.value)} placeholder='phone number'/>
        <input type="file" onChange={handleFileChange} />
        <button>Submit</button>
       
       </form>
    </div>
  )
}

export default AddStudent
