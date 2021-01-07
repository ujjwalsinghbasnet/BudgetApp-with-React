 import { Button, FormControl, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
 
 function EditForm(props) {
    const priceRegExp = /^[0-9]/;
    const {id,list} = props;
    console.log(id)
    const submitHandler = (e) => {
        e.preventDefault(); 
        if(priceRegExp.test(expense.price) === true && expense.title !== ''){
            setTimeout(setExpense({title:'',price:''}),2000 )
            const single = list.find(single => single.id === id)
            single.title = expense.title;
            single.price = expense.price;
            props.editExpense(list)
            closeModal()
        } else {
            alert ('Please enter the valid data')
        }
    }
    const fetchJSON = () => {
        const arrayFromLocalStorage =  JSON.parse(localStorage.getItem('expense'));
        const filteredArray =  arrayFromLocalStorage.filter(singleObj => singleObj.id === id)
        setExpense(filteredArray[0])
    }
    useEffect(()=>{
        fetchJSON()
    },[])
    const [expense,setExpense] = useState({ title: '', price: '' });
    const changeHandler = (e) => {
        setExpense({...expense,[e.target.name]: e.target.value})
    }
   const closeModal = () => {
       props.closeModal();
   }
    return(
        <div className='modal'>
        <h2>Edit your expense</h2>
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
                <Button variant = 'outlined' type = "submit" color = 'primary' className='edit'>Edit</Button>
                <Button variant = 'outlined' onClick={closeModal} color = 'primary'>Cancel</Button>
            </div>
        </form>
        </div>
    )
}
export default EditForm