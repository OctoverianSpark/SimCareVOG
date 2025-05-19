import React from 'react'
import { getSessionToText } from '../../utils/functions'

export default function Congratulations() {

  const eliminateAll = () => {


    location.href = '/'
  }

  return (
    <div>

      <h2 className="section-title subtitle-blue">Felicidades {getSessionToText('user').replace('"', '').replace('"', '')}, has completado la Simulacion</h2>
      <p>Luego te seran compartidos tus resultados por la encargada de entrenamiento</p>

      <button className="green-btn" onClick={() => eliminateAll()}>Volver al inicio</button>
    </div>
  )
}
