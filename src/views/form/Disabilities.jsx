import React, { useState } from 'react'
import { getSessionToJSON } from '../../utils/functions'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)
export default function Disabilities() {


  const [medicalNeeds, setMedicalNeeds] = useState([])
  const [specialHelp, setSpecialHelp] = useState([])

  const goTo = e => {
    e.preventDefault()
    location.href = '/medicaid-chip-end'
  }

  return (
    <form method='POST' className="disabilities w-150" onSubmit={goTo}>

      <h2 className="section-title">Incapacidades y ayuda con las actividades</h2>
      {
        all.map((x, i) => (

          <div key={i} className="form-section">
            <p><b>{x['first-name']} tiene una necesidad de atenci&oacute;n m&eacute;dica especial, una incapacidad fisica o una condici&oacute;n de salud mental que limita su capacidad para trabajar, asistir a la escuela o atender sus necesidades diarias?</b></p>

            <label htmlFor={'medical-yes-' + i} className="radio-label">
              <input type="radio" id={'medical-yes-' + i} name={"medical-special-needs-" + i} value={'si'} onChange={e => setMedicalNeeds(prev => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} checked={medicalNeeds[i] === 'si'} />
              <span>Si</span>
            </label>
            <label htmlFor={'medical-no-' + i} className="radio-label">
              <input type="radio" id={'medical-no-' + i} name={"medical-special-needs-" + i} value={'no'} onChange={e => setMedicalNeeds(prev => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} checked={medicalNeeds[i] === 'no'} />
              <span>No</span>
            </label>

            <button type="button" className="blue-btn w-50" onClick={() => {
              setMedicalNeeds(prev => {
                const updated = [...prev]
                updated[i] = ''
                return updated
              })
            }}>Borrar su selecci&oacute;n</button>



            <p><b>{x['first-name']} necesita ayuda con las actividades diarias (como vestirse o usar el baño), o vive en un centro de cuidado m&eacute;dico o en un asilo de ancianos?</b></p>
            <span className="caption">Opcional</span>

            <label htmlFor={'special-yes-' + i} className="radio-label">
              <input type="radio" id={'special-yes-' + i} name={"special-needs-" + i} value={'si'} onChange={e => setSpecialHelp(prev => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} checked={specialHelp[i] === 'si'} />
              <span>Si</span>
            </label>
            <label htmlFor={'special-no-' + i} className="radio-label">
              <input type="radio" id={'special-no-' + i} name={"special-needs-" + i} value={'no'} onChange={e => setSpecialHelp(prev => {
                const updated = [...prev]
                updated[i] = e.target.value
                return updated
              })} checked={specialHelp[i] === 'no'} />
              <span>No</span>
            </label>

            <button type="button" className="blue-btn w-50" onClick={() => {
              setSpecialHelp(prev => {
                const updated = [...prev]
                updated[i] = ''
                return updated
              })
            }}>Borrar su selecci&oacute;n</button>
          </div>

        ))
      }

      <button type="submit" className="green-btn">Guardar y Continuar</button>

    </form>
  )
}
