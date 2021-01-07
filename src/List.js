import React from 'react'

function List(props) {
    const {id, title, price } = props;
    const deleteRow = () => {
        props.deleteRow(id)
    }
    const editRow = () => {
        props.editRow(id)
    }
    return (
        <div style = {{display: 'flex', flexDirection: 'row'}}>
            <h5 style = {{flex: 1}} id='title'>{title}</h5>
            <h6 id = 'price'>Rs. {price}</h6>
            <span className='btn' onClick={deleteRow}><img src="https://img.icons8.com/flat_round/64/000000/delete-sign.png" alt='delete icon'/></span>
            <span className='btn' onClick={editRow}><img src="https://img.icons8.com/android/24/000000/edit.png" alt='edit icon'/></span>
        </div>
    )
}

export default List
