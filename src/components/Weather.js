import React, { useState } from 'react';
import Header from "./Header";
import { bg_img } from '../utils/constants';
import Button from '@mui/joy/Button';
import { useDispatch } from 'react-redux';
import { addWeather } from '../utils/weatherSlice';
import { useSelector } from 'react-redux';
import TempChart from './TempChart';

const Weather = () => {

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const wdata = useSelector(state => state.weatherData);


  const api = {
    key: "0851d814b3132464b92e4b99f71e283b",
    base: "https://api.openweathermap.org/data/2.5/"
  };

  const weatherData = async () => {
    const data = await fetch(`${api.base}forecast?q=${search}&units=metric&appid=${api.key}`)
    //  converting th data to json
    const json = await data.json();
    dispatch(addWeather(json));


  };


  return (
    <div>
      {/* background Image */}
      <div className="fixed -z-10">
        <img
          className='h-screen object-cover md:w-screen'
          src={bg_img}
          alt="bg image" />
      </div>
      <Header />
      {/* main Body */}

      {/*  */}
      <div className='flex justify-between md:justify-normal'>
        <div className="h-screen  flex items-center justify-center w-1/2">

          <div className=" w-4/5 mt-20  md:w-2/5  bg-opacity-70 bg-black text-white rounded-xl">
            {/* search Bar */}
            <div className="flex items-center justify-between   md:m-5 p-6 ">
              <input type="text"
                className="rounded-2xl w-full p-4 text-black text-bold"
                placeholder="Enter Location"
                onChange={(e) => setSearch(e.target.value)}

              />
              <Button variant='sucess'
                onClick={weatherData}
              >Search</Button>

            </div>

            {/* only if data is available */}

            {wdata?.cod == 404 ?
              <div className='flex justify-center' >Please Enter a valid city </div> :
              //  data load
              <div className='flex justify-center'>

                <div className=' items-center'>
                  {/* Temp */}
                  <div className="m-1 p-2 text-6xl text-center font-bold"  >
                    <h1>{wdata?.list[0]?.main?.temp}°C</h1>
                  </div>

                  {/* Location */}
                  <div className="m-2 p-2 flex text-3xl justify-center">
                    <h1>{wdata?.city?.name}</h1>
                  </div>

                  {/*  */}
                  <div className="text-center">
                    <div className="m-2 p-3 text-xl">
                      <p>Min Temp : {wdata?.list[0]?.main?.temp_min}°C</p>
                    </div>

                    <div className="m-1 p-2 text-xl">
                      <p> Max Temp : {wdata?.list[0]?.main?.temp_max}°C</p>
                    </div>
                  </div>

                  {/* Humidity  */}
                  <div className='text-center text-xl m-2 p-2'>
                    <p className='text-center'>Humidity: {wdata?.list[0]?.main?.humidity}</p>
                  </div>

                  {/* condition */}

                  <div className='m-2 p-6 text-xl text-center'>

                    <p>Weather can be describe as <span className="font-bold">{wdata?.list[0]?.weather[0]?.description}</span> and feels like {wdata?.list[0]?.main?.feels_like}°C</p>
                  </div>
                </div  >
                <div>
                  
                </div>



              </div>



            }


          </div>
        </div>
        { 
        <div className='w-1/2 '>
        <TempChart />
        </div>
        }
        </div>
        




    </div>
  )
}

export default Weather
