import { useEffect, useState } from "react"
import {getDatabase,ref,onValue, remove} from 'firebase/database';
import {getStorage,ref as storageRef,deleteObject} from 'firebase/storage'
import { app } from '../FirebaseConfig';
import { useNavigate } from "react-router-dom";

const StudentList = () => {
 
  const[studentData,setStudentData] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const db = getDatabase(app);
    const studentRef = ref(db,"student1");
    onValue(studentRef,(snapsot)=>{
      const data =snapsot.val();
      console.log(data);
      setStudentData(data);
    })
  },[]);

  const deleteData = (key)=>{
    const db = getDatabase(app);
    const storage = getStorage(app);
    const studentRef = ref(db,"student1/"+key);
    const imgRef = storageRef(storage,"image"+key);
    
    deleteObject(imgRef)
    .then(res=>{
      remove(studentRef);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div>
      <h1>StudentList</h1>
      {
        studentData && (
          <div>
            {Object.entries(studentData).map(([key,value])=> (
              <div key={key}> 
              <img src={value.imgURL} alt="" style={{width:"200px", height:"200px"}}/>
              <p>{value.studentName} {value.phoneNo}</p>
              <button onClick={()=>deleteData(key)}>Delete</button>
              <button onClick={()=>navigate("/updateStudent",{state:[key,value]})}>Update</button>
              </div>
              
              
              )
            )}
          </div>
        )
      }

    </div>
  )
}

export default StudentList
