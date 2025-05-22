import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
let all = [client, ...dependents]
export default function Citizenship() {

  const [isCitizen, setIsCitizen] = useState(true)

  const goTo = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    all.forEach((cover, i) => {

      cover.citizen = data.get(i) === 'false' ? false : true

    })
    console.log(all);

    setSessionToJSON('client', all[0])

    if (all.length > 1) {
      setSessionToJSON('dependents', all.slice(1))
    }


    if (all.filter(cover => cover.citizen === false).length > 0) {
      location.href = '/mig-status'
    } else {
      location.href = '/disabilities'
    }




  }
  return (
    <form className='citizenship' method="post" onSubmit={goTo}>
      <h2 className="section-title">Ciudadania y estatus migratorio</h2>


      <p><b>Alguna de las personas que aplican por cobertura son ciudadanos estadounidenses?</b></p>

      <label
        className="radio-label"
        htmlFor="yes"
      >
        <input
          type="radio"
          id="yes"
          value={true}
          onChange={e => setIsCitizen(true)}
          name='is-citizen'
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
          id="no"
          value={false}
          onChange={e => setIsCitizen(false)}
          name='is-citizen'
        />
        <span>
          No
        </span>
      </label>

      {
        !isCitizen && (

          <div className="form-section">

            <p><b>Alguno de ellos no es ciudadano estadounidense?</b></p>

            {
              all.map((cover, i) => (

                <label htmlFor={i} key={i} className="checkbox-label">
                  <input type="checkbox" name={i} id={i} value={false} />
                  <span>{cover['first-name']}</span>
                </label>

              ))
            }

          </div>
        )
      }

      <button type="submit" className="green-btn">Guardar y continuar</button>
    </form>
  )
}
