import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'



const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => x['cover'] == 'true' || x['cover'] == true)

export default function LifeChanges() {

  const [disabled, setDisabled] = useState(false)
  const [required, setRequired] = useState(false)
  const [params] = useSearchParams()

  const k = parseInt(params.get('k')) || 0

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)
    all[k]['life-change'] = data.getAll('life-change')

    all.forEach((x, i) => {

      if (x == client) {

        setSessionToJSON('client', x)
      } else {

        dependents.forEach((dep, index) => {
          if (x == dep) {
            dependents[index] = x
          }
        })
        setSessionToJSON('dependents', dependents)

      }

    })

    if ((k + 1) < all.length) {
      location.href = `/life-changes?k=${k + 1}`
    } else {
      location.href = 'final-section-welcome'

    }


  }

  return (
    <form className='life-changes' method="post" onSubmit={goTo}>

      <h2 className="section-title">D&iacute;ganos sobre cualquier cambio de vida</h2>

      <p><b>Ha tenido {all[k]['first-name']} cualquiera de estos cambios hace 20/2/{new Date().getFullYear()}</b></p>

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
