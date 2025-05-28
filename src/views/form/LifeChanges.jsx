import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'



const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => x['cover'] == 'true' || x['cover'] == true)

export default function LifeChanges() {

  const [disabled, setDisabled] = useState(false)
  const [required, setRequired] = useState(true)


  const goTo = e => {
    e.preventDefault()

    if (required) {
      alert('Debes seleccionar uno')
      return
    }

    location.href = 'final-section-welcome'



  }

  return (
    <form className='life-changes' method="post" onSubmit={goTo}>

      <h2 className="section-title">D&iacute;ganos sobre cualquier cambio de vida</h2>

      <p><b>Alguna de estas personas ha tenido cualquiera de estos cambios antes de 20/2/{new Date().getFullYear()}</b></p>

      <label htmlFor="life-change-married" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-married" value={'Casarse'} disabled={disabled} onChange={e => setRequired(!e.target.checked)} />
        <span>Casarse</span>
      </label>
      <label htmlFor="life-change-dependent" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-dependent" value={'Obtuvo un dependiente (o se convirtió en uno)'} disabled={disabled} onChange={e => setRequired(!e.target.checked)} />
        <span>Obtuvo un dependiente (o se convirti&oacute; en dependiente) debido a una adopci&oacute;n, colocaci&oacute;n en un cuidado temporal o de crianza temporal o una orden judicial</span>
      </label>
      <label htmlFor="life-change-moved" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-moved" value={'Se mudó'} disabled={disabled} onChange={e => setRequired(!e.target.checked)} />
        <span>Se mud&oacute;</span>
      </label>
      <label htmlFor="life-change-liberty" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-liberty" value={'Fue liberado de su encarcelamiento'} disabled={disabled} onChange={e => setRequired(!e.target.checked)} />
        <span>Fue liberado de su encarcelamiento (detenci&oacute;n o carcel)</span>
      </label>

      <hr />

      <label htmlFor="life-change-none" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-none" value={'Ninguno'} onChange={e => {
          setDisabled(e.target.checked)
          setRequired(!e.target.checked)
        }} />
        <span>Ninguno de estos cambios</span>
      </label>

      <button type="submit" className="green-btn">Guardar y continuar</button>


    </form>
  )
}
