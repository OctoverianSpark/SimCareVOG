import React from 'react'
import { startScreenRecording, getScreenStream, stopScreenRecording } from '../../utils/screenRecorder'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';






export default function Record() {



  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const hasStartedRef = useRef(false)
  const [stream, setStream] = useState(null);
  const [videoURL, setVideoURL] = useState(null)

  useEffect(() => {
    const startRecording = async () => {
      if (hasStartedRef.current === true) return

      hasStartedRef.current = true

      try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        setStream(mediaStream);

        const recorder = new MediaRecorder(mediaStream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          setVideoURL(url)
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Simulacion' + '.webm';
          a.click();

          setTimeout(() => URL.revokeObjectURL(url), 100);
        };

        mediaRecorderRef.current = recorder;
        recorder.start();
        setRecording(true);
      } catch (err) {
        console.error('Error al iniciar la grabación:', err);
      }
    };
    startRecording();



    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const stop = () => {

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      window.close()
    }
  };


  return (
    <div>


      <div>
        {
          hasStartedRef.current && (
            <h2 className='subtitle'>Grabando...</h2>
          )
        }

        <button type="button" className='blue-btn' onClick={() => stop()}>Detener Grabacion</button>
      </div>


    </div>
  )
}
