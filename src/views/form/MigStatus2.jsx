import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])


export default function MigStatus2() {

  const [current, setCurrent] = useState({})
  const [qParams, setQParams] = useSearchParams()
  const [disabled, setDisabled] = useState()

  const k = parseInt(qParams.get('k') ?? -1)

  useEffect(() => {

    setCurrent(k < 0 ? client : dependents[k])

  }, [k])

  if (dependents.length === k) {
    location.href = '/militar-service'
  }

  useEffect(() => {

    setDisabled(false)
    if (current['citizen'] == 'true') {


      if ((k) == dependents.length - 1) {
        location.href = '/mig-status-2'
      } else {
        if (dependents[k + 1]['citizen'] == 'false') {
          setQParams({ k: k + 1 })

        } else {
          setQParams({ k: k + 2 })

        }
      }

    }


  }, [current])



  const goTo = (e) => {
    e.preventDefault()


    if (dependents.length === 0) location.href = '/militar-service'


    if (k == dependents.length - 1) {
      location.href = '/militar-service'

    } else {
      if (dependents[k + 1]['citizen'] === "false") {

        setQParams({ k: k + 1 })

      } else {
        setQParams({ k: k + 2 })

      }

    }

  }

  return (

    <form method='POST' className="mig-status-2" onSubmit={goTo}>

      <h2 className="section-title">Estatus migratorio de {current['first-name']}</h2>

      <p>Todas las preguntas sobre el estatus migratorio son opcionales, pero contestarlas hara que el obtener cobertura sea mas facil.</p>

      <label htmlFor="stranger-number" className="label-input">
        <span>El n&uacute;mero extranjero de {current['first-name']}</span>
        <span className="caption">Opcional</span>
        <input type="text" name="stranger-number" id="stranger-number" defaultValue={'A-'} />
      </label>
      <label htmlFor="card-number" className="label-input">
        <span>N&uacute;mero de tarjeta de {current['first-name']}</span>
        <span className="caption">Opcional</span>
        <input type="text" name="card-number" id="card-number" />
      </label>

      <label htmlFor="card-number" className="label-input">
        <span>N&uacute;mero de tarjeta de {current['first-name']}</span>
        <span className="caption">Opcional</span>
        <input type="text" name="card-number" id="card-number" />
      </label>

      <div className="container-inputs">
        <label className="label-input" htmlFor="client-dob">
          <span><b>Fecha de vencimiento del documento</b></span>
          <p className="caption">Opcional</p>
          <div className="dob-inputs">
            <input
              type="number"
              id="exp-day"
              name="exp-day"
              placeholder="DD"
              min="1"
              max="31"
            />
            <input
              type="number"
              id="exp-month"
              name="exp-month"
              placeholder="MM"
              min="1"
              max="12"
            />
            <input
              type="number"
              id="exp-year"
              name="exp-year"
              placeholder="YYYY"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </label>
      </div>


      <p><b>Tiene {current['first-name']} uno de estos tipos de documentos o estatus?</b></p>
      <span className="caption">Opcional.</span>


      <label htmlFor="tribal" className="checkbox-label">
        <input type="checkbox" name="status" id="tribal" value={'Documento que indica que es un miembro de una tribu reconocida a nivel federal o indio americano nacido en Canada'} disabled={disabled} />
        <span>Documento que indica que es un miembro de una tribu reconocida a nivel federal o indio americano nacido en Canada</span>
      </label>
      <label htmlFor="certificated-refugee" className="checkbox-label">
        <input type="checkbox" name="status" id="certificated-refugee" value={'Certificacion del Departamento de Salud y Servicios Humanos de los Estados Unidos (HHS), Oficina de Reasentamiento de Refugiados (ORR)'} disabled={disabled} />
        <span>Certificacion del Departamento de Salud y Servicios Humanos de los Estados Unidos (HHS), Oficina de Reasentamiento de Refugiados (ORR)</span>
      </label>

      <label htmlFor="elegibility" className="checkbox-label">
        <input type="checkbox" name="status" id="elegibility" value={'Carta de elegibilidad de la Oficina de Reasentamiento de Refugiados (ORR) (si es menor de 18 años)'} disabled={disabled} />
        <span>Carta de elegibilidad de la Oficina de Reasentamiento de Refugiados (ORR) (si es menor de 18 años)</span>
      </label>

      <label htmlFor="cuban/haitian" className="checkbox-label">
        <input type="checkbox" name="status" id="cuban/haitian" value={'Ingresante Cubano/Haitiano'} disabled={disabled} />
        <span>Ingresante Cubano/Haitiano</span>
      </label>

      <label htmlFor="american/samoan" className="checkbox-label">
        <input type="checkbox" name="status" id="american/samoan" value={'Residente de Samoa Americana'} disabled={disabled} />
        <span>Residente de Samoa Americana</span>
      </label>

      <label htmlFor="domestic-abuse-victim" className="checkbox-label">
        <input type="checkbox" name="status" id="domestic-abuse-victim" value={'Conyugue, hijo o padre golpeado bajo la Ley de Violencia contra la Mujer'} disabled={disabled} />
        <span>Conyugue, hijo o padre golpeado bajo la Ley de Violencia contra la Mujer</span>
      </label>

      <hr />

      <label htmlFor="none" className="checkbox-label">
        <input type="checkbox" name="status" id="none" value={'Ninguno de estos'} checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        <span>Ninguno de estos <br />
          <span className="caption">
            Seleccione esto si esta persona no tiene un documento listado. Puede continuar la solicitud sin seleccionar un documento o tipo de estatus
          </span>
        </span>
      </label>


      <button type="submit" className="green-btn">Guardar y Continuar</button>






    </form>



  )
}
