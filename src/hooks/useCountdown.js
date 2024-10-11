import { useEffect, useRef, useState } from "react";

export const useCountdown = (initialTimeSession, initialtimeBreak, playing, callback, reset , interval = 1000) => {
    
    
    const [timeSession, setTimeSession] = useState((initialTimeSession*60)*1000);      
    const [timeBreak, setTimeBreak] = useState((initialtimeBreak)*60*1000);
    const [isSession, setIsSession] = useState(true);
    const [time, setTime] = useState(initialTimeSession*60*1000)
        
    const minutos = Math.floor((time / 60000));
    const segundos = Math.floor((time/1000)% 60);

    useEffect(() => {
        if(!playing) {
            setTimeSession(initialTimeSession*60*1000)
            setTimeBreak(initialtimeBreak*60*1000)
            setIsSession(true)
            setTime(initialTimeSession*60*1000)
        }

        
    }, [initialTimeSession, initialtimeBreak])
    
    useEffect(() => {
        if (!playing) {
            setIsSession(initialTimeSession*60*1000)
            setTimeBreak(initialtimeBreak*60*1000)
            setIsSession(true)
            setTime(initialTimeSession*60*1000)
        }
        
    }, [reset])
    

    useEffect(() => {
        
        const customInterval = setInterval(() => {
            
            if(time > 0 | isSession | timeBreak >=0 | timeSession >= 0) {
                
                if(playing && timeSession > 0) {
                    console.log("im hre")
                    setTimeSession(prev => prev - interval);
                    setTime(prev => prev - interval);
                    
                } 

                
    
                if (playing && timeSession === 0 && timeBreak === (initialtimeBreak*60*1000)) {
                    setTime(timeBreak);
                    callback();
                    
                    setIsSession(false);
    
                }
    
                if (timeBreak > 0 && playing && timeBreak === time && timeSession === 0) {
                    setTimeBreak(prev => prev - interval);
                    setTime(prev => prev - interval) 
                    console.log("Entrando en chilin")  
                       
    
                }
                
                if(time === 0 && timeBreak === 0 && timeSession === 0 && playing){
                                    
                    callback();
                    setTimeSession(initialTimeSession*60*1000)
                    setTimeBreak(initialtimeBreak*60*1000)                    
                    setTime(initialTimeSession*60*1000)
                    setIsSession(true)

                }
            }            
            
            
            
            
        }, interval)



        return () => {
            clearInterval(customInterval)
        }

    } , [time, reset, playing])

    return {
        min: minutos,
        seg: segundos,
        sessionActive: isSession,
        breakTimeFinal: timeBreak,
        sessionTimeFinal: timeSession,

    }
    
    
}