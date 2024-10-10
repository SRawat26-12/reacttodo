import {useSelector,useDispatch} from "react-redux";
import { addTask,recDelete,taskComplete,taskUnComplete,editDataSave } from "./todoSlice";
import { useState } from "react";
const App=()=>{
  const[mytsk,setMytsk]=useState("");
  const [edBtn,setEdbtn]=useState(true);
  const [edId,setEdId]=useState("");
  const mywork=useSelector((state)=>state.todo.task);
  const dispatch=useDispatch();
  console.log(mywork);
  let sno=0;
  const delTask=(id)=>{
    dispatch(recDelete(id))
  }
  const taskComp=(id)=>{
    dispatch(taskComplete(id))
  }
  const taskUncomp=(id)=>{
    dispatch(taskUnComplete(id))
  }
  const dataEdit=(id,data)=>{
    setMytsk(data)
    setEdbtn(false)
    setEdId(id)
  }
  const editSave=()=>{
    dispatch(editDataSave({id:edId,data:mytsk}))
    setEdbtn(true)
    setMytsk("")
  }
  const ans=mywork.map((key)=>{
    sno++;
    return(
      <tr>
        <td>{sno}</td>
        <td> {key.status? <span style={{color:"red", textDecoration:"line-through"}}> {key.data}</span>  :  key.data}</td>
        <td> <button  style={{backgroundColor:"blue" ,color:"white"}}onClick={()=>{delTask(key.id)}}>Delete</button> </td>
        <td>  
            
            {key.status?(
                
                <button style={{backgroundColor:"red" ,color:"white"}}onClick={()=>{taskUncomp(key.id)}}> Uncomplete</button>

            ) : (
              <button style={{backgroundColor:"green" ,color:"white"}} onClick={()=>{taskComp(key.id)}}>Complete</button> 
            )}
            
            </td>
            <td>
              <button  style={{backgroundColor:"brown" ,color:"white"}} onClick={()=>{dataEdit(key.id, key.data)}}> Edit</button>
            </td>
      </tr>
    )
  })
  return(
    <>
    <h1 style={{backgroundColor:"green",padding:"20px"}}>Todo List</h1>
    <h1>Enter your task:</h1>< input type="text" value={mytsk} style={{border:"1px solid black"}} onChange={(e)=>{setMytsk(e.target.value)}}/>
    {edBtn?(
         <button style={{backgroundColor:"black",color:"white",padding:"10px"}} onClick={()=>{dispatch(addTask({id:Date.now(), data:mytsk, status:false}))}}>add</button>
    ):(
       
       <button style={{backgroundColor:"black",color:"white",padding:"10px"}} onClick={editSave}>Edit Save</button>

    )}  
    <hr size="6" color="red"/>
    <table width="600px" border="3px solid black">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
    </table>
    </>
  )
}
export  default App;