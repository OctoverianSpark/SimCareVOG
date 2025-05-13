import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"



const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function MedicareInscription() {


  const [dependents, setDependents] = useState(JSON.parse(sessionStorage.getItem('dependents') ?? []))

  const goTo = e => {

    e.preventDefault()
    const data = new FormData(e.target)

    data.entries().forEach(([key, value]) => {
      client[key] = value
    })

    sessionStorage.setItem('client', JSON.stringify(client))

    location.href = '/section2-welcome'

  }

  return (

    <form method='POST' className="medicare-inscription" onSubmit={goTo}>

      <h2 className="section-title">Inscripci&oacute;n en Medicare</h2>

      <p>La mayoria de las personas se inscriben en Medicare cuando cumplen 65 años, pero algunas son elegibles antes</p>

      <div className="blue-bordered-container">
        <div className="brdr-blue"></div>
        <div className="text">

          <p><b>Medicare vs Medicaid</b></p>

          <span>Cuando responda, asegúrese de informarnos sobre la inscripción a Medicare.
            Le preguntaremos sobre Medicaid (Ilamado Texas Medicaid en Texas) mas
            adelante en la solicitud.</span>
        </div>

      </div>



      <div className="form-section">

        <p><b>Est&aacute; {client['first-name']} inscrito en medicare o lo estar&aacute; en los pr&oacute;ximos 3 meses? </b></p>
        <span className="caption">Seleccione todas las que apliquen</span>

        <label htmlFor="yes" className="radio-label">
          <input type="radio" name="exist-or-will-in-medicare" id="yes" value={'si'} />
          <span>Si</span>
        </label>
        <label htmlFor="no" className="radio-label">
          <input type="radio" name="exist-or-will-in-medicare" id="no" value={'no'} />
          <span>No</span>
        </label>
      </div>


      <button type="submit" className="green-btn">Guardar y Continuar</button>



    </form >

  )
}
