import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)


export default function RecentChanges() {


  const [dates, setDates] = useState(all.map(x => false))
  const [disabled, setDisabled] = useState(false)
  const [params] = useSearchParams()
  const k = parseInt(params.get('k')) || 0


  const openDate = (index, e) => {


    setDates(prev => {
      const newArr = [...prev]
      newArr[index] = e.target.checked
      return newArr

    })


  }

  const closeDates = e => {

    setDates(all.map(x => false))
    setDisabled(e.target.checked)



  }


  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)


    data.entries().forEach(([key, value]) => {
      const splitedKey = key.split(',')

      all[splitedKey[1]][splitedKey[0]] = value
      console.log(splitedKey, value)
    })

    all.forEach((cover, i) => {
      if (cover === client) {
        setSessionToJSON('client', cover)
      } else {
        dependents.forEach(dep => {
          if (cover === dep) {
            dependents[i - 1] = cover
          }
        })


        setSessionToJSON('dependents', dependents)
      }

    })



    location.href = '/future-changes'


  }

  return (
    <form method="post" className="recent-changes" onSubmit={goTo}>
      <h2 className="section-title">D&iacute;ganos sobre cualquier cambio reciente</h2>

      <p><b>Perdi&oacute; {all[k]['first-name']} la cobertura m&eacute;dica elegible entre 20/2/{new Date().getFullYear()} y 21/4/{new Date().getFullYear()}?</b></p>

      {
        all.map((cover, i) => {
          return (

            <label htmlFor={i} key={i} className="checkbox-label">
              <input type="checkbox" name={'cover-loss,' + i} id={i} onChange={e => openDate(i, e)} checked={dates[i] === true} disabled={disabled} value={i} />
              <span>{cover['first-name']}</span>
            </label>


          )

        }
        )
      }
      <hr />
      <label htmlFor='none' className="checkbox-label">
        <input type="checkbox" id='none' onChange={closeDates} />
        <span>Ninguna de estas personas</span>
      </label>

      {
        dates.map((date, i) => {

          return date && (

            <>

              <div className="container-inputs">
                <label className="label-input">
                  <p><b>Cu&aacute;l fue el &uacute;ltimo dia de cobertura de {all[i]['first-name']}</b></p>

                  <div className="dob-inputs">
                    <input
                      type="number"
                      id="change-month"
                      name={`change-month,${i}`}
                      placeholder="MM"
                      min="1"
                      max="12"
                      required
                    />
                    <input
                      type="number"
                      id="dob-day"
                      name={`change-day,${i}`}
                      placeholder="DD"
                      min="1"
                      max="31"
                      required
                    />
                    <input
                      type="number"
                      id="change-year"
                      name={`change-year,${i}`}
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
                <input type="text" name={"plan-name," + i} id="plan-name" />
              </label>

              <br />
            </>

          )

        }


        )}




      <button type="submit" className="green-btn">Guardar y continuar</button>


    </form>
  )
}
