import React, { useState } from 'react'
import { getSessionToJSON, getSessionToText } from '../../utils/functions'
import axios from 'axios'
import { useVideo } from '../components/VideoContext'
import { useRef } from 'react'
import { useEffect } from 'react'
import { getScreenChannel } from '../../utils/lib/screenChannel';


const bc = getScreenChannel();



const client = getSessionToJSON('client')


export default function Sign() {
  const [disabled, setDisabled] = useState(true)
  const [videoBlob, setVideoBlob] = useState(null);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)
  useEffect(() => {
    const handler = evt => {
      if (evt.data?.type === 'recording-finished') {
        setVideoBlob(evt.data.blob);
        setIsReadyToSubmit(true);
        bc.close(); // cerrar después de recibir
      }
    };
    bc.addEventListener('message', handler);
    return () => bc.removeEventListener('message', handler);
  }, []);


  const goTo = async e => {
    e.preventDefault();

    // Si ya tenemos el blob, proceder
    if (videoBlob) {
      await submitForm(e.target);
    } else {
      // Pedimos al popup que detenga la grabación
      bc.postMessage('stop-recording');

      // Esperamos hasta que llegue el blob
      const check = setInterval(() => {
        if (videoBlob) {
          clearInterval(check);
          submitForm(e.target);
        }
      }, 500);
    }
  };

  async function submitForm(formElement) {
    const formData = new FormData(formElement);
    const file = new File([videoBlob], 'grabacion.webm', { type: 'video/webm' });

    formData.append('video', file);
    formData.append('client', JSON.stringify(getSessionToJSON('client')));
    formData.append('dependents', JSON.stringify(getSessionToJSON('dependents', [])));
    formData.append('saving_options', getSessionToText('saving-option'));
    formData.append('name', getSessionToText('user').replaceAll('"', ''));
    formData.append('professional_help', JSON.stringify(getSessionToJSON('professional-help')));

    try {
      const res = await axios.post('https://apisim.asistentevirtualsas.com/simulations/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          user: 'SIMULATOR_USER',
          password: 'GOXPERT2025@@@',
        },
      });

      console.log('✅ Enviado correctamente', res.data);
    } catch (err) {
      console.error('❌ Error al enviar datos:', err);
    }
  }



  return (
    <form method="post" className="sign w-180" onSubmit={goTo}>
      <h2 className="section-title">Firmar y enviar</h2>

      <p>
        <b>
          Estoy firmando esta solicitud bajo pena de perjurio, lo que significa que he proporcionado
          respuestas verdaderas a todas las preguntas a lo mejor de mi conocimiento. Sé que puedo estar sujeto a sanciones
          según la ley federal si proporciono información falsa intencionalmente
        </b>
      </p>

      <label htmlFor="agree" className="checkbox-label">
        <input type="checkbox" id="agree" onChange={e => setDisabled(!e.target.checked)} />
        <span>Estoy de acuerdo</span>
      </label>

      <label htmlFor="sign" className="label-input">
        <span>
          {`${client['first-name']} ${client['middle-name']} ${client['last-name']} ${client['suffix']}`.trim()}, escriba su nombre completo a continuación para formar electrónicamente.
        </span>
        <input type="text" id="sign" disabled={disabled} required />
      </label>

      {!disabled && (
        <button type="submit" className="green-btn">
          Firmar y enviar
        </button>
      )}
    </form>
  )
}
