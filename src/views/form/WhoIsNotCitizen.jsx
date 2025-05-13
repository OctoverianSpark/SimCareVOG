import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function WhoIsNotCitizen() {

  const [coveredDeps, setCovered] = useState(dependents.filter(x => x['cover'] === true))

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    data.entries().forEach(([key, value]) => {

      dependents[key]['citizen'] = value

    });


    sessionStorage.setItem('dependents', JSON.stringify(dependents))

    location.href = '/mig-status'
  }


  return (
    <form method="post" className="mig-status" onSubmit={goTo}>

      <h2 className="section-title">Quien no es ciudadano?</h2>

      {
        Object.keys(dependents).map(key => (

          <label htmlFor={key} key={key} className="checkbox-label">
            <input type="hidden" name={key} value={true} />
            <input type="checkbox" name={key} id={key} value={false} />
            <span>{dependents[key]['first-name']}</span>
          </label>

        ))
      }

      <button type="submit" className='green-btn'>Guardar y Continuar</button>
    </form>
  )
}
