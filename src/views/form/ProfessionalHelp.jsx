import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
export default function ProfessionalHelp() {


  const [showTypes, setShowTypes] = useState(false)
  const [showAgent, setShowAgent] = useState(false)
  const [params] = useSearchParams()
  const goTo = (e) => {
    e.preventDefault()


    const data = new FormData(e.target)

    let body = {}

    data.entries().forEach(([key, value]) => {

      if (key === 'professional-type') {

        if (!body[key]) body[key] = []

        body[key].push(value)

      } else {
        body[key] = value

      }



    })

    sessionStorage.setItem('professional-help', JSON.stringify(body))

    if (params.get('final-check')) {
      location.href = '/final-check'
    } else {
      location.href = '/household'
    }

  }


  return (
    <form method="post" className="professional-help" onSubmit={goTo}>
      <h2 className="section-title">D&iacute;ganos si un profesional le est&aacute; ayudando</h2>

      <div className="form-section">
        <p><b>Le est&aacute; ayudando un profesional a completar su solicitud?</b></p>
        <p className="section-description">
          Si un miembro de la familia o amigo le est&aacute; ayudando, seleccione "No"
        </p>

        <label htmlFor="yes" className="radio-label">
          <input type="radio" name="is-helping" id="yes" value={'si'} onChange={e => setShowTypes(true)} />
          <span>Si</span>
        </label>
        <label htmlFor="no" className="radio-label">
          <input type="radio" name="is-helping" id="no" value={'no'} onChange={e => setShowTypes(false)} />
          <span>No</span>
        </label>

      </div>

      {
        showTypes && (

          <div className="form-section">
            <p><b>Que tipo de profesional le esta ayudando</b></p>
            <p className="section-description">
              Seleccione todas las que correspondan
            </p>

            <label htmlFor="navigator-selection" className="checkbox-label">
              <input type="checkbox" name="professional-type" id="navigator-selection" value={'navegador'} />
              <span>Navegador</span>
            </label>
            <label htmlFor="counselor-selection" className="checkbox-label">
              <input type="checkbox" name="professional-type" id="counselor-selection" value={'consejero certificado de solicitudes'} />
              <span>Consejero certificado de solicitudes</span>
            </label>
            <label htmlFor="agent-or-broker-selection" className="checkbox-label">
              <input type="checkbox" name="professional-type" id="agent-or-broker-selection" value={'agente o corredor'} onChange={e => setShowAgent(!showAgent)} />
              <span>Agente o Corredor</span>
            </label>
            <label htmlFor="other-selection" className="checkbox-label">
              <input type="checkbox" name="professional-type" id="other-selection" value={'otro asistente'} />
              <span>Otro Asistente</span>
            </label>
          </div>
        )
      }
      {
        showAgent && (

          <div className="form-section">
            <h2 className="section-title">D&iacute;ganos sobre el Agente o Corredor</h2>

            <label htmlFor="first-name" className="label-input">
              <span><b>Primer nombre</b></span>
              <input type="text" name="first-name" id="first-name" />
            </label>
            <label htmlFor="initial-second-name" className="label-input">
              <span><b>Inicial del segundo name</b></span>
              <input type="text" name="initial-second-name" id="initial-second-name" />
            </label>

            <label htmlFor="last-name" className="label-input">
              <span><b>Apellido</b></span>
              <input type="text" name="last-name" id="last-name" />
            </label>

            <label htmlFor="suffix" className="label-input">
              <span><b>Sufijo</b></span>
              <span className="caption">Opcional</span>
              <input type="text" name="suffix" id="suffix" />
            </label>

            <label htmlFor="npn" className="label-input">
              <span><b>N&uacute;mero Nacional de Productores (NPN)</b></span>
              <input type="text" name="npn" id="npn" />
            </label>


          </div>

        )
      }

      <button type="submit" className="green-btn">Guardar y continuar</button>


    </form>
  )
}
