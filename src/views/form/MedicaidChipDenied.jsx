import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)

export default function MedicaidChipDenied() {


  const [dates, setDates] = useState(all.map(x => false))
  const [disabled, setDisabled] = useState(false)

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

    const formData = new FormData(e.target)


    formData.entries().forEach(([key, value]) => {
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
    location.href = '/income-info'

  }

  return (
    <form className="medicaid-chip-denied w-120" onSubmit={goTo}>

      <h1 className="section-title">Denegaci&oacute;n reciente de Medicaid o CHIP</h1>
      <p><b>Se determin&oacute; que alguna de estas personas no era elegible para Medicaid o CHIP desde 21/2/{new Date().getFullYear()}</b></p>


      {
        all.map((cover, i) => (
          <label htmlFor={i} key={i} className="checkbox-label">
            <input type="checkbox" name={`medicaid-chip-denied,${i}`} id={i} checked={dates[i] ?? false} onChange={e => openDate(i, e)} disabled={disabled} />
            <span>{cover['first-name']}</span>
          </label>
        ))
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
                  <p><b>Ingrese la fecha en la carta de rechazo de {all[i]['first-name']}</b></p>

                  <div className="dob-inputs">
                    <input
                      type="number"
                      id="denied-month"
                      name={`denied-month,${i}`}
                      placeholder="MM"
                      min="1"
                      max="12"
                      required
                    />
                    <input
                      type="number"
                      id="denied-day"
                      name={`denied-day,${i}`}
                      placeholder="DD"
                      min="1"
                      max="31"
                      required
                    />
                    <input
                      type="number"
                      id="denied-year"
                      name={`denied-year,${i}`}
                      placeholder="YYYY"
                      min="1900"
                      max={new Date().getFullYear()}
                      required
                    />
                  </div>
                </label>
              </div>


              <br />
            </>

          )

        }


        )}

      <button type="submit" className="green-btn">Guardar y Continuar</button>

    </form>
  )
}
