import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function DirConfirm() {


  return (
    <div className='dir-confirm'>

      <h2 className="section-title">Revise la direccion de todos</h2>

      <p><b>La direcci&oacute;n residencial de {client['first-name']}, {Object.keys(dependents).map(key => {
        return ` ${dependents[key]['first-name']}${key == dependents.length - 1 ? ':' : ','}`
      })}</b></p>

      <div className="gray-container">
        <p>{`${client['house-direction']['first-direction']} ${client['house-direction']['second-direction']} ${client['house-direction']['city']} ${client['house-direction']['state']} ${client['house-direction']['zipcode']}`.toUpperCase()}</p>
      </div>

      <button type="button" className='green-btn' onClick={e => location.href = '/house-info'}>Guardar y continuar</button>

    </div>
  )
}
