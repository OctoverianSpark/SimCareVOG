import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function DeleteHouseHold() {

  const [depIndex, setIndex] = useState(new URLSearchParams(location.search).get('k'))
  const [dependentRes, setRes] = useState(dependents[depIndex])
  const [params] = useSearchParams()
  const goTo = e => {
    e.preventDefault()

    const action = new FormData(e.target).get('action')


    switch (action) {
      case 'delete':

        dependents.splice(depIndex, 1)


        break
      case 'uncover':

        dependents[depIndex]['cover'] = false

        break
      default:
        break
    }



    sessionStorage.setItem('dependents', JSON.stringify(dependents))

    location.href = `/household${params.get('final-check') ? '?final-check=true' : ''}`


  }


  return (
    <form method='POST' className='delete-household' onSubmit={goTo}>

      <h2 className="section-title">Eliminar a {dependentRes['first-name']}</h2>
      <p><b>Eliminar a {dependentRes['first-name']} o cambiar sus necesidades de cobertura?</b></p>

      <div className="container-inputs">

        <label htmlFor="eliminate" className="radio-label">
          <input type="radio" name="action" id="eliminate" value={'delete'} />
          <span>Eliminar a {dependentRes['first-name']} de la solicitud</span>
        </label>
        <label htmlFor="uncover" className="radio-label">
          <input type="radio" name="action" id="uncover" value={'uncover'} />
          <span>Cambiar el estatus de {dependentRes['first-name']} a "No necesita cobertura" y mantengalo en la solicitud</span>
        </label>

      </div>

      <div className="actions">

        <button type="submit" className='green-btn'>Guardar y Continuar</button>
        <button onClick={e => location.href = "/household"} className='blue-btn'>Cancelar</button>
      </div>

    </form>
  )
}
