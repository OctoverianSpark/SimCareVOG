import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])


export default function HouseHold() {

  const [params] = useSearchParams()
  const deleteDependent = (key) => {
    dependents.splice(key, 1)
    sessionStorage.setItem('dependents', JSON.stringify(dependents))

    location.reload()

  }

  return (

    <div className="household">


      <div className="household-container">
        <p><b>Necesita cobertura</b></p>


        {
          client['cover'] === 'true' && (

            <div className="household-block">
              <p><span>{client['first-name']}</span></p>
              <a href="/about-me?household=true">Editar</a>
            </div>
          )
        }
        {

          Object.keys(dependents).map(key => {

            if (dependents[key]['cover'] === true) {
              return (
                <div className="household-block" key={key}>
                  <p><span>{dependents[key]['first-name']}</span></p>
                  <div className="actions">
                    <a href={`/household/edit?k=${key}${params.get('final-check') ? '&final-check=true' : ''}`}>Editar</a>
                    <span className='separator'>|</span>
                    <a href={`/household/delete?k=${key}${params.get('final-check') ? '&final-check=true' : ''}`}>Eliminar</a>
                  </div>
                </div>
              )
            }
          }
          )
        }



      </div>
      <a href="/household/add" className="blue-btn">Agregar a una persona que necesita cobertura</a>


      <p><b>No necesita cobertura</b></p>
      <div className="household-container">
        {
          client['cover'] === 'false' && (

            <div className="household-block">
              <p><span>{client['first-name']}</span></p>
              <a href="/about-me?household=true">Editar</a>
            </div>
          )
        }
        {

          Object.keys(dependents).map(key => {

            if (dependents[key]['cover'] === false) {
              return (
                <div className="household-block" key={key}>
                  <p><span>{dependents[key]['first-name']}</span></p>
                  <div className="actions">
                    <a href={`/household/edit?k=${key}`}>Editar</a>
                    <span className='separator'>|</span>
                    <a href={`/household/delete?k=${key}`}>Eliminar</a>
                  </div>
                </div>
              )
            }
          }
          )
        }


      </div>


      <button type="button" className='green-btn' onClick={e => params.get('final-check') ? location.href = '/final-check' : location.href = '/medicare-inscription'}>Guardar y continuar</button>

    </div>


  )
}
