import React, {useState,useEffect} from 'react'
import Main from './Main';
import './App.css'
import { Card } from '@material-ui/core'
import Graph from './Graph';
import EditForm from './EditForm';


function App() {
  const [state, setstate] = useState('')
  const [id,setId] = useState('')
  const [showModal,setShowModal] = useState(false)
  const [showEditModal,setEditShowModal] = useState(false)
  let total = 0;
  let total_price = 0;

  const listOfExpenses = JSON.parse(localStorage.getItem('expense'))  || [];

  useEffect(() => {
    setstate(listOfExpenses);
  },[])

  const addExpenseToList = (expense) => {
    setstate( state => [...state,expense])
    listOfExpenses.push(expense)
    localStorage.setItem('expense', JSON.stringify(listOfExpenses))
    setShowModal(false)
  }

  const deleteRow = async id =>{
    const arrayFromLocalStorage = await JSON.parse(localStorage.getItem('expense'));
    const filteredArray = arrayFromLocalStorage.filter(singleObj => singleObj.id !== id)
    setstate(filteredArray)
    localStorage.setItem('expense',JSON.stringify(filteredArray));
  }
  const editRow =  id => {
    setEditShowModal(true);
    setId(id)
  }
  const editExpense = (list) => {
    localStorage.setItem('expense',JSON.stringify(list));
    setstate(list)
  }
  const closeModal = () => {
    setEditShowModal(false)
    setShowModal(false)
  }
  if(state !== ''){
    total = state.map( single => total_price+Number(single.price)).reduce((prev,cur) => prev + cur,0)
  }
  return (
    <div className="App">
       <header className="App-header">
         Budget App
         <span className = 'add__btn' onClick={()=>{setShowModal(!showModal)}}>+</span>
       </header>
       <div className="app__content">
        <div className = 'app__left'>
          <Main data = {state} addExpenseToList = {addExpenseToList} closeModal={closeModal} deleteRow = {deleteRow} editRow = {editRow}total = {total} modalState = {showModal}/>
          {showEditModal ? <EditForm  statusModal = {showEditModal} closeModal={closeModal} id = {id} list = {listOfExpenses} editExpense={editExpense}/> : null}
        </div>
        <div className="app__right">
          <Card className="app__right__card">
            <h3 className='graph__heading'>Expenses in Graph</h3>
            <Graph graphInfo={state} />
          </Card>
        </div>
       </div>
    </div>
  )
}
export default App;
