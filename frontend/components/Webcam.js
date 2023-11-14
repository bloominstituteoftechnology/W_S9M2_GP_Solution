import React, { useEffect, useRef } from 'react'

export default function Webcam() {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const launchVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        video.srcObject = stream
        const captureFrame = () => {
          ctx.drawImage(video, 0, 0, canvas.width / 18, canvas.height / 18)
          ctx.drawImage(canvas, 0, 0, canvas.width / 18, canvas.height / 18, 0, 0, canvas.width, canvas.height)
          requestAnimationFrame(captureFrame)
        }
        captureFrame()
      } catch (error) {
        console.error('Error accessing the webcam: ', error)
      }
    }
    launchVideo()
  }, [])
  return (
    <div className="widget">
      <video style={{ display: 'unset' }} ref={videoRef} autoPlay />
      <canvas ref={canvasRef} width='640' height='480' />
    </div>
  )
}
