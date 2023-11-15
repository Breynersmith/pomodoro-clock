import  { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [running, setRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
    setRunning(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const startStop = () => {
    setRunning(!running);
  };

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1;
          } else {
            audioRef.current.play();
            if (timerLabel === 'Session') {
              setTimerLabel('Break');
              return breakLength * 60;
            } else {
              setTimerLabel('Session');
              return sessionLength * 60;
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running, timerLabel, breakLength, sessionLength]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="pomodoro-clock">
      <div className='labels-session-break'>
     <div id="break-label">Break Length</div>
     <div id="break-decrement" onClick={decrementBreak}>
     <i className="fa-solid fa-angle-right fa-rotate-90"></i>
     </div>
     <div id="break-length">{breakLength}</div>

     <div id="break-increment" onClick={incrementBreak}>
     <i className="fa-solid fa-angle-up"></i>
     </div>

 </div>
      <div className="labels-session-break">
      <div id="session-label">Session Length</div>
     
      
     <div id="session-decrement" onClick={decrementSession}>
     <i className="fa-solid fa-angle-right fa-rotate-90"></i>
     </div>
     
     <div id="session-length">{sessionLength}</div>
     <div id="session-increment" onClick={incrementSession}>
     <i className="fa-solid fa-angle-up"></i>
     
     </div>
      </div>
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <div id="start_stop" onClick={startStop}>
      <i className="fa-solid fa-play"></i>
      <i className="fa-solid fa-stop"></i>
      </div>
      <div id="reset" onClick={reset}>
        Reset
      </div>
      <audio id="beep" ref={audioRef} src="your-audio-file.mp3"></audio>
    </div>
  );
};

export default Home;
