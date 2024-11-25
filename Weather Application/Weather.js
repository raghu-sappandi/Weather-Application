
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './Weather.css'

const APIKey='ksj2xeXELnJ9wi84bRJxUQ4dRieldHqe'
function Weather() {
    const[city,setCity]=useState("")
    const[weatherdata,setWeatherdata]=useState(null)
    const[error,setError]=useState(null)

    useEffect(() => {
      fetchWeatherByGeolocation();
    }, []);
  
    const fetchWeatherByGeolocation = async () => {
      try {
    // Get user's current position using Geolocation API
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;
     const response = await axios.get(
`https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${APIKey}`
          );
          console.log(response.data)
          setWeatherdata(response.data);
          setError(null);
        });
      } catch (error) {
        setError('Failed to fetch weather data');
        setWeatherdata(null);
      }
    };
  

    const handleSubmit=async () => {
        try {
          const response = await axios.get(
 `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${APIKey}`
          );
          setWeatherdata(response.data);
          setError(null);
        } catch (error) {
          setError('Failed to fetch weather data');
          setWeatherdata(null);
        }
      };
    console.log(weatherdata)
    // console.log(error)
  return (
    <>
    
  <div className='container'>

<div className='inputContainer'>
<input type='text' placeholder='Enter City Name'
 className='input'
 onChange={(e)=>setCity(e.target.value)}/>
<button className='button' onClick={handleSubmit}><b>Search</b>
</button>
</div>
{error&&<h1 className='error'><b>{error}</b></h1>}
{weatherdata&&(
    <div className='weatherContainer'>
       <b> <h2 className='subtitle'>{weatherdata.location.name}</h2>
 <p className='temperature'>Temperature:{weatherdata.data.values.temperature}<sup>o</sup>C</p>
        <p className='humidity'>Humidity:{weatherdata.data.values.humidity}%</p>
        <p className='windspeed'>Wind Speed:{weatherdata.data.values.windSpeed}mph</p>
        <p className='windspeed'>wertyuiuytrewqwerthgesx{weatherdata.data.values.Weather}</p></b>
    </div>
)}
  </div>
    </>
  )
}
export default Weather

