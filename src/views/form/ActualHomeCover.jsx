import React from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => x['cover'] == 'true' || x['cover'] == true)


export default function ActualHomeCover() {
  const [params] = useSearchParams()

  const k = parseInt(params.get('k')) || 0

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    all[k]['actually-enrolled'] = data.get('actually-enrolled')

    all.forEach((cover, i) => {
      if (cover == client) {
        setSessionToJSON('client', cover)
      } else {
        dependents.forEach((dep, index) => {
          if (cover == dep) {
            dependents[index] = cover
          }
        })
        setSessionToJSON('dependents', dependents)
      }
    })


    if ((k + 1) < all.length) {
      location.href = `/actual-home-cover?k=${k + 1}`
    } else {

      if (data.get('actually-enrolled') === 'si') {
        location.href = '/enrolled-to'
      } else {
        location.href = '/hra-info'
      }
    }

  }


  return (
    <form className='actual-home-cover' method="post" onSubmit={goTo}>
      <h2 className="section-title">La cobertura actual de su hogar</h2>
      <p><b>Est&aacute; {all[k]['first-name']} actualmente inscrito en la cobertura m&eacute;dica?</b></p>
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
