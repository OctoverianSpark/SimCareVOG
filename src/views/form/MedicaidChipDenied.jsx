import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'


const client = getSessionToJSON('client')

export default function MedicaidChipDenied() {

  const [denegated, setDenied] = useState(false)


  const goTo = e => {
    e.preventDefault()

    const formData = new FormData(e.target)

    formData.entries().forEach(([key, value]) => {


      client[key] = value

    })

    if (client['medicaid-chip-denied'] === 'no') {
      delete client["medicaid-chip-denied-day"]
      delete client["medicaid-chip-denied-month"]
      delete client["medicaid-chip-denied-year"]
    }

    setSessionToJSON('client', client)

    location.href = '/income-info'

  }

  return (
    <form className="medicaid-chip-denied w-120" onSubmit={goTo}>

      <h1 className="section-title">Denegaci&oacute;n reciente de Medicaid o CHIP</h1>

      <p><b>Se encontr&oacute; que {client['first-name']} no es elegible para Medicaid o CHIP desde 21/1/{new Date().getFullYear()}</b></p>


      <label className="radio-label" htmlFor='yes'>
        <input type="radio" name="medicaid-chip-denied" value={'si'} id='yes' onChange={e => setDenied(true)} required />
        <span>Si</span>
      </label>
      <label className="radio-label" htmlFor='no'>
        <input type="radio" name="medicaid-chip-denied" value={'no'} id='no' onChange={e => setDenied(false)} required />
        <span>No</span>
      </label>




      {
        denegated && (
          <div className="form-section">

            <p><b>Ingrese la fecha en la carta de rechazo de {client['first-name']}</b></p>
            <span className="caption">Si no lo tiene, de su mejor estimaci&oacute;n</span>
            <span className="caption">Por ejemplo: 21/4/{new Date().getFullYear()}</span>

            <div className="container-inputs">
              <label className="label-input" htmlFor="client-dob">

                <p className="caption">Este campo es requerido</p>
                <div className="dob-inputs">
                  <input
                    type="number"
                    id="medicaid-chip-denied-month"
                    name="medicaid-chip-denied-month"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    type="number"
                    id="medicaid-chip-denied-day"
                    name="medicaid-chip-denied-day"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                  />
                  <input
                    type="number"
                    id="medicaid-chip-denied-year"
                    name="medicaid-chip-denied-year"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </label>
            </div>
          </div>
        )
      }

      <button type="submit" className="green-btn">Guardar y Continuar</button>

    </form>
  )
}
