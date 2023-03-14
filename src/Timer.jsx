import { useState, useEffect } from 'react'

export default function Timer({interval}) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      console.log('tick', interval)
      setTime(t => t + 1)
    }, interval)

    const cleanup = () => {
      clearInterval(id)
    }

    return () => {
      console.log("cleanup")
      cleanup()
    }
  }, [interval])
  
  return (
    <div>
      <h1>Timer</h1>
      <p>{time}</p>
    </div>
  )
}

