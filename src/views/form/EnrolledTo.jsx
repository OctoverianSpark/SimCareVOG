import React from 'react'
import { getSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => Boolean(x['cover']) == true)
export default function EnrolledTo() {

  const [params] = useSearchParams()

  const k = parseInt(params.get('k')) || 0

  const goTo = e => {
    e.preventDefault()
    if (k + 1 < all.length) {

      location.href = `/enrolled-to?k=${k + 1}`

    } else {

      location.href = 'hra-info'
    }
  }



  return (
    <form method="post" className="enrolled-to" onSubmit={goTo}>

      <h2 className="section-title">Cobertura actual de {all[k]['first-name']}</h2>


      <p><b>Que tipo de cobertura tiene {all[k]['first-name']}?</b></p>


      <label htmlFor="marketplace-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="marketplace-cover" value={'cobertura del mercado'} />
        <span>Cobertura del Mercado</span>
      </label>
      <label htmlFor="medicaid-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="medicaid-cover" value={'medicaid'} />
        <span>Medicaid</span>
      </label>
      <label htmlFor="chip-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="chip-cover" value={'chip'} />
        <span>CHIP</span>
      </label>
      <label htmlFor="medicare-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="medicare-cover" value={'medicare'} />
        <span>Medicare</span>
      </label>
      <label htmlFor="tricare-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="tricare-cover" value={'tricare'} />
        <span>TRICARE</span>
      </label>
      <label htmlFor="veterans-health-program-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="veterans-health-program-cover" value={'veterans-health-program'} />
        <span>Programa de Salud y M&eacute;dico de la Administraci&oacute;n de Veteranos (VA)</span>
      </label>

      <label htmlFor="peace-body-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="peace-body-cover" value={'peace-body'} />
        <span>Cuerpo de Pax</span>
      </label>

      <label htmlFor="cobra-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="cobra-cover" value={'cobra'} />
        <span>COBRA</span>
      </label>

      <label htmlFor="retirement-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="retirement-cover" value={'retirement'} />
        <span>Beneficios de salud para jubilados</span>
      </label>
      <label htmlFor="employment-based-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="employment-based-cover" value={'employment-based'} />
        <span>Cobertura a trav&eacute;s de su empleo (o el empleo de otra persona, como un c&oacute;nyuge o padre/madre)</span>
      </label>
      <label htmlFor="other-complete-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="other-complete-cover" value={'other-complete'} />
        <span>Otra cobertura completa de beneficios</span>
      </label>
      <label htmlFor="other-limited-cover" className="checkbox-label">
        <input type="checkbox" name="actual-coverage" id="other-limited-cover" value={'other-limiter'} />
        <span>Otra cobertura de beneficio limitado</span>
      </label>


      <button type="submit" className="green-btn">Guardar y continuar</button>

    </form>
  )
}
