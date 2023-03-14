import { useEffect, useState } from 'react'
import './App.css'

import ThisIsFine from './memes/this_is_fine.png'
import LoveYourself from './memes/love_yourself.jpg'
import Code from './memes/code.jpg'

import BatteryStatus from './BatteryStatus'
import Timer from './Timer'

function App() {
  const [images, setImages] = useState([])
  const [title, setTitle] = useState('Images')
  const [timerSpeed, setTimerSpeed] = useState(1000)

  useEffect(() => {
    //   console.log(images)
    window.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      left: 0,
      behavior: 'smooth'
    })
  }, [images])



  useEffect(() => {
    document.title = title + images.length




  }, [title, images])


  const handleAddImage = (src) => {
    setImages([...images, {
      id: self.crypto.randomUUID(),
      src
    }])
  }

  const handleDeleteImage = (id) => {
    setImages(images.filter(image => image.id !== id))
  }

  return (
    <div className="App">

      <h1>{title}</h1>

      <BatteryStatus />

      <Timer interval={timerSpeed} />
      <button onClick={() => setTimerSpeed(timerSpeed - 100)}>faster</button>
      <button onClick={() => setTimerSpeed(timerSpeed + 100)}>slower</button>

      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => setTitle("")}>clear title</button>

      {images.map(({ id, src }) => (
        <img onClick={() => handleDeleteImage(id)} key={id} src={src} alt="random" />
      ))}

      <div className="buttons">
        <button onClick={() => handleAddImage(ThisIsFine)}>
          This is fine
        </button>

        <button onClick={() => handleAddImage(LoveYourself)}>
          Love yourself
        </button>

        <button onClick={() => handleAddImage(Code)}>
          Code
        </button>
      </div>

    </div>
  )
}

export default App
