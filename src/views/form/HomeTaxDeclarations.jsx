import React, { useEffect, useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { MONTHS } from '../../utils/helpers';
import DependentsForm from '../components/DependentsForm';

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])


export default function HomeTaxDeclarations() {


  const [showDependents, setShow] = useState(false)
  const [dependentsForm, setDependentsForm] = useState(false)
  const [marriage, setMarriage] = useState({})
  useEffect(() => {

    Object.keys(dependents).forEach(key => {

      if (dependents[key][`${client['first-name']}-relationship`] === 'esposo/a') {
        setMarriage(dependents[key])
      }

    })




  }, [])


  const goTo = e => {

    e.preventDefault()

    const data = new FormData(e.target)

    data.entries().forEach(([key, value]) => {

      if (key === 'dependents') {

        if (!client['dependents']) client[key] = []

        client[key].push(value)

      } else {
        client[key] = value
      }

    })

    sessionStorage.setItem('client', JSON.stringify(client))

    location.href = '/where-they-live'

  }

  const saveDep = e => {

    e.preventDefault()
    const data = new FormData(e.target)

    let body = {}

    data.entries().forEach(([key, value]) => {
      body[key] = value
    })

    body['first-name'] = body['first-name'].replace(body['first-name'][0], body['first-name'][0].toUpperCase())
    body['last-name'] = body['last-name'].replace(body['last-name'][0], body['last-name'][0].toUpperCase())
    body['cover'] = false

    setShow(false)

    dependents.push(body)

    sessionStorage.setItem('dependents', JSON.stringify(dependents))

    setTimeout(() => {
      setShow(true)
    }, 1);
    setDependentsForm(false)

  }



  return (
    <div className="home-tax-container">

      <form className='home-tax-declarations' onSubmit={goTo}>
        <h2 className="section-title">Declaraciones de impuestos de los hogares</h2>
        <p>Para ser elegible para un cr&eacute;dito tributario acticipado para la prima y otros ahorros, el hogar debe presentar una declaracion de impuestos federales de {new Date().getUTCFullYear()}</p>



        <h2 className="section-title">Declaracion de Impuestos de {client['first-name']} del {new Date().getUTCFullYear()}</h2>

        <p>Una declaración de impuestos de {new Date().getFullYear()}, que la mayoría de las personas presentarán antes del {new Date().getFullYear() + 1} de {MONTHS[new Date().getMonth()]}, informa los ingresos obtenidos en {new Date().getFullYear()}.</p>


        <div className="form-section">
          <p><b>{client['first-name']} presentar&aacute; una declaraci&oacute;n federal de impuestos conjunta {new Date().getFullYear()} {client['civil-state'] === 'casado(a)' ? `con ${client['married-with']}` : ''}</b></p>

          <div className="container-inputs">
            <label htmlFor="declare-yes" className="radio-label">
              <input type="radio" name="will-present-federal-tax-declaration" id="declare-yes" value={'si'} />
              <span>Si</span>
            </label>

            <label htmlFor="declare-no" className="radio-label">
              <input type="radio" name="will-present-federal-tax-declaration" id="declare-no" value={'no'} />
              <span>No</span>
            </label>
          </div>

          <p>
            <b>
              {client['first-name']} {client['civil-state'] === 'casado(a)' ? `y ${client['married-with']} reclamarán` : 'reclamará'} alg&uacute;n dependiente en su declaraci&oacute;n federal de impuestos para {new Date().getFullYear()}?
            </b>
          </p>

          <div className="container-inputs">

            <label htmlFor="dependents-yes" className="radio-label">
              <input type="radio" name="will-declare-dependents" id="dependents-yes" value={'si'} onChange={e => setShow(true)} />
              <span>Si</span>
            </label>

            <label htmlFor="dependents-no" className="radio-label">
              <input type="radio" name="will-declare-dependents" id="dependents-no" value={'no'} onChange={e => setShow(false)} />
              <span>No</span>
            </label>
          </div>



        </div>

        {
          showDependents && Object.keys(dependents).map(key => {


            if (dependents[key][`${client['first-name']}-relationship`] !== 'esposo/a')
              return (

                <label htmlFor={key} className="checkbox-label" key={key}>

                  <input type="checkbox" name={`dependents`} id={`${key}`} value={`${dependents[key]['first-name']} ${dependents['last-name']}`} />
                  <span>{dependents[key]['first-name']}</span>

                </label>

              )

          })
        }

        {
          showDependents && (
            <button type="button" className='blue-btn w-81' onClick={e => setDependentsForm(true)}>Agregar un dependiente</button>
          )
        }

        <button type="submit" className='green-btn'>Guardar y continuar</button>


      </form>


      {dependentsForm && (
        <DependentsForm
          client={client}
          dependentsForm={dependentsForm}
          onClose={() => setDependentsForm(false)}
          saveDep={saveDep}
        />
      )}


    </div>
  )
}
