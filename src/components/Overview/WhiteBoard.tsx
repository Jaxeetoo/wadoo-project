import React from "react"
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

const WhiteBoard = () => {
  return (
    <div className="w-screen h-screen">
      <Tldraw persistenceKey="example"/>
    </div>
  )
}

export default WhiteBoard