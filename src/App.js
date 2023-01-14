import { useState } from 'react';
import './App.css';
import {useGetFoodsQuery, useAddNewFoodMutation} from './redux'

function App() {
  const [count, setCount] = useState('');
  const [foodName, setFoodName] = useState('');
  const {data = [], isLoading, isError} = useGetFoodsQuery(count); // хук вызовет запрос к серверу. get по данным в foodApi   || передается в вызов useQuery число, которое потом достаю в foodApi.js в параметре limit 

  const [addNewFood] = useAddNewFoodMutation(); // возвращает массив, делает запрос по необходимости
  //const [addNewPost, { isLoading }] = useAddNewPostMutation()


  const onSavePostClicked = async () => {
    const canSave = [foodName].every(Boolean) && !isLoading; // проверка на сохранение
    if (canSave) {
      try {
        await addNewFood({name: foodName}).unwrap(); // unwrap нужен для коректной работи props по тим isLoading 
        setFoodName('');
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }

  if(isLoading){
    return (
      <div className="App">
        <header className="App-header">
          <h2>Data is loading</h2>
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </header>
      </div>
  )}

  if(isError){
    return (
      <div className="App">
        <header className="App-header">
          <h2>Data is NOT loading</h2>
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </header>
      </div>
  )}
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Food list</h2>


        <input type='text' value={foodName} onChange={(e) => setFoodName(e.target.value)} />
        <button onClick={onSavePostClicked}>Add food</button>

        <h2>{count}</h2>
        <select value={count} onChange={(e) => setCount(e.target.value)} >
          <option value=''>All</option>
          <option value='1'>1</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
        </select>

        <ul>
        {
          data.map( food => {
            return <li key={food.id}>{food.name}</li>
          })
        }
        </ul>
      </header>
    </div>
  );
}

export default App;
