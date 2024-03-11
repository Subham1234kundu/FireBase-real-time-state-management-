import AddStudent from "./components/AddStudent";
import Dashboard from "./components/Dashboard";
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import StudentList from "./components/StudentList";
import UpdateStudent from "./components/UpdateStudent";

const myRouter = createBrowserRouter([
   {path:"",Component:Dashboard,children:[
    {path:"",Component:StudentList},
    {path:"addStudent" ,Component:AddStudent},
    {path:"studentList",Component:StudentList},
    {path:"updateStudent",Component:UpdateStudent}
   ]}
])

function App() {
  

  return (
    <>
      <RouterProvider router={myRouter}/>
     </>
  )
}

export default App
