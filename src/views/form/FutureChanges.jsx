import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'



const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)
export default function FutureChanges() {

  const [openDate, setOpenDate] = useState(false)

  const [params] = useSearchParams()

  const k = parseInt(params.get('k')) || 0

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    all[k]['cover-will-be-lost'] = data.get('cover-will-be-lost')

    if (k == 0) {
      setSessionToJSON('client', all[k])
    } else {
      dependents[k - 1] = all[k]
      setSessionToJSON('dependents', dependents)
    }
    if ((k + 1) < all.length) {
      location.href = `/future-changes?k=${k + 1}`
    } else {

      location.href = '/life-changes'
    }

  }
  return (
    <form className='future-changes' method="post" onSubmit={goTo}>

      <h2 className="section-title">D&iacute;ganos sobre cualquier cambio reciente</h2>

      <p><b>Perder&aacute; {all[k]['first-name']} la cobertura m&eacute;dica elegible entre 22/4/{new Date().getFullYear()} y 20/6/{new Date().getFullYear()}</b></p>

      <label htmlFor="yes" className="radio-label">
        <input type="radio" name="cover-will-be-lost" id="yes" value={'si'} onChange={() => setOpenDate(true)} />
        <span>Si</span>
      </label>

      <label htmlFor="no" className="radio-label">
        <input type="radio" name="cover-will-be-lost" id="no" value={'no'} onChange={() => setOpenDate(false)} />
        <span>No</span>
      </label>


      {
        openDate && (

          <>


            <div className="container-inputs">
              <label className="label-input">
                <p><b>Cuando ser&aacute; el &uacute;ltimo dia de cobertura de {all[k]['first-name']}</b></p>

                <div className="dob-inputs">
                  <input
                    type="number"
                    id="change-month"
                    name="future-month"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    type="number"
                    id="dob-day"
                    name="future-day"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                  />
                  <input
                    type="number"
                    id="future-year"
                    name="change-year"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </label>
            </div>

          </>
        )
      }

      <button type="submit" className="green-btn">Guardar y continuar</button>

    </form>
  )
}
