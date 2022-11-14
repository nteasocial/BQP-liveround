import React from 'react';
import './TodoList.css'

function TodoList(props) {
 return ( <div className='todo'>
   <button className='del' onClick={() => props.onSelect(props.id)}> Delete Todo </button>
   <button className='edit' onClick={() => {
     props.onButton(props.id)
   }}>Edit Button</button>
   <li className='listedItems'>{props.text}</li>
   
 </div>
 )
}

export default TodoList;