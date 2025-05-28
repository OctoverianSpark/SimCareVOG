import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)
export default function HRAIndividualCover() {

  const [firstDis, setFirstDis] = useState(false)
  const [secDis, setSecDis] = useState(false)

  const goTo = e => {
    e.preventDefault()



    location.href = '/job-based-cover-info'

  }

  return (
    <form method="post" className="hra-individual-cover" onSubmit={goTo}>

      <h2 className="section-title">Acuerdo de reembolso de gastos m&eacute;dicos de cobertura individual</h2>

      <h2><b>HRA de cobertura individual actual</b></h2>

      <div className="blue-bordered-container">
        <div className="text">
          <p><b>Busque en el aviso de HRA:</b></p>
          <ul><li><b>Qui&eacute;n</b> puede usar la HRA.</li></ul>
          <p>Si el HRA de cobertura individual est&aacute; disponible para el empleado y otros miembros del hogar, aseg&uacute;rese de seleccionar sus nombres</p>
        </div>
      </div>

      <p><b>Algunas de estas personas ya tienen un HRA de cobertura individual?</b></p>
      <span className="caption">Seleccione "Si" si alguno de estos se aplica</span>
      <ul>
        <li className="caption">Ya est&aacute;n utilizando una cobertura individual HRA</li>
        <li className="caption">Tienen una nueva oferta y le han dicho al empleador que desean inscribirse y ya no pueden rechazar ("optar por no participar") la oferta</li>
      </ul>

      {
        all.map((cover, i) => (
          <label htmlFor={i} key={i} className="checkbox-label">
            <input type="checkbox" name={`has-hra,${i}`} id={i} disabled={firstDis} value={'si'} />
            <span>{cover['first-name']}</span>
          </label>
        ))
      }
      <hr />
      <label htmlFor="none" className="checkbox-label">
        <input type="checkbox" id="none" onChange={e => setFirstDis(e.target.checked)} />
        <span>Ninguna de estas personas</span>
      </label>

      <p><b>Ofertas HRA de cobertura individual</b></p>

      <div className="blue-bordered-container">
        <div className="text">
          <p><b>Busque en el aviso de HRA:</b></p>
          <ul>
            <li>La <b>fecha de inicio</b> y <b>finalizaci&oacute;n</b> del HRA</li>
            <li><b>Qui&eacute;n</b> puede usar la HRA.</li>
          </ul>
          <p>
            Si el HRA de cobertura individual est&aacute; disponible para el empleado y otros miembros del hogar, aseg&uacute;rese de seleccionar sus nombres.
          </p>
        </div>
      </div>


      <p><b>Algunas de estas personas tienen una oferta HRA de cobertura individual que a&uuacute;n no han aceptado y que a&uacute;n pueden rechazar ("optar por no") </b></p>

      {
        all.map((cover, i) => (
          <label htmlFor={i} key={i} className="checkbox-label">
            <input type="checkbox" name={`has-hra-offers,${i}`} id={i} disabled={secDis} value={'si'} />
            <span>{cover['first-name']}</span>
          </label>
        ))
      }
      <hr />
      <label htmlFor="none-2" className="checkbox-label">
        <input type="checkbox" id="none-2" onChange={e => setSecDis(e.target.checked)} />
        <span>Ninguna de estas personas</span>
      </label>

      <button type="submit" className="green-btn">Guardar y Continuar</button>




    </form>
  )
}
