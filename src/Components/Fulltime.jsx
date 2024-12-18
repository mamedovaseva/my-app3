import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./Fulltime.css"
function Fulltime() {
    const [time,setTime]=useState("")
   
    useEffect(()=>{
          const time=()=>{
        let now=new Date()
        let hours=now.getHours()
        let minutes=now.getMinutes()
        let second=now.getUTCSeconds()
        let formatTime = `${String(hours).padStart(2, '0')}   ${String(minutes).padStart(2, '0')}   ${String(second).padStart(2, '0')}`;
        setTime(formatTime);
    }
    time()
    const interval = setInterval(time, 1000);

    })
  return (
    <p className='time'>{time}</p>
  )
}

export default Fulltime