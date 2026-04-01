import React from 'react'
import { useState, useEffect } from 'react'
function Time() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className='bg-blue-400 text-white w-full flex justify-center items-center '>
      <p>{time.toLocaleString('en-PK', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })}
      </p>
    </div>
  )
}

export default Time
