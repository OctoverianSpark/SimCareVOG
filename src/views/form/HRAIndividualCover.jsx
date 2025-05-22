import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)
export default function HRAIndividualCover() {

  const [params] = useSearchParams()
  const k = parseInt(params.get('k') || 0)

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    data.entries().forEach(([key, value]) => {

      all[k][key] = value

    })

    setSessionToJSON('client', client)

    if (k == 0) {
      setSessionToJSON('client', all[k])
    } else {
      dependents[k - 1] = all[k]
      setSessionToJSON('dependents', dependents)
    }

    if ((k + 1) < all.length) {

      location.href = `/hra-individual-cover?k=${k + 1}`

    } else {

      location.href = '/job-based-cover-info'
    }




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

      <p><b>{all[k]['first-name']} ya tiene un HRA de cobertura individual?</b></p>
      <span className="caption">Seleccione "Si" si alguno de estos se aplica</span>
      <ul>
        <li className="caption">Ya est&aacute;n utilizando una cobertura individual HRA</li>
        <li className="caption">Tienen una nueva oferta y le han dicho al empleador que desean inscribirse y ya no pueden rechazar ("optar por no participar") la oferta</li>
      </ul>

      <label htmlFor="has-individual-hra-yes" className="radio-label">
        <input type="radio" name="has-individual-hra" id="has-individual-hra-yes" value={'si'} required />
        <span>Si</span>
      </label>
      <label htmlFor="has-individual-hra-no" className="radio-label">
        <input type="radio" name="has-individual-hra" id="has-individual-hra-no" value={'no'} required />
        <span>No</span>
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
            Si el HRA de cobertura individual est&aacute; disponible para el empleado y otros miembros del hogar, aseg&uacute;rese de seleccionar sus nombres. (Haga esto incluso si una persona if)
          </p>
        </div>
      </div>


      <p><b>{all[k]['first-name']} tiene una oferta HRA de cobertura individual que a&uuacute;n no han aceptado y que a&uacute;n pueden rechazar ("optar por no") </b></p>
      <label htmlFor="has-individual-hra-offers-yes" className="radio-label">
        <input type="radio" name="has-individual-hra-offers" id="has-individual-hra-offers-yes" value={'si'} required />
        <span>Si</span>
      </label>
      <label htmlFor="has-individual-hra-offers-no" className="radio-label">
        <input type="radio" name="has-individual-hra-offers" id="has-individual-hra-offers-no" value={'no'} required />
        <span>No</span>
      </label>


      <button type="submit" className="green-btn">Guardar y Continuar</button>




    </form>
  )
}
