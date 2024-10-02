import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/ApiRoutes";
import React, { useEffect, useState, useRef } from "react";
import Avatar from "../common/Avatar";
import { FaPlay, FaStop } from "react-icons/fa";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import WaveSurfer from "wavesurfer.js";

function VoiceMessage({ message }) {
    const [{ userInfo, currentChatUser }] = useStateProvider();
    const [audioMessage, setAudioMessage] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const waveFormRef = useRef(null);
    const waveform = useRef(null);

    // Update current playback time
    useEffect(() => {
        if (audioMessage) {
            const updatePlaybackTime = () => {
                setCurrentPlaybackTime(audioMessage.currentTime);
            };
            audioMessage.addEventListener("timeupdate", updatePlaybackTime);
            return () => {
                audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
            };
        }
    }, [audioMessage]);

    // Initialize WaveSurfer
    useEffect(() => {
        waveform.current = WaveSurfer.create({
            container: waveFormRef.current,
            waveColor: "#ccc",
            progressColor: "#4a9eff",
            cursorColor: "#7ae3c3",
            barWidth: 2,
            height: 30,
            responsive: true,
        });

        waveform.current.on("finish", () => {
            setIsPlaying(false);
        });

        // Cleanup on unmount
        return () => {
            if (waveform.current) {
                waveform.current.destroy();
            }
        };
    }, []);

    // Load audio and waveform
    useEffect(() => {
        const audioURL = `${HOST}/${message.message}`;
        const audio = new Audio(audioURL);
        setAudioMessage(audio);

        if (waveform.current) {
            waveform.current.load(audioURL);
            waveform.current.on("ready", () => {
                setTotalDuration(waveform.current.getDuration());
            });
        }

    }, [message.message]);

    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    };

    const handlePlayAudio = () => {
        if (audioMessage) {
            waveform.current.play();  // Play WaveSurfer
            audioMessage.play();      // Play HTML Audio
            setIsPlaying(true);
        }
    };

    const handlePauseAudio = () => {
        waveform.current.pause(); // Pause WaveSurfer
        audioMessage.pause();     // Pause HTML Audio
        setIsPlaying(false);
    };

    return (
        <div className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md ${
            message.senderId === currentChatUser.id ? "bg-incoming-background" : "bg-outgoing-background"
        }`}>
            <div>
                <Avatar type="lg" image={currentChatUser.profilePicture} />
            </div>
            <div className="cursor-pointer text-xl">
                {!isPlaying ? <FaPlay onClick={handlePlayAudio} /> : <FaStop onClick={handlePauseAudio} />}
            </div>
            <div className="relative">
                <div className="w-60" ref={waveFormRef} />
                <div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolute bottom-[-22px] w-full">
                    <span>{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}</span>
                    <div className="flex gap-1">
                        <span>{calculateTime(message.createdAt)}</span>
                        <span>{message.senderId === userInfo.id && <MessageStatus MessageStatus={message.messageStatus} />}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoiceMessage;
