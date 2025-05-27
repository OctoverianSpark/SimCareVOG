import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"



const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => x['cover'] === 'true' || x['cover'] === true)
export default function MedicareInscription() {

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
        dependents.forEach((dep, index) => {
          if (cover === dep) {
            dependents[index] = cover
          }
        })


        setSessionToJSON('dependents', dependents)
      }

    })
    location.href = 'medicaid-chip-denied'



  }
  return (

    <form method='POST' className="medicare-inscription" onSubmit={goTo}>

      <h2 className="section-title">Inscripci&oacute;n en Medicare</h2>

      <p>La mayoria de las personas se inscriben en Medicare cuando cumplen 65 años, pero algunas son elegibles antes</p>

      <div className="blue-bordered-container">
        <div className="brdr-blue"></div>
        <div className="text">

          <p><b>Medicare vs Medicaid</b></p>

          <span>Cuando responda, asegúrese de informarnos sobre la inscripción a Medicare.
            Le preguntaremos sobre Medicaid (Ilamado Texas Medicaid en Texas) mas
            adelante en la solicitud.</span>
        </div>

      </div>



      <div className="form-section">

        <p><b>Alguna de estas personas est&aacute; inscrito en medicare o lo estar&aacute; en los pr&oacute;ximos 3 meses? </b></p>
        <span className="caption">Seleccione todas las que apliquen</span>

        {
          all.map((cover, i) => (
            <label htmlFor={i} key={i} className="checkbox-label">
              <input type="checkbox" name={`medicare-inscription,${i}`} id={i} checked={dates[i] ?? false} onChange={e => openDate(i, e)} disabled={disabled} />
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
                    <p><b>Ingrese la fecha de inicio de Medicare de {all[i]['first-name']}</b></p>

                    <div className="dob-inputs">
                      <input
                        type="number"
                        id="inscription-month"
                        name={`inscription-month,${i}`}
                        placeholder="MM"
                        min="1"
                        max="12"
                        required
                      />
                      <input
                        type="number"
                        id="inscription-day"
                        name={`inscription-day,${i}`}
                        placeholder="DD"
                        min="1"
                        max="31"
                        required
                      />
                      <input
                        type="number"
                        id="inscription-year"
                        name={`inscription-year,${i}`}
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
      </div>


      <button type="submit" className="green-btn">Guardar y Continuar</button>



    </form >

  )
}
