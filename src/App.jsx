import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState(null)
  const [data, setData] = useState(null)
  const input = useRef()
  const url = "https://api.openweathermap.org/data/2.5/weather"
  const key = "cb3b42cd3486300adf7dbf88cdbe5d5d"

  useEffect(() => {
    const fechData = async () => {
      const responce = await fetch(`${url}?q=${city}&appid=${key}&lang=az&units=metric`)
      const d = await responce.json()
      setData(d)
    }
    city && fechData()
  }, [city])

  useEffect(() => {
    data && console.log(data);
  }, [data])

  return (
    <section>
      <div style={{ backgroundImage: "url('../public/img/ce91dbc9-2437-471d-9ec2-0c2237974f70-baku-photo.jpg')" }} className='w-full md:w-[1250px] mx-auto h-screen bg-cover'>
        <div className='flex flex-col items-center bg-black/[.4] h-screen py-8'>
          <h2 className='text-orange-300 text-7xl font-semibold drop-shadow-lg'>Hava</h2>
          <input ref={input} onKeyDown={(e) => { e.key === "Enter" && (setCity(e.target.value), input.current.value = "") }} type="text" placeholder='Şəhər daxil edin' className='p-2 bg-transparent outline-none border-b-2 border-b-orange-300 text-white text-center my-2' />
          {data &&
            <>
              <h2 className='text-white text-4xl my-3'>{data.name}, {data["sys"].country}</h2>
              <p className='drop-shadow-lg text-white text-[86px] font-semibold'>{data["main"].temp.toFixed()}°C</p>
            </>
          }
        </div>
      </div>
    </section>
  )
}

export default App
