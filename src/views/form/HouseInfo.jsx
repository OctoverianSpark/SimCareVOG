import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function HouseInfo() {

  const [disabled, setDisabled] = useState(false)

  const goTo = e => {

    e.preventDefault()

    const data = new FormData(e.target)

    let body = []

    data.getAll('applies-to-a-home-member').forEach(entry => {
      body.push(entry)
    })

    sessionStorage.setItem('house-info', body)

    location.href = 'home-info'


  }


  return (
    <form method='POST' className='house-info' onSubmit={goTo}>

      <h2 className="section-title">Informaci&oacute;n del hogar</h2>

      <p><b>Alguna de estas situaciones le aplica a alg&uacute;n miembro del hogar?</b></p>

      <label htmlFor="pregnant" className="checkbox-label">
        <input type="checkbox" name="applies-to-a-home-member" id="pregnant" value={'Esta embarazada'} disabled={disabled} required={!disabled} />
        <span>Esta embarazada</span>
      </label>

      <label htmlFor="indian/alaskian" className="checkbox-label">
        <input type="checkbox" name="applies-to-a-home-member" id="indian/alaskian" value={'Es indio americano o nativo de Alaska'} disabled={disabled} required={!disabled} />
        <span>Es indio americano o nativo de Alaska</span>
      </label>

      <label htmlFor="jailed" className="checkbox-label">
        <input type="checkbox" name="applies-to-a-home-member" id="jailed" value={'Esta actualmente encarcelado (detenido o en prision)'} disabled={disabled} required={!disabled} />
        <span>Est&aacute; actualmente encarcelado (detenido o en prision)</span>
      </label>

      <hr />

      <label htmlFor="none" className="checkbox-label">
        <input type="checkbox" name="applies-to-a-home-member" id="none" value={'ninguna'} onChange={e => setDisabled(!disabled)} required={disabled} />
        <span>Ninguna de las mencionadas</span>
      </label>

      <button type="submit" className="green-btn">Guardar y continuar</button>


    </form>
  )
}
