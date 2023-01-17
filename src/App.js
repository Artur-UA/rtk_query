import { useState } from 'react';
import './App.css';
import {useGetFoodsQuery, useAddNewFoodMutation, useDeleteFoodMutation,usePatchFoodMutation} from './redux'

function App() {
  const [count, setCount] = useState('');
  const [foodName, setFoodName] = useState('');
  const {data = [], isLoading, isError} = useGetFoodsQuery(count); 

  const [addNewFood] = useAddNewFoodMutation(); 

  const onSavePostClicked = async () => {
    const canSave = [foodName].every(Boolean) && !isLoading; 
    if (canSave) {
      try {
        await addNewFood({name: foodName}).unwrap(); 
        setFoodName('');
      } catch (err) {
        console.error('Failed to save the post: ', err)
      }
    }
  }


  const [deleteFood] = useDeleteFoodMutation();
  const onDeleteFood = async(id) => {
    try {
      await deleteFood(id).unwrap();
    } catch (error) {
      console.error('Failed to delete the post: ', error)
    }
  }

  const [idChange, setIdChange] = useState('');
  const [textChange, setTextChange] = useState('');
  const [patchFood] = usePatchFoodMutation();
  
  const onPatchFood = async() => {
    try {
      await patchFood({ id: idChange, name: textChange}).unwrap();
    } catch (error) {
      console.error('Failed to delete the post: ', error)
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
      <div className="App App-header">
        <h2>Data is NOT loading</h2>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
  )}
  
  return (
    <div className="App App-header">
      <h2>Food list</h2>

      <div className="inputBlock">
        <input type='text' placeholder='Product' value={foodName} onChange={(e) => setFoodName(e.target.value)} />
        <button onClick={onSavePostClicked}>Add food</button>
      </div>

      <h4>{count}</h4>
      <select value={count} onChange={(e) => setCount(e.target.value)} >
        <option value=''>All</option>
        <option value='1'>1</option>
        <option value='5'>5</option>
        <option value='10'>10</option>
      </select>

      <ul>
      {
        data.map( food => {
          return <li key={food.id} >{food.id} {food.name}<label className='delete' onClick={ () => onDeleteFood(food.id)}>&times;</label></li>
        })
      }
      </ul>


      <h2>Change product</h2>
      <div className="inputBlock">
        <input type='number' min="1" max={data.length} placeholder="Number" onChange={(e) =>setIdChange(e.target.value)}/>
        <input type='text' placeholder='New name product' onChange={(e) => setTextChange(e.target.value)} />
        <button onClick={onPatchFood}>Change product</button>
      </div>

    </div>
  );
}

export default App;





