

export const getTaskList = ()=>{
    if(localStorage.getItem('taskList') === null){
        localStorage.setItem('taskList', '[]');
    };
    let tasksList = JSON.parse(localStorage.getItem('taskList'));
    return tasksList;
}

export const addNewTask = (newTask)=>{
  let oldTasks = JSON.parse(localStorage.getItem('taskList'));
  oldTasks.push(newTask);
  localStorage.setItem('taskList',JSON.stringify(oldTasks));
}


export const taskColumns =()=>[
  {
    Header: 'ID',
    accessor: 'id', // accessor is the "key" in the data
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'E-mail',
    accessor: 'email',
  },
]
