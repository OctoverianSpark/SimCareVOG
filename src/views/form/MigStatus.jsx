import React, { useEffect, useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(cover => cover['citizen'] == false)

export default function MigStatus() {

  const [qParams, setQParams] = useSearchParams()
  const [showMigs, setShowMigs] = useState(false)
  const [promptValue, setPromptValue] = useState('')



  const k = parseInt(qParams.get('k')) || 0

  const [disabled, setDisabled] = useState(false)


  const goTo = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)


    data.entries().forEach(([key, value]) => {
      if (value === 'on') return
      all[k][key] = value
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

    if ((k + 1) == all.length) {
      location.href = '/mig-status-2'
    } else {
      location.href = `/mig-status?k=${k + 1}`
    }



  }


  return (
    <form className="mig-status mb-20" method="POST" onSubmit={goTo}>

      <h2 className="section-title">Estatus Migratorio de {all[k]['first-name'] ?? ''}</h2>

      <div className="yellow-bordered-container">
        <div className="text">

          <h2 className="section-title">La Acci&oacute;n Diferida para los Llegados en la Infancia (DACA) ya no es un estatus migratorio elegible en Florida.</h2>
          <p><b>No seleccione "Si"</b> a continuaci&oacute;n si {all[k]['first-name'] ?? ''}:</p>

          <ul>
            <li>Tiene el estatus de Acci&oacute;n Diferida como beneficiario de la Acci&oacute;n Diferida para los Llegados en la Infancia (DACA)</li>

          </ul>
        </div>

      </div>

      <p><b>Tiene {all[k]['first-name'] ?? ''} estatus de inmigracion elegible</b></p>

      <label htmlFor="status-yes" className="radio-label">
        <input type="radio" name="elegible-mig-status" id="status-yes" value={'si'} onChange={e => setShowMigs(true)} />
        <span>Si. {all[k]['first-name'] ?? ''} tiene un estatus de inmigracion elegible.</span>
      </label>
      <label htmlFor="status-no" className="radio-label">
        <input type="radio" name="elegible-mig-status" id="status-no" value={'no'} onChange={e => {
          setShowMigs(false)
          setPromptValue('')
        }}
        />
        <span>Me gustaria continuar con la solicitud sin responder esta pregunta. Entiendo que si no
          la respondo. <b>{all[k]['first-name'] ?? ''} no sera elegible para la cobertura <br /> completa de Medicaid o del Mercado</b> y solo sera considerado para la cobertura de servicios de emergencia,          incluyendo los servicios de parto y nacimiento.</span>
      </label>


      {
        showMigs && (

          <div className="form-section">
            <p><b>Seleccione el tipo de documento que corresponde con la documentaci&oacute;n y el estatus mas reciente de {all[k]['first-name'] ?? ''}</b></p>
            <p className="caption">Opcional</p>



            <div className="radio-text">

              <label htmlFor='permanent-resident' className="radio-label">

                <input type="radio" name="mig-status" id="permanent-resident" onChange={e => setPromptValue(e.target.id)} checked={promptValue === 'permanent-resident'} disabled={disabled} />

                <div className="text">

                  <span>Tarjeta de Residencia Permanente (Tarjeta Verde) o Permiso de Reingreso</span>
                  <br />
                  <span className="caption">I-551, sello temporal I-551. I-327</span>

                </div>

              </label>

              {
                promptValue === 'permanent-resident' && (
                  <input type="text" name="mig-status" />
                )
              }



            </div>


            <div className="radio-text">

              <label htmlFor='inmigrant-visa' className="radio-label">

                <input type="radio" name="mig-status" id="inmigrant-visa" onChange={e => setPromptValue(e.target.id)} value={'I-551'} disabled={disabled} checked={promptValue === 'inmigrant-visa'} />

                <div className="text">

                  <span>Visa de inmigrante legible por maquina</span>
                  <br />
                  <span className="caption">con lenguaje I-551 temporal</span>

                </div>

              </label>


            </div>



            <div className="radio-text">

              <label htmlFor='employee-auth' className="radio-label">

                <input type="radio" name="mig-status" id="employee-auth" onChange={e => setPromptValue(e.target.id)} disabled={disabled} checked={promptValue === 'employee-auth'} />

                <div className="text">

                  <span>Tarjeta de Autorizacion de Empleo</span>
                  <br />
                  <span className="caption">I-766</span>

                </div>

              </label>


            </div>
            <div className="radio-text">

              <label htmlFor='in/out' className="radio-label">

                <input type="radio" name="mig-status" id="in/out" onChange={e => setPromptValue(e.target.id)} disabled={disabled} checked={promptValue === 'in/out'} />

                <div className="text">

                  <span>Registro de entrada/salida</span>
                  <br />
                  <span className="caption">I-94, I-94A</span>

                </div>

              </label>


              {
                promptValue === 'in/out' && (

                  <input type="text" name="mig-status" id="in/out" />

                )
              }


            </div>
            <div className="radio-text">

              <label htmlFor='travel-docs' className="radio-label">

                <input type="radio" name="mig-status" id="travel-docs" onChange={e => setPromptValue(e.target.id)} value={'I-571'} disabled={disabled} checked={promptValue === 'travel-docs'} />

                <div className="text">

                  <span>Documentos de viaje del refugiado</span>
                  <br />
                  <span className="caption">I-571</span>

                </div>

              </label>


            </div>
            <div className="radio-text">

              <label htmlFor='no-inmigrant-status' className="radio-label">

                <input type="radio" name="mig-status" id="no-inmigrant-status" onChange={e => setPromptValue(e.target.id)} disabled={disabled} checked={promptValue === 'no-inmigrant-status'} />

                <div className="text">

                  <span>Estatus de estudiante no inmigrante o visitante de intercambio</span>
                  <br />
                  <span className="caption">I-20, DS2019</span>

                </div>

              </label>

              {
                promptValue === 'no-inmigrant-status' && (
                  <input type="text" name="mig-status" />
                )
              }


            </div>



            <div className="radio-text">

              <label htmlFor='action-advise' className="radio-label">

                <input type="radio" name="mig-status" id="action-advise" onChange={e => setPromptValue(e.target.id)} value={'I-797'} disabled={disabled} checked={promptValue === 'action-advise'} />

                <div className="text">

                  <span>Aviso de Acci&oacute;n</span>
                  <br />
                  <span className="caption">I-797</span>

                </div>

              </label>


            </div>

            <div className="radio-text">

              <label htmlFor='other' className="radio-label">

                <input type="radio" name="mig-status" id="other" onChange={e => setPromptValue(e.target.id)} disabled={disabled} checked={promptValue === 'other'} />

                <div className="text">

                  <span>Otro documento o estatus</span>

                </div>

              </label>


              {
                promptValue === 'other' && (
                  <input type="text" name="mig-status" />
                )
              }

            </div>

            <div className="radio-text">

              <label htmlFor='passport' className="radio-label">

                <input type="radio" name="mig-status" id="passport" onChange={e => setPromptValue(e.target.id)} checked={promptValue === 'passport'} value={'pasaporte'} disabled={disabled} />

                <div className="text">

                  <span>Pasaporte extranjero vigente</span>

                </div>

              </label>



            </div>



            <hr />
            <label htmlFor="none" className="radio-label">
              <input type="radio" name="mig-status" id="none" onClick={e => setPromptValue('none')} checked={promptValue === 'none'} onChange={e => setDisabled(true)} required />
              <span>Ninguno de estos</span>
            </label>

            <label htmlFor="delete">

              <button type="button" className="blue-btn" onClick={e => {
                setPromptValue('')
                setDisabled(false)
              }}>Borrar su selecci&oacute;n</button>
            </label>


          </div>


        )
      }


      <button type="submit" className="green-btn">Guardar y Continuar</button>

    </form>
  )
}
