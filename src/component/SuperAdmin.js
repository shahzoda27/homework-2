import React, { useEffect, useState } from 'react'
import UserModal from './UserModal'
import DeleteModal from './DeleteModal'
import axios from 'axios'
const SuperAdmin = () => {
  const [users, setUsers]= useState([])
  const [modalVisible, setModalVisible]= useState(false)
  const [deleteModal, setDeleteModal]= useState(false)
  const [id, setId]= useState()
  const [category, setCategory]= useState()
  const [user, setUser]= useState("")
  useEffect(()=>{
    axios.get(`http://localhost:8000/users`).then((res)=>{
      console.log(res);
     setUsers(res.data)
    }).catch(err=>{
      console.log(err);
    })
  },[])
  const filterUser = category ? users.filter(item=>item.department === category): users
  const openDeleteModal = (id)=>{
    setId(id)
    setDeleteModal(true)
  }
  const openEditModal = (item)=>{
   setUser({...item})
   setModalVisible(true)
  }
   const toggle = ()=>{
    setModalVisible(false)
    setUser('')
   }
   
   return (
     <div className='container'>
      <UserModal open={modalVisible} toggle={toggle} user={user}/>
      <DeleteModal open={deleteModal} toggle={()=>setDeleteModal(false)} user={user} id={id}/>
      <div className='row'>
      <div className='col-md-3'>     
      <select className='form-control my-2' onChange={(e)=>setCategory(e.target.value)}>
                <option value="" hidden >Select department ...</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Accounting">Accounting</option>
            </select>
      <button className='btn btn-info' onClick={()=>setModalVisible(true)}>Add user</button>
      </div>
          <div className="col-md-10 offset-2">
          <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Full Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Birth date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {
              filterUser.map((item,index)=>{
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.position}</td>
                <td>{item.gender ? "male" : "female"}</td>
                <td>{item.birth_date}</td>
                <td>
                  <button className='btn btn-info' onClick={()=>openEditModal(item)}>Edit</button>
                  <button className='btn btn-danger' onClick={()=>openDeleteModal(item.id)}>Delete</button>
                </td>
              </tr>
            })
           }
          </tbody>
        </table>
          </div>
      </div>
    </div>
  )
}

export default SuperAdmin
