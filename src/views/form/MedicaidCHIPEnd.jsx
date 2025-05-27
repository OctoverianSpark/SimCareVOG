import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)

export default function MedicaidCHIPEnd() {

  const [params] = useSearchParams()
  const k = parseInt(params.get('k')) || 0

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
    <form className="medicaid-chip-ends w-120" onSubmit={goTo}>

      <h2 className="section-title">Termina la cobertura de Medicaid o CHIP</h2>



      <p><b>Alguien tuvo Medicaid o CHIP que termin&oacute; recientemente o terminar&aacute; pronto</b></p>
      <p className="caption">
        Seleccione el nombre de una persona si uno le aplica:
        <br />
        <ul>
          <li>Su cobertura termin&oacute; entre 21/2/{new Date().getFullYear()} y hoy</li>
          <li>Su cobertura terminar&aacute; entre hoy y 21/7/{new Date().getFullYear()}</li>
        </ul>
      </p>

      {
        all.map((cover, i) => (
          <label htmlFor={i} key={i} className="checkbox-label">
            <input type="checkbox" name={`medicaid-chip-end,${i}`} id={i} checked={dates[i] ?? false} onChange={e => openDate(i, e)} disabled={disabled} />
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
                  <p><b>Cu&aacute;l fue el &uacute;ltimo dia de cobertura de {all[i]['first-name']}</b></p>
                  <p className="caption">Si no lo sabe, ingrese el &uacute;ltimo d&iacute;a del mes en el que sabe que {all[i]['first-name']} tuvo o tendr&aacute; </p>

                  <div className="dob-inputs">
                    <input
                      type="number"
                      id="ends-month"
                      name={`ends-month,${i}`}
                      placeholder="MM"
                      min="1"
                      max="12"
                      required
                    />
                    <input
                      type="number"
                      id="ends-day"
                      name={`ends-day,${i}`}
                      placeholder="DD"
                      min="1"
                      max="31"
                      required
                    />
                    <input
                      type="number"
                      id="ends-year"
                      name={`ends-year,${i}`}
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
