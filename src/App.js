import './App.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { exportComponentAsPNG } from "react-component-export-image";
// import { SketchPicker } from 'react-color'
import { HexColorPicker } from "react-colorful";


function App() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  // const [undoSteps, setUndoSteps] = useState({});
  // const [redoStep, setRedoStep] = useState({});
  // const [undo, setUndo] = useState(0);
  // const [redo, setRedo] = useState(0);

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const [brushColor, setBrushColor] = useState("#03a9f4")
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [lineWidth, setLineWidth] = useState(10)
  const [backgroundColor, setBackgroundColor] = useState('#fff')

  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = brushColor;
      ctx.current.lineWidth = lineWidth;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({
        x,
        y
      });
    }

  }, [lastPosition, mouseDown, brushColor, setPosition])


  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    setMouseDown(true)
  }

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }

  const onMouseUp = (e) => {
    setMouseDown(false)
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  // const changeColor = (color) => {
  //   setBrushColor(color.hex)
  // }

  return (
    <div className="container">
      {/* <h1>draw</h1> */}
      <canvas
        id="canvas"
        style={{
          border: "1px solid #fff",
          background: backgroundColor,
          border: "1px solid deepgray",
          width: `${window.innerWidth * 0.8}px`
        }}
        width={window.innerWidth * 0.8}
        height={window.innerHeight}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      />
      <div className="sidebar">
        {/* <SketchPicker color={brushColor} onChangeComplete={changeColor} width={window.innerWidth * 0.18} /> */}
        <HexColorPicker color={brushColor} onChange={setBrushColor} />

        <div className="color-picker">
          <button style={{ background: brushColor }} className="btn-color-display"></button>
          <button style={{ background: "#D0021B" }} onClick={() => setBrushColor("#D0021B")} className="btn-color"></button>
          <button style={{ background: "#f5a623" }} onClick={() => setBrushColor("#f5a623")} className="btn-color"></button>
          <button style={{ background: "#4caf50" }} onClick={() => setBrushColor("#4caf50")} className="btn-color"></button>
          <button style={{ background: "#03a9f4" }} onClick={() => setBrushColor("#03a9f4")} className="btn-color"></button>
          <button style={{ background: "#9900ef" }} onClick={() => setBrushColor("#9900ef")} className="btn-color"></button>
          <button style={{ background: "#555555" }} onClick={() => setBrushColor("#555555")} className="btn-color"></button>
          <button style={{ background: "#fff" }} onClick={() => setBrushColor("#fff")} className="btn-color"></button>
        </div>
        <div className="brush">
          <span>Brush size</span>
          <input type="range" min="1" max="70" defaultValue="10" className="brushwidth" onChange={(e) => { setLineWidth(e.target.value) }} />
        </div>

        <button onClick={() => setBackgroundColor(brushColor)} className="btn-bg">Set Background Color</button>

        {/* <button onClick={() => setBackgroundColor("white")} className="btn-bg">Reset background</button> */}

        <button onClick={clear} className="btn-clear">Clear</button>
        <br />
        <button onClick={() => exportComponentAsPNG(canvasRef)} className="btn-export">Export as PNG</button>
      </div>
    </div >
  )

}


export default App;
