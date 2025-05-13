import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'



const client = getSessionToJSON('client')
export default function LifeChanges() {

  const [disabled, setDisabled] = useState(false)
  const [required, setRequired] = useState(false)

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)
    client['life-change'] = []

    if (!data.get('life-change')) {
      setRequired(true)
      return
    }

    setRequired(false)

    data.entries().forEach(([key, value]) => {


      client[key].push(value)

    })

    setSessionToJSON('client', client)

    location.href = 'final-section-welcome'

  }

  return (
    <form className='life-changes' method="post" onSubmit={goTo}>

      <h2 className="section-title">D&iacute;ganos sobre cualquier cambio de vida</h2>

      <p><b>Ha tenido {client['first-name']} cualquiera de estos cambios hace 20/2/{new Date().getFullYear()}</b></p>

      <label htmlFor="life-change-married" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-married" value={'Casarse'} disabled={disabled} required={required} />
        <span>Casarse</span>
      </label>
      <label htmlFor="life-change-dependent" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-dependent" value={'Obtuvo un dependiente (o se convirtió en uno)'} disabled={disabled} required={required} />
        <span>Obtuvo un dependiente (o se convirti&oacute; en dependiente) debido a una adopci&oacute;n, colocaci&oacute;n en un cuidado temporal o de crianza temporal o una orden judicial</span>
      </label>
      <label htmlFor="life-change-moved" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-moved" value={'Se mudó'} disabled={disabled} required={required} />
        <span>Se mud&oacute;</span>
      </label>
      <label htmlFor="life-change-liberty" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-liberty" value={'Fue liberado de su encarcelamiento'} disabled={disabled} required={required} />
        <span>Fue liberado de su encarcelamiento (detenci&oacute;n o carcel)</span>
      </label>

      <hr />

      <label htmlFor="life-change-none" className="checkbox-label">
        <input type="checkbox" name="life-change" id="life-change-none" value={'Ninguno'} onChange={e => setDisabled(e.target.checked)} required={disabled} />
        <span>Ninguno de estos cambios</span>
      </label>

      {
        required && (
          <p className='text-red-500'>Necesitas seleccionar al menos una casilla</p>
        )
      }

      <button type="submit" className="green-btn">Guardar y continuar</button>


    </form>
  )
}
