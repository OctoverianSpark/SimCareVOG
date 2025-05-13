import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'


const client = getSessionToJSON('client')
export default function MedRefundOffers() {

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    client['hra-qsehra-offers'] = data.get('offered-med-refund')

    setSessionToJSON('client', client)

    location.href = '/recent-changes'

  }

  return (
    <form method="post" className="med-refund-offers" onSubmit={goTo}>

      <h2 className="section-title">Ofertas de Acuerdo de Reembolso de Gastos M&eacute;dicos</h2>


      <div className="blue-bordered-container">

        <div className="text">
          <ul>
            <li>El <b>tipo de HRA</b>, HRA de cobertura individual o HRA de pequeños empleadores calificados (QSEHRA)</li>
            <li>La fecha de inicio del HRA</li>
            <li>Quien puede usar el HRA</li>
          </ul>
          <p>Una persona puede tener mas de un tipo de HRA disponible para ellos. Cada HRA tendr&aacute; su propio aviso.</p>
        </div>
      </div>


      <p><b>Le han ofrecido a {client['first-name']} una HRA de cobertura individual o le han proporcionada una QESEHRA con una fecha de inicio entre 20/2/{new Date().getFullYear()} - 20/6/{new Date().getFullYear()}?</b></p>

      <span className="caption">S&oacute;lo seleccione "Si" si ambos aplican:</span>
      <ul>
        <li className="caption">El tipo de HRA es una cobertura individual HRA o QSEHRA</li>
        <li className="caption">Al menos una fecha de inicio de HRA est&aacute; dentro del rango de fechas anterior</li>
      </ul>

      <label htmlFor="yes" className="radio-label">
        <input type="radio" name="offered-med-refund" id="yes" value={'si'} required />
        <span>Si</span>
      </label>
      <label htmlFor="no" className="radio-label">
        <input type="radio" name="offered-med-refund" id="no" value={'no'} required />
        <span>No</span>
      </label>

      <button type="submit" className="green-btn">Guardar y Continuar</button>

    </form>
  )
}
