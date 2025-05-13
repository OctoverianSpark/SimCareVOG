import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])


export default function ActualHomeCover() {


  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    client['actually-enrolled'] = data.get('actually-enrolled')


    setSessionToJSON('client', client)
    if (data.get('actually-enrolled') === 'si') {
      location.href = '/enrolled-to'
    } else {
      location.href = '/hra-info'
    }

  }


  return (
    <form className='actual-home-cover' method="post" onSubmit={goTo}>
      <h2 className="section-title">La cobertura actual de su hogar</h2>
      <p><b>Est&aacute; {client['first-name']} actualmente inscrito en la cobertura m&eacute;dica?</b></p>
      <p className="caption">Seleccione "Si" s&oacute;lo si seguir&aacute;n teniendo la misma cobertura que tienen ahora a partir de 20/6/{new Date().getFullYear()}</p>


      <label htmlFor="yes" className="radio-label">
        <input type="radio" name="actually-enrolled" id="yes" value={'si'} />
        <span>Si</span>
      </label>

      <label htmlFor="no" className="radio-label">
        <input type="radio" name="actually-enrolled" id="no" value={'no'} />
        <span>No</span>
      </label>


      <button type="submit" className='green-btn'>Guradar y Continuar</button>

    </form>
  )
}
