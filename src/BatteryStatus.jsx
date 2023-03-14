import {useState, useEffect} from 'react'

navigator.getBattery = () => Promise.reject('not supported')

export default function BatteryStatus() {
  
  const {batteryStatus, error} = useBatteryStatus()
  
  return (
    <div>
      {error ? 
        
        <p>{error}</p>

        :
        <>
      <h1>Battery Status</h1>
      <p>{batteryStatus}</p>
      </>
}
    </div>
  )
}


function useBatteryStatus() {
  const [batteryStatus, setBatteryStatus] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    let cleanup
    let canceled = false
    setError("")
    ;(async () => {
      let battery
      try {
        battery = await navigator.getBattery()
      } catch (err) {
        if (canceled) return
        setError(err)
        return
      }
      

      if (canceled) return
      setBatteryStatus(battery.charging ? 'Charging': 'Not Charging')
      const eventListener = battery.addEventListener('chargingchange', () => {
          setBatteryStatus(battery.charging ? 'Charging': 'Not Charging')
      })

      cleanup = () => {
        battery.removeEventListener('chargingchange', eventListener)
      }
    })()

    return () => {
      canceled = true
      if (!cleanup) {
        return
      }
      cleanup()
    }
  }, [])

  return {batteryStatus, error}
}