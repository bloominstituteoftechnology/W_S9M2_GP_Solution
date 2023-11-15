import React, { useEffect, useRef, useState } from 'react'

export default function Timeout({ timeoutSeconds = 3 }) {
  const [isVisible, setIsVisible] = useState(true)
  const secondsRef = useRef()

  useEffect(() => {
    secondsRef.current = 0
    const id = setInterval(() => {
      secondsRef.current++
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const handleClick = () => {
    console.log(secondsRef.current)
    if (secondsRef.current >= timeoutSeconds) setIsVisible(false)
  }

  return (
    <div className="widget">
      {isVisible
        ? <div>
          <button onClick={handleClick}>Do stuff with the page</button>
        </div>
        : <div>
          Please log back in
        </div>}
    </div>
  )
}
