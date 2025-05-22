import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)

export default function MedicaidCHIPEnd() {

  const [ended, setEnded] = useState(false)
  const [params] = useSearchParams()
  const k = parseInt(params.get('k')) || 0
  const goTo = e => {
    e.preventDefault()

    const formData = new FormData(e.target)

    formData.entries().forEach(([key, value]) => {


      all[k][key] = value

    })

    if (all[k]['medicaid-chip-ends'] === 'no') {
      delete all[k]["medicaid-chip-end-day"]
      delete all[k]["medicaid-chip-end-month"]
      delete all[k]["medicaid-chip-end-year"]
    }

    if (k == 0) {
      setSessionToJSON('client', all[k])
    } else {
      dependents[k - 1] = all[k]
      setSessionToJSON('dependents', dependents)
    }

    if ((k + 1) < all.length) {
      location.href = `/medicaid-chip-end?k=${k + 1}`
    } else {
      location.href = '/medicaid-chip-denied?k=0'

    }



  }

  return (
    <form className="medicaid-chip-ends w-120" onSubmit={goTo}>

      <p><b>{all[k]['first-name']} tenia Medicaid o CHIP que terminaron recientemente o terminar&aacute;n pronto?</b></p>
      <span className="caption">Seleccione Si si uno le aplica:</span>
      <ul>
        <li className="caption">La cobertura de {all[k]['first-name']} termin&oacute; entre 21/1/{new Date().getFullYear()} y hoy</li>
        <li className="caption">La cobertura de {all[k]['first-name']} termin&oacute; entre hoy y 20/6/{new Date().getFullYear()}</li>
      </ul>

      <label htmlFor="yes" className="radio-label">
        <input type="radio" name="medicaid-chip-ends" id="yes" value='si' onChange={e => setEnded(true)} />
        <span>Si</span>
      </label>
      <label htmlFor="no" className="radio-label">
        <input type="radio" name="medicaid-chip-ends" id="no" value='no' onChange={e => setEnded(false)} />
        <span>No</span>
      </label>


      {
        ended && (
          <div className="form-section">
            <p><b>Ingrese el &uacute;ltimo dia de la cobertura de {client['first-name']}.</b></p>
            <span className="caption">Si no lo sabe, ingrese &uacute;ltimo d&iacute;a del mes en el que sabe que Alicia tuvo o tendr&aacute; cobertura, por ejemplo: 30/4/{new Date().getFullYear()}. La mayor parte de la cobertura finaliza el &uacute;ltimo dia del mes.</span>


            <div className="container-inputs">
              <label className="label-input" htmlFor="client-dob">

                <p className="caption">Este campo es requerido</p>
                <div className="dob-inputs">
                  <input
                    type="number"
                    id="medicaid-chip-end-month"
                    name="medicaid-chip-end-month"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    type="number"
                    id="medicaid-chip-end-day"
                    name="medicaid-chip-end-day"
                    placeholder="DD"
                    min="1"
                    max="31"
                    required
                  />
                  <input
                    type="number"
                    id="medicaid-chip-end-year"
                    name="medicaid-chip-end-year"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </label>
            </div>
          </div>
        )
      }

      <button type="submit" className="green-btn">Guardar y Continuar</button>


    </form>
  )
}
