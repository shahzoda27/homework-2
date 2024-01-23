import React, { useState } from 'react'
import { Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from"moment";
const UserModal = ({open,toggle,user}) => {
    const [name, setName]= useState("")
    const [position, setPosition]= useState("")
    const [department, setDepartment]= useState("")
    const [gender, setGender]= useState("")
    const [date, setDate]= useState(new Date())
    const addUsers =(e)=>{
        e.preventDefault()
        let birth_date = moment(date).format("DD-MM-YYYY")
        let payload ={
           name,
           position,
           department,
           gender,
           birth_date
        }
        if (user !== "") {
            axios.patch(`http://localhost:8000/users/${user.id}`,{...payload}).then(res=>{
                console.log(res);
                if (res.status === 200) {
                    toggle()
                    window.location.reload()
                }
            })
        }else{
            axios.post('http://localhost:8000/users',{...payload}).then((res)=>{
                if (res.status === 201) {
                    window.location.reload()
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
        
    }
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1>Add User</h1>
      </ModalHeader>
      <ModalBody>
        <form id='users' onSubmit={addUsers}>
            <input type="text" defaultValue={user.name} placeholder='name' className='form-control my-2' onChange={(e)=>setName(e.target.value)}/>
            <input type="text" defaultValue={user.position} placeholder='position' className='form-control my-2' onChange={(e)=>setPosition(e.target.value)} />
            <select defaultValue={user.department} className='form-control my-2' onChange={(e)=>setDepartment(e.target.value)}>
                <option value="" hidden >Select department ...</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Accounting">Accounting</option>
            </select>
            <label htmlFor="male">Male</label>
            <input type="radio" id='male' value='male' onChange={(e)=>setGender(e.target.value)} name='gender'/>
            <label htmlFor="female">Female</label>
            <input type="radio" id='female' value='female' onChange={(e)=>setGender(e.target.value)} name='gender'/>
            <div>
            <DatePicker defaultValue={user.birth_date} dateFormat="dd-MM-yyyy" selected={date} onChange={(date) => setDate(date)} />
            </div>
        </form>
      </ModalBody>
      <ModalFooter>
        {
            user !== "" ?
            <button type='submit' form='users' className='btn btn-success'>Edit User</button> :
            <button type='submit' form='users' className='btn btn-primary'>Add User</button>

        }
      </ModalFooter>
    </Modal>
  )
}

export default UserModal
