import {useCallback} from 'react';
import {getTaskList}  from 'utils/FetchTaskList.js';  

function SearchBar({updateTaskList}) {

  const handleChange = (value)=>{
    const taskList = getTaskList();
      let newTaskList = taskList.filter(function(task){
        return (task.firstName.toLowerCase().indexOf(value.toLowerCase()) >-1 
            || task.lastName.toLowerCase().indexOf(value.toLowerCase())) >-1 });
        updateTaskList(newTaskList)
    }

  const debounce = (func)=>{
    let timer;
    return function(...args){
      const context = this;
      if(timer)clearTimeout(timer);
      timer = setTimeout(()=>{
        timer=null;
        func.apply(context,args);
      },500);
    }
  }

  const optimizedFn = useCallback(debounce(handleChange),[]);

  return (
    <>
      <label className='pl-4 py-1 h-14 ml-16 mt-8 bg-blue-500 rounded-l-sm'>Search</label>
      <input  type='text' onChange={(e)=>optimizedFn(e.target.value)} 
        placeholder='Search User' 
        className="pr-2 border-2 h-12 mt-8 rounded-xl shadow-sm m-1 w-1/3"/>
    </>
  );
}

export default SearchBar;