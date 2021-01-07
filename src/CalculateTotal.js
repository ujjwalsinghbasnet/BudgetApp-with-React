import React, { useEffect, useState } from 'react'
import { Card } from '@material-ui/core'

function CalculateTotal({total}) {
    const [budget, setbudget] = useState(2000)
    const totalBudget = JSON.parse(localStorage.getItem('budget')) || ''
    useEffect(()=>{
        setbudget(totalBudget)
    },[])
    const changeHandler = e => {
        setbudget(e.target.value)
    }
    const submitHandler = e => {
        e.preventDefault();
        setbudget(budget)
        localStorage.setItem('budget',JSON.stringify(budget))
        setTimeout(() => {
            e.target.childNodes[0].value = ''
            e.target.style.display = 'none'
        }, 0);
    }
    const displayForm = e => {
        document.getElementById('form').style.display = 'block'
    }
    return (
        <div style = {styleCard}>
            <Card style = {styleIndividualCard} className='totalBudget'>
                <h5 style = {{margin: 0}}>Total Budget</h5>
                <span className='editBtn' onClick={displayForm}><img src="https://img.icons8.com/android/24/000000/edit.png" alt='edit icon'/></span>
                <div className="total_income">Rs. {budget}</div>
                <form onSubmit={submitHandler} className='edit_form' id='form'>
                    <input name='editTotal' value = {budget} onChange={changeHandler}/>
                    <button type='submit'>Edit</button>
                </form>
            </Card>
            <Card style = {styleIndividualCard} className='totalExpense'>
                <h5 style = {{margin: 0}}>Total Expenses</h5>
                <div className = "calculated_total">Rs. {total}</div>
            </Card>
            <Card style = {styleIndividualCard} className='totalRemaining'>
                <h5 style = {{margin: 0}}>Remaining Balance</h5>
                <div className = "calculated_remaining">Rs. {budget - total}</div>
            </Card>
        </div>
    )
}
const styleCard = {
    position: 'relative',
    width: '100%',
    display: 'grid',
    height: '20vh',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '10px',
}
const styleIndividualCard = {
    display: 'grid',
    placeItems: 'center'
}
export default CalculateTotal
