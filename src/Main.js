import React,{useState} from 'react'
import { Container,Card, FormControl, Input, Button,InputAdornment,InputLabel, TextField } from '@material-ui/core'
import List from './List'
import CalculateTotal from './CalculateTotal';

function Main(props) {
    
    // total === undefined ? null : {<CalculateTotal total_expenses = {total}/>}
    let content ='';
    const deleteRow = id => {
        props.deleteRow(id)
    }
    const editRow = id => {
        props.editRow(id)
    }
    if(props.data !== ''){
     content = props.data.map( single => <Card key = {single.id} style = {{ marginTop: '10px',padding: '10px'}}><List  title={single.title} price={single.price} deleteRow={deleteRow} editRow={editRow} id = {single.id}/></Card>)
    }
    const addExpenseToList = (expense) => {
        props.addExpenseToList(expense)
    }
    const closeModal =()=> {
        props.closeModal();
    }
    return (
        <Container>
            <CalculateTotal total={props.total}/>
            {props.modalState ? <FormData addExpenseToList={addExpenseToList} closeModal = {closeModal}/>:null}
            {content}
        </Container>
    )
}

export function FormData(props) { 
    const [expense,setExpense] = useState({ title: '', price: '' });
    const priceRegExp = /^[0-9]/;
    
    const submitHandler = (e) => {
        e.preventDefault(); 
        if(priceRegExp.test(expense.price) === true && expense.title !== ''){
            setTimeout(setExpense({title:'',price:''}),2000 )
            const objectTOLocalStorage = {
                ...expense,
                id: Math.floor(Math.random()*100)
            }
            addExpenseToList(objectTOLocalStorage);
        } else {
            alert ('Please enter the valid data')
        }
    }
    const changeHandler = (e) => {
        setExpense({...expense,[e.target.name]: e.target.value})
    }
    const addExpenseToList = (objectTOLocalStorage) => {
        props.addExpenseToList(objectTOLocalStorage)
    }
    const closeModal = () => {
        props.closeModal()
    }
   
    return(
        <div className='modal'>
        <h2>Add your expense</h2>
        <form autoComplete = 'off' onSubmit = {submitHandler} style = {{marginTop: '1vh'}}>
            <TextField
                className='textarea'
                autoFocus
                style = {{marginRight: '10px'}}
                label="Expense Title"
                placeholder='Expense'
                value={expense.title}
                onChange={changeHandler}
                type="text"
                name="title"
                InputLabelProps={{
                    shrink: true,
                }}
                />
            <FormControl style = {{marginRight: '10px'}} className='input'>
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value = {expense.price} placeholder = "Expense cost" onChange = {changeHandler} name = 'price'
                    startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
                />
            </FormControl>
            <div className='buttons'>
                <Button variant = 'outlined' type = "submit" color = 'primary' className='edit'>Submit</Button>
                <Button variant = 'outlined' type = "submit" color = 'primary' onClick={closeModal}>Cancel</Button>
            </div>
        </form>
        </div>
    )
}

export default Main;
