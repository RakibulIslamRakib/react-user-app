import {useState,useEffect,useMemo} from 'react'
import React from 'react'
import { useTable,usePagination } from 'react-table'
//import AddEditForm from 'components/AddFormModal.js'

function TaskTable({taskList,columns,handleDelete,handleEdit}) {

  const tableInstance = useTable({ columns, data:taskList ,initialState:{pageIndex:0} },usePagination)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance


  const {pageIndex,pageSize} = state;
  
  return (
    <div className='h-auto w-full content-center m-2 p-4'>
      <table className='w-11/12' {...getTableProps()} >
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()} className='px-4 py-2 m-2 border-2'>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()} className='px-4 py-2 m-2 border-2'>
                  {// Render the header
                  column.render('Header')}
                </th>
              ))}
              <th className='p-2 w-32  ontent-center  my-1 border-2 items-center'>Action</th>
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          page.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()} className='px-4 py-2 m-2 border-2'>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()} className='px-4 py-2 m-2 border-2 items-center'>
                      {// Render the cell contents
                      cell.render('Cell')}
                    </td>
                  )
                })}
                <td ><button className='px-2  items-center py-1 ml-2 bg-blue-500 rounded-sm sm' onClick={()=>handleEdit(row)}>Edit</button>
                <button className='px-2 py-1 mr-2 mx-1 bg-red-500 rounded-sm sm text-gray-300' onClick={()=>{handleDelete(row)}}>Delet</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {taskList.length?
        (
        <div className='w-10/12 mx-8 mt-4 mb-16 p-2 bg-gray 200 shadow-md rounded-sm'>
          <span className=''>
            Page{' '}
            <strong>{pageIndex+1} of {pageOptions.length}</strong>{' '}
          </span>
          <span>
            | Go To Page:{' '}
            <input className='w-16' type='number' defaultValue={pageIndex+1} onChange={(e)=>{
              const pageNumber = e.target.value? Number(e.target.value)-1:0
              gotoPage(pageNumber)
            }}/>
            <select  value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
              {
                [10,25,50].map(pageSize=>(
                  <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                ))
              }
            </select>
          </span>
          <button className='px-2 mx-1 py-1 bg-gray-100 rounded-md shadow-md' onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
          <button className='px-2 mx-1 py-1 bg-gray-100 rounded-md shadow-md' onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button className='px-2 mx-1 py-1 bg-gray-100 rounded-md shadow-md' onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
          <button className='px-2 mx-1 py-1 bg-gray-100 rounded-md shadow-md' onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>  
        </div> 
        ):null}
    </div>
  )};

  export default TaskTable;


