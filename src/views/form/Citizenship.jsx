import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function Citizenship() {



  const goTo = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    client['citizen'] = data.get('is-citizen')

    sessionStorage.setItem('client', JSON.stringify(client))

    if (data.get('is-citizen') === 'true') {

      location.href = 'disabilities'

    } else {

      if (dependents.length > 0) {
        location.href = '/who-is-not-citizen'
      } else {
        location.href = '/mig-status'
      }

    }




  }

  return (
    <form className='citizenship' method="post" onSubmit={goTo}>
      <h2 className="section-title">Ciudadania y estatus migratorio</h2>


      <p><b>Es {client['first-name']} un ciudadano estadounidense</b></p>

      <label
        className="radio-label"
        htmlFor="yes"
      >
        <input
          type="radio"
          name="is-citizen"
          id="yes"
          value={true}
        />
        <span>
          Si
        </span>
      </label>

      <label
        className="radio-label"
        htmlFor="no"
      >
        <input
          type="radio"
          name="is-citizen"
          id="no"
          value={false}
        />
        <span>
          No
        </span>
      </label>

      <button type="submit" className="green-btn">Guardar y continuar</button>
    </form>
  )
}
