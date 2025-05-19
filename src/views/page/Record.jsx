import React, { useRef, useEffect } from 'react';
import { getScreenChannel } from '../../utils/lib/screenChannel';
const bc = getScreenChannel();

export default function Record() {
  const mediaRecorderRef = useRef(null);

  const hasStarted = useRef(false);
  useEffect(() => {


    if (hasStarted.current) return; // 👈 previene múltiples ejecuciones
    hasStarted.current = true
    let chunks = [];

    async function start() {
      console.log('StartRecording')
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        bc.postMessage({ type: 'recording-finished', blob });
        chunks = [];
        setTimeout(() => {

          hasStarted.current = false
          window.close()
        }, 3000);
      };

      // arrancamos
      recorder.start();

      // escuchamos la orden de paro
      bc.onmessage = evt => {
        if (evt.data === 'stop-recording') {
          recorder.stop();
        }
      };
    }

    start();

    // NO cerramos el canal aquí
    return () => {
      // solo detenemos la cámara al desmontar
      mediaRecorderRef.current?.stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  return <h2 className='section-title subtitle-blue'>Grabando...</h2>;
}
