import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'



const client = getSessionToJSON('client')
export default function FutureChanges() {

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    client['cover-will-be-lost'] = data.get('cover-will-be-lost')

    setSessionToJSON('client', client)

    location.href = '/life-changes'

  }
  return (
    <form className='future-changes' method="post" onSubmit={goTo}>

      <h2 className="section-title">D&iacute;ganos sobre cualquier cambio reciente</h2>

      <p><b>Perder&aacute; {client['first-name']} la cobertura m&eacute;dica elegible entre 22/4/{new Date().getFullYear()} y 20/6/{new Date().getFullYear()}</b></p>

      <label htmlFor="yes" className="radio-label">
        <input type="radio" name="cover-will-be-lost" id="yes" value={'si'} />
        <span>Si</span>
      </label>

      <label htmlFor="no" className="radio-label">
        <input type="radio" name="cover-will-be-lost" id="no" value={'no'} />
        <span>No</span>
      </label>

      <button type="submit" className="green-btn">Guardar y continuar</button>

    </form>
  )
}
