import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { MONTHS } from '../../utils/helpers'
import { useSearchParams } from 'react-router-dom'
import Select from 'react-select'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents]

const incomeTypes = [
  { value: 'Empleo', label: 'Empleo (como sueldos, salarios, comisiones o propinas)' },
  { value: 'Empleo por cuenta propia', label: 'Empleo por cuenta propia (como servicios a terceros)' },
  { value: 'Desempleo', label: 'Beneficios por desempleo' },
  { value: 'SeguroSocial', label: 'Ingresos del Seguro Social (excepto SSI)' },
  { value: 'Jubilación', label: 'Jubilación o pensiones' },
  { value: 'Inversiones', label: 'Intereses, dividendos o ganancias de capital' },
  { value: 'Alquileres', label: 'Ingresos por alquiler de propiedades' },
  { value: 'NegocioPropio', label: 'Ingresos de negocio propio' },
  { value: 'DistribucionesIRA', label: 'Distribuciones de IRA o 401(k)' },
  { value: 'Anualidades', label: 'Ingresos por anualidades o fideicomisos' },
  { value: 'Manutencion', label: 'Manutención del cónyuge (alimony, ordenado antes de 2019)' },
  { value: 'Premios', label: 'Premios en efectivo, loterías o juegos de azar' },
  { value: 'Otros', label: 'Otros ingresos imponibles' }
];


export default function Income() {


  const [params, setParams] = useSearchParams()

  const k = parseInt(params.get('k'))

  const [incomes, setIncomes] = useState(all[k]['incomes'] ?? [])
  const [IncomeForm, openIncomeForm] = useState(false)
  const [BillForm, openBillForm] = useState(false)
  const [updating, setUpdating] = useState(null)
  const [type, setIncomeType] = useState({})
  const [description, setDescription] = useState('')
  const [value, setIncome] = useState(0)

  const goTo = e => {
    e.preventDefault()

    if (k === 0) {

      client['incomes'] = incomes
      setSessionToJSON('client', client)

    } else {

      dependents[k - 1]['incomes'] = incomes
      setSessionToJSON('dependents', dependents)
    }

    if (params.get('final-check')) {
      location.href = '/final-check'
    } else {

      location.href = '/estimated-income?k=' + k
    }


  }

  const addIncomeTo = () => {

    const payload = { type, description, value }
    setIncomes(prev => {
      console.log(prev)
      const updated = [...prev]
      updated.push(payload)
      return updated
    })
    openIncomeForm(false)
    setIncome(0)
    setDescription('')
    setType({})

  }

  const deleteIncome = (i) => {


    setIncomes(prev => {

      const updated = [...prev]

      updated.splice(i, 1)

      return updated

    })




  }

  const openIncomeUpdate = index => {

    setUpdating(index)
    openIncomeForm(true)
    setIncomeType(incomes[index]['type'])
    setDescription(incomes[index]['description'])
    setIncome(parseInt(incomes[index]['value']))

  }

  const updateIncome = index => {

    const payload = { type, description, value }

    setIncomes(prev => {
      const updated = [...prev]
      updated[index] = payload
      return updated
    })

    setUpdating(false)
    setIncome(0)
    setIncomeType({})
    setDescription('')
    openIncomeForm(false)

  }

  return (
    <form className="income w-200" method='POST' onSubmit={goTo}>


      <h2 className="section-title">Ingresos de {all[k]['first-name']} para este mes <br />
        ({MONTHS[new Date().getMonth()]} {new Date().getFullYear()})
      </h2>

      <p>Ingrese cada tipo de ingreso que {all[k]['first-name']} reciba este mes. Si {all[k]['first-name']} no recibe ingresos este mes, pero los recibe durante otros meses en 2025, informe eso en la p&aacute;gina siguiente.</p>



      <div className="blue-bordered-container">
        <div className="text">
          <p><b>Aseg&uacute;rese de que la informaci&oacute;n de ingresos sea correcta</b></p>
          <p className="caption">La siguiente informaci&oacute;n de ingresos se complet&oacute; a partir de la solicitud anterior de {all[k]['first-name']}. Si los ingresos han cambiado, aseg&uacute;rese de actualizarlos</p>
        </div>

      </div>


      <div className="form-section">
        <h2 className="section-title">Agregue los ingresos de {MONTHS[new Date().getMonth()]} ${incomes.reduce((acc, act) => parseInt(acc) + parseInt(act['value'] ?? 0)
          , 0)}</h2>

        <div className="incomes">

          {
            incomes.map((x, i) => (
              <div key={i} className="container-income">
                <span><b>${x['value']}</b></span>
                <span>{x['type']['value']} : {x['description']}</span>
                <div className="actions">
                  <a onClick={() => openIncomeUpdate(i)}>Editar</a>
                  <a onClick={() => deleteIncome(i)}>Eliminar</a>
                </div>

              </div>
            ))
          }
        </div>

        <button type="button" className="blue-btn w-60" onClick={e => openIncomeForm(true)}>Agregar {incomes.length > 0 ? 'mas ingresos' : 'ingreso'}</button>

        {
          IncomeForm && (

            <div className="blue-labeled-container">

              <div className="form">
                <p>
                  Primero, elija un tipo de ingreso. <br />Luego, ingrese la cantidad y cualquier otra informaci&oacute;n que necesitemos sobre este ingreso
                </p>
                <label htmlFor="income-type" className="label-input">
                  <span>Tipo de ingreso</span>
                  <Select
                    options={incomeTypes}
                    className='select'
                    classNamePrefix={'select'}
                    placeholder='Selecciona...'
                    onChange={setIncomeType}
                    value={type ?? null}
                  />
                </label>

                <label htmlFor="income-description" className="label-input">
                  <span>Descripcion del trabajo</span>
                  <input type="text" id="income-description" onChange={e => setDescription(e.target.value)} value={description} />
                </label>

                <label htmlFor="income" className="label-input">
                  <span>Ingreso neto estimado para {MONTHS[new Date().getMonth()]}</span>
                  <span className="caption">Ingrese el ingreso neto (despues de descontar los gastos comerciales). <br />Este puede ser un numero positivo (beneficio) o un n&uacute;mero negativo (p&eacute;rdida)</span>
                  <input type="number" id="income" placeholder='Ingresa el monto' className='w-60' onChange={e => setIncome(e.target.value)} value={value} />
                </label>
                <div className="actions">
                  <button type="button" className="green-btn" onClick={() => {
                    if (updating === null) addIncomeTo()
                    else updateIncome(updating)
                  }}>Agregar</button>
                  <button type="button" className="blue-btn" onClick={() => openIncomeForm(false)}>Cancelar</button>
                </div>


              </div>

            </div>
          )
        }

      </div>

      <button type="submit" className="green-btn">Guardar y Continuar</button>


    </form>
  )
}
