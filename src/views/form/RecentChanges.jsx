import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)


export default function RecentChanges() {

  const [openDate, setOpenDate] = useState(false)
  const [params] = useSearchParams()
  const k = parseInt(params.get('k')) || 0

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)


    data.entries().forEach(([key, value]) => {
      all[k][key] = value
    })

    if (k == 0) {
      setSessionToJSON('client', all[k])
    } else {
      dependents[k - 1] = all[k]
      setSessionToJSON('dependents', dependents)
    }
    if ((k + 1) < all.length) {
      location.href = `/recent-changes?k=${k + 1}`
    } else {
      location.href = '/future-changes'
    }


  }

  return (
    <form method="post" className="recent-changes" onSubmit={goTo}>
      <h2 className="section-title">D&iacute;ganos sobre cualquier cambio reciente</h2>

      <p><b>Perdi&oacute; {all[k]['first-name']} la cobertura m&eacute;dica elegible entre 20/2/{new Date().getFullYear()} y 21/4/{new Date().getFullYear()}?</b></p>


      <label htmlFor="yes" className="radio-label">
        <input type="radio" name="cover-loss" id="yes" value={'si'} onChange={() => setOpenDate(true)} />
        <span>Si</span>
      </label>
      <label htmlFor="no" className="radio-label">
        <input type="radio" name="cover-loss" id="no" value={'no'} onChange={() => setOpenDate(false)} />
        <span>No</span>
      </label>

      {
        openDate && (

          <>


            <div className="container-inputs">
              <label className="label-input">
                <p><b>Cu&aacute;l fue el &uacute;ltimo dia de cobertura de {all[k]['first-name']}</b></p>

                <div className="dob-inputs">
                  <input
                    type="number"
                    id="change-month"
                    name="change-month"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    type="number"
                    id="dob-day"
                    name="change-day"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                  />
                  <input
                    type="number"
                    id="change-year"
                    name="change-year"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </label>
            </div>

            <label htmlFor="plan-name" className="label-input">
              <span>Ingrese el nombre del plan.</span>
              <span className="caption">Opcional</span>
              <input type="text" name="plan-name" id="plan-name" />
            </label>

          </>
        )
      }

      <button type="submit" className="green-btn">Guardar y continuar</button>


    </form>
  )
}
