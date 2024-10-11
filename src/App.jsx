import { useState, useRef, useEffect } from 'react'
import { FaSquareMinus, FaSquarePlus, FaPlay, FaPause, FaRotate } from "react-icons/fa6";
import { useCountdown } from './hooks/useCountdown';
import './App.css'

function App() {
  const initialbreak = 5;
  const initialSession = 25
  const [ breakTime , setBreakTime ] = useState(initialbreak);
  const [ sessionTime , setSessionTime ] = useState(initialSession);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReset, setIsReset ] = useState(true);
  const audioRef = useRef(null);

  const playBeep = () => {
    audioRef.current.play();
    


    
  }

  const handleReset = () => {
    setBreakTime(initialbreak);
    setIsPlaying(false);
    setSessionTime(initialSession);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsReset(prev => !prev)
    
  }

  const {seg, min, sessionActive, sessionTimeFinal, breakTimeFinal} = useCountdown(sessionTime,breakTime, isPlaying, playBeep, isReset);
  
  

  const handleIncrementDecrement = (event) => {
    const value = event.currentTarget.value;
    
    switch (value) {
      case "break-plus":
        
      if (breakTime < 60 && !isPlaying ) setBreakTime(prev => prev + 1);
      if (breakTime < 0) setBreakTime(prev => prev*(-1));
        break;
      case "break-minus":
        if (breakTime > 1 && !isPlaying) setBreakTime(prev => prev - 1);
        if (breakTime < 0) setBreakTime(prev => prev*(-1));
        break;
      case "session-plus":
        if (sessionTime < 60 && !isPlaying ) setSessionTime(prev => prev + 1);
        if (sessionTime < 0) setSessionTime(prev => prev*(-1));
        break;
      case "session-minus":
        if (sessionTime > 1 && !isPlaying ) setSessionTime(prev => prev - 1);
        if (sessionTime < 0) setSessionTime(prev => prev*(-1));
        break;
      default:
        console.log("returning default")
        return null;
      
    }
  }

  

  

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <div className='break-session-wrapper'>
        <div id="break-wrapper">
          <h3 id="break-label">Break Length</h3>
          <div id="counter-break-wrapper">
            <button id="break-decrement" value={`break-minus`} onClick={(e) => handleIncrementDecrement(e)} ><FaSquareMinus id="minus-icon" /></button>
            <p id="break-length">{breakTime}</p>
            <button id="break-increment" value={`break-plus`} onClick={(e) => handleIncrementDecrement(e)}><FaSquarePlus id="plus-icon"/></button>
          </div>
        </div>
        <div id="session-wrapper">
          <h3 id="session-label">Session Length</h3>
          <div id="counter-session-wrapper">
            <button id="session-decrement" value={"session-minus"} onClick={(e) => handleIncrementDecrement(e)}><FaSquareMinus id="minus-icon" /></button>
            <p id="session-length">{sessionTime}</p>
            <button id="session-increment" value={"session-plus"} onClick={(e) => handleIncrementDecrement(e)}><FaSquarePlus id="plus-icon" /></button>
            
          </div>
        </div>
      </div>
      <div className='timer-wrapper'>
        <h3 id="timer-label">{sessionActive ? `Session` : `Break`}</h3>
        <div id="time-left">
         {`${min < 10 ? `0${min}` : min }:${seg < 10 ? `0${seg}` : seg }`}
        </div>
        <div id="btn-wrapper">
          <button id="start_stop" onClick={() => {
              setIsPlaying(prev => !prev)
              
            }}>{ isPlaying ? <FaPause id="pause-icon"/> : <FaPlay id='play-icon'/> }</button>
          <button id="reset" onClick={ handleReset } ><FaRotate id="reset-icon" /></button>

        </div>
        <audio id="beep" preload="auto" ref={audioRef} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" />
      </div>


      
      
    </>
  )
}

export default App
