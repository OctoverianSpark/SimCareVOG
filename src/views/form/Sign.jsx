import React, { useState } from 'react'
import { getSessionToJSON } from '../../utils/functions'



const client = getSessionToJSON('client')

export default function Sign({ handleSubmit }) {


  const [disabled, setDisabled] = useState(true)


  return (
    <form method="post" className="sign w-180" onSubmit={handleSubmit}>

      <h2 className="section-title">Firmar y enviar</h2>


      <p><b>Estoy firmando esta solicitud bajo pena de perjurio, lo que significa que he proporcionado respuestas verdaderas a todas las preguntas a lo mejor de mi conocimiento. S&eacute; que puedo estar sujeto a sanciones seg&uacute;n la ley federal si proporciono informacion falsa intencionalmente</b></p>

      <label htmlFor="agree" className="checkbox-label">
        <input type="checkbox" id="agree" onChange={e => setDisabled(!e.target.checked)} />
        <span>Estoy de acuerdo</span>
      </label>


      <label htmlFor="sign" className="label-input">
        <span>{`${client['first-name']} ${client['middle-name']} ${client['last-name']} ${client['suffix']}`.trim()}, escriba su nombre completo a continuaci&oacute;n para formar electr&oacute;nicamente.</span>
        <input type="text" id="sign" disabled={disabled} required />
      </label>

      {
        !disabled && (

          <button type="submit" className='green-btn'>Firmar y enviar</button>
        )
      }


    </form>
  )
}
