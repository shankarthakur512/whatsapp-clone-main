import { useStateProvider } from "@/context/StateContext";
import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPauseCircle, FaPlay, FaTrash , FaStop } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import { ADD_AUDIO_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
function CaptureAudio({hide}) {
const[{userInfo , currentChatUser , socket }] = useStateProvider();

  const[isRecording , setisRecording]  = useState(false);
  const[recordedAudio , setRecordedAudio] = useState(null);
  const[waveform , setwaveform] = useState(null);
  const[recordingDuration , setRecordingDuration] = useState(0)
  const[currentPlaybackTime , setcurrentPlaybackTime] = useState(0)
  const[totalDuration , settotalDuration] = useState(0)
  const[isPlaying , setisPlaying] = useState(false);
  const[RenderAudio , setRenderAudio] = useState(null);
   const audioRef = useRef(null);
  const mediaRecorderRed = useRef(null);
  const waveFormRef = useRef(null);



useEffect(()=>{
 let interval;
 if(isRecording) {
  interval = setInterval(() =>{
    setRecordingDuration((prevduration) =>{
      settotalDuration(prevduration + 1);
      return prevduration +1;
    });
  }, 1000)
 }
return () =>{
  clearInterval(interval);
};

} , [isRecording])
 
 
 
 
 
useEffect(()=>{
     const wavesurfer = WaveSurfer.create({
      container : waveFormRef.current,
      waveColor: "#ccc",
      progressColor : "#4a9eff",
      cursorColor : "#7ae3c3",
      barWidth : 2,
      height : 30,
      responsive : true,

     });
     setwaveform(wavesurfer)
     wavesurfer.on("finish" ,()=>{
      setisPlaying(false);
     })
     return () =>{
      wavesurfer.destroy();
     }

  },[])
  useEffect(()=>{
  if(waveform) handlestartRecording();

  },[waveform])
useEffect(()=>{
  if(recordedAudio){
    const updatePlaybackTime = () =>{
      setcurrentPlaybackTime(recordedAudio.currentTime);
        };
        recordedAudio.addEventListener("timeupdate" , updatePlaybackTime);
        return () =>{
          recordedAudio.removeEventListener("timeupdate" , updatePlaybackTime);
        };
    }


}, [recordedAudio])



const handlePlayRecording = () => {
if(recordedAudio) {
  waveform.stop();
  waveform.play();
  recordedAudio.play();
  setisPlaying(true);
}
  }
 const handlePauseRecording = () =>{
  waveform.stop();
  recordedAudio.pause();
  setisPlaying(false);

 }
// handling start Recording
 const handlestartRecording = () =>{
 setRecordingDuration(0);
 setcurrentPlaybackTime(0);
 settotalDuration(0);
 setisRecording(true);
 setRecordedAudio(null);
 navigator.mediaDevices.getUserMedia({audio :true})
.then((stream)=>{
const mediaRecorder =  new MediaRecorder(stream);
mediaRecorderRed.current = mediaRecorder;
audioRef.current.srcObject = stream;

const chunks = [];
mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
mediaRecorder.onstop = () =>{
  const blob = new Blob (chunks , {type : "audio/ogg; codecs=opus"});
  const audioUrl =  URL.createObjectURL(blob);
  const audio = new Audio(audioUrl);
  setRecordedAudio(audio);
  waveform.load(audioUrl);
}
mediaRecorder.start();
}).catch(error =>{
  console.error("Error accessing microphone :" , error);
});

};



 const handleStopRecording = () =>{
  if(mediaRecorderRed.current && isRecording){
    mediaRecorderRed.current.stop();
    setisRecording(false);
    waveform.stop();

    const audioChunks = [];
    mediaRecorderRed.current.addEventListener('dataavailable' , (event) =>{
      audioChunks.push(event.data);
    });

    mediaRecorderRed.current.addEventListener('stop', () =>{
      const audioBlob = new Blob(audioChunks , {type : "audio/mp3"});
      const audioFile = new File([audioBlob] , "recording.mp3");

    setRenderAudio(audioFile);
    console.log(RenderAudio)
    })
  }

 }

 //
 const SendRecording = async () =>{
  alert("ok")

  try {
  const formData = new FormData();
  formData.append("Audio" , RenderAudio);
  const response = await axios.post(ADD_AUDIO_MESSAGE_ROUTE,formData,{
    header : {
      "Content-Type" : "multipart/form/data",
    },
    params : {
      from: userInfo.id,
      to : currentChatUser.id,
    }
  });
    console.log(response)
  if(response.status === 201){
    socket.current.emit("send-msg" , {
      to : currentChatUser ?.id,
    from : userInfo?.id,
  message : response.data.message,
      })
    dispatch({
    type : reducerCases.ADD_MESSAGE ,
    newMessage : {
      ...response.data.message , 
    },
    fromSelf : true,
    });
    console.log("done")
  }
  
  
} catch (error) {
  console.log(error)
}

 }

const formatTime = (time) =>{
  if(isNaN(time)) return "00:00";

const minutes  = Math.floor(time /60);
const seconds = Math.floor(time % 60);
return `${minutes.toString().padStart(2 , "0")} : ${seconds.toString().padStart("2" , 0)}`;
};



  return (<div className="flex text-2xl w-full justify-end items-center"> 
  <div className="pt-1" >
  <FaTrash className="text-panel-header-icon" onClick={() => hide()} />

  </div>
  <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg">
    {
      isRecording ? (
        <div className="text-red-500 animate-pulse 2-60 text-center">
          
          Recording <span>{recordingDuration}</span>
          </div>
      ) : 
      (
        <div>
          {
            recordedAudio && (
            <>
            {
              !isPlaying ? (
                <FaPlay onClick={handlePlayRecording} />
              ):(
                
                <FaStop onClick={handlePauseRecording} />
              
              )
              }
            
            </>
         ) }
       </div>
      )
    }
    <div className="w-60" ref={waveFormRef} hidden={isRecording} />
{
  recordedAudio && isPlaying && (<span>{formatTime(currentPlaybackTime)}</span>)
}
{
  recordedAudio && !isPlaying && (<span>{formatTime(totalDuration)}</span>)
}

<audio ref={audioRef} hidden/>
<div className="mr-4">

  {
    !isRecording ? ( <FaMicrophone className="text-red-500" 
    
    onClick={handlestartRecording}/>) :
    (<FaPauseCircle  className="text-red-500" 
    
    onClick={handleStopRecording}/>)
  }
</div>
<div>

  <MdSend 
  
  className="text-panel-header-icon cursor-pointer mr-4"
  title="send"
  onClick={SendRecording}
  />
</div>
    
  </div>

  </div>
  );
}

export default CaptureAudio;
