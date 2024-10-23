import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from './Navbar';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import axiosInstance from '../axiosinterceptor';
const Add = () => {
  const navigate = useNavigate()
  const [form, setForm]=useState({
    employeeId : '',
    employeeName : '',
    designation : '',
    salary : '',
    department : '',
    employeeLocation : ''
    
  })
  const onInputChange = (e) => {
    setForm({ ...form,[e.target.name]: e.target.value });
  };
  const location = useLocation()
  let sendData=()=>{
    if(location.state!= null){
      axiosInstance.put('http://localhost:3000/employee/editEmployee/'+location.state.employee._id,form).then((res)=>{
        alert('Data updated');
        navigate('/home')
      }).catch((error)=>{
        console.log(error);
      })
    }
    else{
      axiosInstance.post('http://localhost:3000/employee/add',form).then((res)=>{
        navigate('/home')
      }).catch((error)=>{
        console.log(error)
      })
    }
  }
  useEffect(()=>{
    if(location.state!=null){
      setForm({...form,
        employeeId:location.state.employee.employeeID,
        employeeName:location.state.employee.employeeName,
        designation:location.state.employee.designation,
        salary:location.state.employee.salary,
        department:location.state.employee.department,
        employeeLocation:location.state.employee.location,
        

      })
    }
  },[])
  
  return (
    <>
    <Navbar/>
    <div>
       <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="id" variant="outlined" name="employeeId" value={form.employeeId} onChange={onInputChange} /><br />
      <TextField id="outlined-basic" label="Name" variant="outlined" name="employeeName" value={form.employeeName} onChange={onInputChange} /><br />
      <TextField id="outlined-basic" label="Designation" variant="outlined" name="designation" value={form.designation} onChange={onInputChange}/><br />
      <TextField id="outlined-basic" label="Salary" variant="outlined" name="salary" value={form.salary} onChange={onInputChange}/> <br />
      <TextField id="outlined-basic" label="Department" variant="outlined" name="department"  value={form.department} onChange={onInputChange}/> <br />
      <TextField id="outlined-basic" label="Location" variant="outlined" name="employeeLocation" value={form.employeeLocation} onChange={onInputChange}/> <br />

      <Button variant="contained" onClick={sendData}>Submit</Button>
      
    </Box>
    </div>
    </>
  )
}

export default Add