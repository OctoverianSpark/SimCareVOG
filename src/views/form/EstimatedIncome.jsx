import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents]
export default function EstimatedIncome() {

  const [params, setParams] = useSearchParams()
  const [input, openInput] = useState(false)

  const k = params.get('k')

  const [totalIncome, setTotal] = useState(all[k]['incomes'].reduce((acc, act) => parseFloat(acc['value'] ?? 0) + parseFloat(act['value'] ?? 0), 0))
  const [yearIncome, setYear] = useState(totalIncome * 12)


  const goTo = e => {
    e.preventDefault()

    if (k == 0) {
      client['total-income'] = yearIncome
      setSessionToJSON('client', client)
    }
    else {
      dependents[k - 1]['total-income'] = yearIncome
      setSessionToJSON('dependents', dependents)
    }

    if (k < (all.length - 1)) {
      location.href = '/income?k=' + (parseInt(k) + 1)
    } else {
      location.href = 'section3-welcome'
    }


  }

  return (
    <form method="post" className="estimated-income" onSubmit={goTo}>

      <h1 className="section-title">Ingreso estimado de {all[k]['first-name']} para este año <br />({new Date().getFullYear()})</h1>

      <p>
        Aseg&uacute;rese de incluir los ingresos que {all[k]['first-name']} recibi&oacute;, asi como los que espera recibir el resto de {new Date().getFullYear()}.
      </p>

      <div className="estimation-container">
        <p><b>Ingreso estimado de {all[k]['first-name']} para {new Date().getFullYear()}</b></p>
        <p>
          Seg&uacute;n la cantidad total de ingresos de abril de la pagina anterior (${totalIncome} - $0 en gastos)
        </p>

        <div className="income-calc">
          <div className="data">
            <p><b>$ {totalIncome}</b></p>
            <p>Ingreso mensual total</p>
          </div>
          <span>X</span>
          <div className="data">
            <p><b>12</b></p>
            <p>meses del año</p>
          </div>
          <span>=</span>
          <div className="data data-total">
            <p><b>$ {totalIncome * 12}</b></p>
            <p>Ingreso calculado de {new Date().getFullYear()}</p>
          </div>

        </div>

        <span className="caption">Si sus ingresos cambian a lo largo del año, esta cantidad probablemente no sea correcta.</span>

      </div>

      <p>
        <b>
          Es ${yearIncome} una buena estimaci&oacute;n de los ingresos de {all[k]['first-name']} para {new Date().getFullYear()}
        </b>
      </p>

      <label htmlFor="yes" className="radio-label">
        <input type="radio" name="total-income" id="yes" value={yearIncome} onChange={() => { openInput(false) }} />
        <span>Se espera que sea alrededor de esta cantidad</span>
      </label>
      <label htmlFor="no" className="radio-label">
        <input type="radio" name="total-income" id="no" onChange={() => { openInput(true) }} />
        <span>La cantidad posiblemente sea diferente a esta</span>
      </label>

      {
        input && (

          <label htmlFor="total" className="label-input">
            <span>Ingresa la cantidad</span>
            <input type="text" name="total-income" id="total" onChange={e => setYear(parseFloat(e.target.value))} />
          </label>
        )
      }

      <p className='labeled-p'>Ingreso estimado de {all[k]['first-name']} para {new Date().getFullYear()} <span>$ {yearIncome}</span></p>

      <button type="submit" className="green-btn">Guardar y Continuar</button>


    </form>
  )
}
