import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
export default function WhereTheyLive() {

  const goTo = (e) => {

    e.preventDefault()

    const data = new FormData(e.target)

    switch (data.get('they-live-togheter')) {
      case 'si':

        dependents.forEach(dep => {
          dep['house-direction'] = client['house-direction']
        })
        sessionStorage.setItem('dependents', JSON.stringify(dependents))
        break;
      case 'no':

        break;

      default:
        break;
    }
    location.href = '/dir-confirmation'



  }

  return (
    <form className='where-they-live' method="post" onSubmit={goTo}>

      <h2 className="section-title">D&oacute;nde viven todos?</h2>
      <p><b>Todas estas personas viven juntas en esta direcci&oacute;n?</b></p>
      <div className="gray-container">

        <p>{client['first-name']}</p>
        {
          Object.keys(dependents).map(key => (
            <p key={key}>{dependents[key]['first-name']}</p>
          ))
        }
        <hr />
        <p>{`${client['house-direction']['first-direction']} ${client['house-direction']['second-direction']} ${client['house-direction']['city']} ${client['house-direction']['state']} ${client['house-direction']['zipcode']}`.toUpperCase()}</p>
      </div>

      <div className="container-inputs">
        <label htmlFor="yes" className="radio-label">
          <input type="radio" name='they-live-togheter' id="yes" value={'si'} />
          <span>Si</span>
        </label>
        <label htmlFor="no" className="radio-label">
          <input type="radio" name='they-live-togheter' id="no" value={'si'} />
          <span>No</span>
        </label>
      </div>



      <button type="submit" className='green-btn'>Guardar y continuar</button>



    </form>
  )
}
