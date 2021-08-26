
import {useState} from 'react';
import {useForm} from 'react-hook-form';

function EditUserModal(props) {

  const {handleSubmit,register} = useForm();

  const {id, firstName, lastName, email} = props.userData;

  const handleHideModal = ()=>{
    props.hideEditModal()
  }

  const handleData=(formData)=>{
    formData.id=id;
    handleHideModal()
    props.handleFormData(formData)
  }

  return(
    <div className="flex items-center justify-center h-screen inset-0 absolute bg-black bg-opacity-60">
        <div className="shadow-lg w-1/2 rounded-lg bg-gray-200">
            <div className="border-b border-gray-400">
              <div className="px-4 py-2 bg-gray-200 rounded-md shadow-lg"><button onClick={handleHideModal}>x</button></div>
            </div>
            <div className="relative p-4 items-center">
                <h1 className="p-2 m-2 text-center bg-gray-200 shadow-sm">{props.formHeadLing} : </h1>
                <form onSubmit={handleSubmit(handleData)}>
                  <label className="pl-2">First Name :</label>
                    <input {...register('firstName')} defaultValue={firstName} className='bg-transparent w-3/4 rounded-lg shadow-lg px-2 m-2 border-2 border-gray-100' 
                      placeholder="First Name..." required/><br/>
                  <label className="pl-2">Last Name :</label>
                    <input {...register('lastName')} defaultValue={lastName}  className='bg-transparent w-3/4 rounded-lg shadow-lg px-2 m-2 border-2 border-gray-100' 
                      placeholder="Last Name..." required/><br/>
                  <label className="pl-2">E-mail :</label>
                    <input {...register('email')} defaultValue={email}  className='bg-transparent w-3/4 rounded-lg shadow-lg px-2 m-2 border-2 border-gray-100' 
                      placeholder="E-mail Here..." required/> <br/>
                  <button className="px-2 py-1 bg-red-600 rounded-md shadow-md ml-4 my-2" 
                      onClick={handleHideModal}>Cancell</button>
                  <input type='submit' className="px-2 py-1 bg-green-600 rounded-md shadow-md mx-2 sm:mx-2 my-2 "/>
              </form>  
            </div>
            <div className="py-1 px-4 ml-2/4 w-full flex">

            </div>
        </div>
    </div>
    )

};
export default EditUserModal;
