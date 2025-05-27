import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'



const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)
export default function FutureChanges() {

  const [dates, setDates] = useState(all.map(x => false))
  const [disabled, setDisabled] = useState(false)

  const [params] = useSearchParams()

  const k = parseInt(params.get('k')) || 0

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    data.entries().forEach(([key, value]) => {

      const splitedKey = key.split(',')
      all[splitedKey[1]][splitedKey[0]] = value

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

    location.href = '/life-changes'

  }

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

  return (
    <form className='future-changes' method="post" onSubmit={goTo}>

      <h2 className="section-title">D&iacute;ganos sobre los pr&oacute;ximos cambios</h2>
      <p><b>Alguien perder&aacute; la cobertura m&eacute;dica calificada entre 23/5/{new Date().getFullYear()} y 21/7/{new Date().getFullYear()} ?</b></p>
      {
        all.map((cover, i) => (
          <label htmlFor={i} key={i} className="checkbox-label">
            <input type="checkbox" name={'future-change,' + i} id={i} onChange={e => openDate(i, e)} checked={dates[i] === true} disabled={disabled} value={i} />
            <span>{cover['first-name']}</span>
          </label>
        )
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
                      id="future-month"
                      name={`future-month,${i}`}
                      placeholder="MM"
                      min="1"
                      max="12"
                      required
                    />
                    <input
                      type="number"
                      id="future-day"
                      name={`future-day,${i}`}
                      placeholder="DD"
                      min="1"
                      max="31"
                      required
                    />
                    <input
                      type="number"
                      id="future-year"
                      name={`future-year,${i}`}
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
                <input type="text" name={"future-name," + i} id="plan-name" />
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
