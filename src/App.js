import './App.css';
import {useState,useEffect,useRef} from 'react'
import React from 'react'
import { useTable } from 'react-table'
import { confirmAlert } from 'react-confirm-alert';
import TaskTable from 'components/TaskTable.js'
import AddUserModal from 'components/AddUserModal.js'
import EditUserModal from 'components/EditUserModal.js'
import {getTaskList,taskColumns,confirmDelet,addNewTask}  from 'utils/FetchTaskList.js';  
import SearchBar from 'components/SearchBar.js'

function App() {

  const [taskList, setTaskList] = useState([])
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const currentUserData = useRef({})

  useEffect(()=>{
    const taskList = getTaskList();
    setTaskList(taskList)
  },[])
    
  const columns = React.useMemo( () => taskColumns(),[])
    
  const handleDelete = row=> {
    if(window.confirm('Are You Sure To Do This?')){
    const taskId = row.values.id
    const oldTaskList = getTaskList();
    const newTaskList = oldTaskList.filter(task => task.id !== taskId);
    localStorage.setItem('taskList',JSON.stringify(newTaskList));
    const newStateTaskList = taskList.filter(task => task.id !== taskId);
    setTaskList(newStateTaskList)
    }
  };

  const handleEdit = row =>{
    currentUserData.current = row;
    setShowEditUserModal(true)
  }

  const handleAdd = () =>{
    setShowAddUserModal(true)
  }

  const hideAddModal = () =>{
    setShowAddUserModal(false)
  }

  const hideEditModal = () =>{
    setShowEditUserModal(false)
  }

  const addNewUser = (userFormData)=>{
    const id = taskList.length === 0? 1: taskList.slice(-1)[0].id+1;
    //const id = taskList.slice(-1)[0].id+1;
    userFormData.id=id;
    addNewTask(userFormData)
    setTaskList(getTaskList())
  }

  const editUser = (editFormData)=>{
    const index = currentUserData.current.id;
    const oldUserData = getTaskList()
    oldUserData[index] = editFormData
    console.log(oldUserData)
    localStorage.setItem('taskList',JSON.stringify(oldUserData));
    setTaskList(oldUserData)
  }
    
  return (
    <div className='w-full items-center justify-center h-screen mx-24 px-4'>
      <SearchBar  updateTaskList = {newTaskList=>setTaskList(newTaskList)}/>
      <button className='px-4 py-1  mx-4 bg-blue-500 rounded-sm' onClick={handleAdd}>Add</button>
      <TaskTable taskList={taskList} handleDelete={handleDelete} handleEdit={handleEdit} columns={columns}/>

      {showAddUserModal? (<AddUserModal formHeadLing = {'Add New User'} handleFormData={(addFormData)=>addNewUser(addFormData)}  hideAddModal = {hideAddModal}/> ) : null}
      {showEditUserModal? (<EditUserModal formHeadLing = {'Edit User Details'} userData = {currentUserData.current.values}  handleFormData={(editFormData)=>editUser(editFormData)}  hideEditModal = {hideEditModal}/> ) : null}
    </div>
  )};

  export default App;


