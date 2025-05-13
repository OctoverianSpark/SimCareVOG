import React, { useState } from 'react'
import { age, getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents.filter(x => age(`${x['dob-year']}/${x['dob-month']}/${x['dob-day']}`) >= 18)].filter(x => Boolean(x['cover']) == true)
console.log(all);


export default function MilitaryServices() {

  const [veteran, setVeteran] = useState([])
  const [marriedveteran, setMarriedVeteran] = useState([])



  const goTo = e => {

    e.preventDefault()

    location.href = '/disabilities'


  }





  return (
    <form className="military-services" method="POST" onSubmit={goTo}>

      <h2 className="section-title">Servicio Militar en EE.UU</h2>


      {
        all.map((x, i) => (

          <div key={i} className="form-section">

            <p><b>Es {x['first-name']} un veterano dado de baja honorablemente o<br /> miembro en servicio activo de las fuerzas armadas de los <br />Estados Unidos?</b></p>
            <span className="caption">Opcional</span>

            <label htmlFor={"veteran-yes-" + i} className="radio-label">
              <input type="radio" name={"veteran-" + i} id={"veteran-yes-" + i} value={'si'} checked={veteran[i] === 'si'} onChange={e => setVeteran((prev) => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} />
              <span>Si</span>
            </label>
            <label htmlFor={"veteran-no-" + i} className="radio-label">
              <input type="radio" name={"veteran-" + i} id={"veteran-no-" + i} value={'no'} checked={veteran[i] === 'no'} onChange={e => setVeteran((prev) => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} />
              <span>No</span>
            </label>

            <button type="button" className="blue-btn w-50" onClick={e => setVeteran((prev) => {
              const updated = [...prev]
              updated[i] = ''
              return updated

            })}>Borrar su selecci&oacute;n</button>


            <p><b>Tiene {x['first-name']} un c&oacute;nyugue fallecido que fue veterano <br /> dado de baja honorablemente o miembro en servicio <br />activo de las fuerzas armadas de los Estados Unidos?</b></p>
            <span className="caption">Opcional</span>

            <label htmlFor={"married-veteran-yes-" + i} className="radio-label">
              <input type="radio" name={"married-veteran-" + i} id={"married-veteran-yes-" + i} value={'si'} checked={marriedveteran[i] === 'si'} onChange={e => setMarriedVeteran((prev) => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} />
              <span>Si</span>
            </label>
            <label htmlFor={"married-veteran-no-" + i} className="radio-label">
              <input type="radio" name={"married-veteran-" + i} id={"married-veteran-no-" + i} value={'no'} checked={marriedveteran[i] === 'no'} onChange={e => setMarriedVeteran((prev) => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} />
              <span>No</span>
            </label>

            <button type="button" className="blue-btn w-50" onClick={e => setMarriedVeteran((prev) => {
              const updated = [...prev]
              updated[i] = ''
              return updated
            })}>Borrar su selecci&oacute;n</button>

          </div>



        ))
      }


      <button type="submit" className="green-btn">Guardar y continuar</button>

    </form>
  )
}
