import React, { useState } from 'react'
import { getSessionToJSON } from '../../utils/functions'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

const all = [client, ...dependents]




export default function JobBasedOffers() {

  const [disabled, setDisabled] = useState(false)


  const goTo = e => {
    e.preventDefault()

    location.href = '/eligibility-info'


  }

  return (
    <form method="post" className="job-based-offers" onSubmit={goTo}>

      <h2 className="section-title">Ofertas de cobertura m&eacute;dica a trav&eacute;s de un empleo</h2>

      <p><b>Se le ofrece a alguna de estas personas cobertura m&eacute;dica a trav&eacute;s de su propio empleo?</b></p>

      {
        all.map((x, i) => (
          <label htmlFor={i} key={i} className="radio-label">

            <input type="checkbox" name="job-based-offer" id={i} value={x['first-name']} disabled={disabled} />
            <span>{x['first-name']}</span>

          </label>
        ))
      }

      <hr />
      <label htmlFor={`none`} className="radio-label">

        <input type="checkbox" name="job-based-offer" id='none' value={'none'} onChange={e => setDisabled(!disabled)} />
        <span>Ninguna de estas personas</span>

      </label>

      <button type="submit" className='green-btn'>Guardar y continuar</button>


    </form>
  )
}
