import React from 'react'
import {Pie} from 'react-chartjs-2';

function Graph({graphInfo}) {
    
    let title,price;
    if(graphInfo){
        title = graphInfo.map(single=>single.title)
        price = graphInfo.map(single=>single.price)
    }

    const data = {
        labels: title,
        datasets: [{
            data: price,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FFDF56',
            '#f59b42',
            '#42f5ce',
            '#f54266',
            '#42f569',
            '#4281f5'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FFDF56',
            '#f59b42',
            '#42f5ce',
            '#f54266',
            '#42f569',
            '#4281f5'
            ]
        }]
    };
    return (
        <div style={{display: 'grid',placeItems: 'center'}}>
            <Pie data = {data}/>
        </div>
    )
}

// const colorGenerator = () => {
//     const colorChar = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
//     let colorCombo = '#';
//     for(let i = 0; i < 6; i++){
//         colorCombo = colorCombo.concat(colorChar[Math.floor(Math.random()*colorChar.length)])
//     }
//     return colorCombo;
// }
export default Graph
