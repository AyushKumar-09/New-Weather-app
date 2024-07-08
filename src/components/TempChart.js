import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ApexCharts from 'apexcharts'

const TempChart = () => {

    const wdata = useSelector(state => state.weatherData);


        let temp = [];
    if (wdata && wdata?.list) {
        temp = [
            wdata?.list[1]?.main.temp,
            wdata?.list[6]?.main.temp,
            wdata?.list[14]?.main.temp,
            wdata?.list[22]?.main.temp,
            wdata?.list[30]?.main.temp,
            wdata?.list[38]?.main.temp
        ];
    }

const generate7DaysArray = () => {
    let daysArray = [];
    let currentDate = new Date();

    for (let i = 0; i < 7; i++) {
        let date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        let formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        daysArray.push(formattedDate);
    }
    return daysArray;
    };

console.log(generate7DaysArray());

var options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: temp
    }],
    xaxis: {
      categories: generate7DaysArray()
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();


   
}

export default TempChart
