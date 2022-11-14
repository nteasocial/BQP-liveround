import React, {useState, useEffect} from 'react';
import './App.css';
import ToDoList from './components/TodoList.jsx';

const getLocalStorageList = () => {
  let storedList = localStorage.getItem('list');
  if (storedList) {
    return JSON.parse(storedList);
  }
  else {
    return []
  }
}

function App() {
  const [data, setData] = React.useState('');
  const [list, setList] = useState(getLocalStorageList());
  const [toggle, setToggle] = useState(true);
  const [edit, setEdit] = useState(null)

  const handleInputData = (e) => {
    setData(e.target.value);
  }

  const handleAddedItems = () => {
    if (!data) {
      alert('write your todo !!!!')
    }
    else if (data && !toggle) {
      setList((e) => {
        list.map((e) => {
          console.log(e)
          return {...e, edit}
        })
        return e
      })
      setList('');
      setToggle(true);
      setEdit(null)
    }
      
    else {
      const allDataInputList = {id: new Date().getTime().toString(), text: data}
      setList((pastData) => {
        return [...pastData, allDataInputList]
      })
      setData('')
    }
  }
  
  const editTodo = (id) => {
    const newList = list.find((i) => {
      return i.id === id
    })
    setList(newList);
    setToggle(false);
    setEdit(id)
  }

  const handledelTodo = (id) => {
    setList(() => {
      return list.filter((arr, i) => {
       return i.id !== id
     })
   })
  }

  const removeAll = () => {
    setList([]);
  }

  //to the localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  

  return (
    <div className="App">
      <h1>Hey there</h1>
      <h1>Todo List</h1>
      <input type='text' placeholder='write your todo here' className='input' onChange={handleInputData} value={ data} />
      {toggle ? <button className="add" onClick={handleAddedItems}> + </button> : <button className="add" onClick={handleAddedItems}> Update </button>}
      <button className="remove" onClick={removeAll}> Remove All </button>
      <ul>
        {list.map((i) => {
          return <ToDoList text={i.text} key={i.id} id={i.id} onSelect={handledelTodo} onButton={editTodo} />
        })}
      </ul>
    </div>
  );
}

export default App;
