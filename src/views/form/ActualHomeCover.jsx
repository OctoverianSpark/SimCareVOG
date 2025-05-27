import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from '../../utils/functions'
import { useSearchParams } from 'react-router-dom'


const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(x => x['cover'] == 'true' || x['cover'] == true)


export default function ActualHomeCover() {

  const [disabled, setDisabled] = useState(false)



  const closeDates = e => {

    setDisabled(e.target.checked)

    all.forEach(cover => {
      delete cover['is-actually-enrolled']
    })



  }

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)

    data.entries().forEach(([key, value]) => {
      const splitedKey = key.split(',')

      all[splitedKey[1]][splitedKey[0]] = value
      console.log(splitedKey, value)
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



    if (all.filter(x => x['is-actually-enrolled'] === 'si').length > 0) {
      location.href = '/enrolled-to'

    } else {
      location.href = '/hra-info'
    }
  }


  return (
    <form className='actual-home-cover' method="post" onSubmit={goTo}>
      <h2 className="section-title">La cobertura actual de su hogar</h2>
      <p><b>Alguna de estas personas est&aacute; actualmente inscrito en la cobertura m&eacute;dica?</b></p>
      <span className="caption">Seleccione todas las que apliquen</span>

      {
        all.map((cover, i) => (
          <label htmlFor={i} key={i} className="checkbox-label">
            <input type="checkbox" name={`is-actually-enrolled,${i}`} id={i} disabled={disabled} value={'si'} />
            <span>{cover['first-name']}</span>
          </label>
        ))
      }
      <hr />
      <label htmlFor='none' className="checkbox-label">
        <input type="checkbox" id='none' onChange={closeDates} />
        <span>Ninguna de estas personas</span>
      </label>

      <button type="submit" className='green-btn'>Guradar y Continuar</button>

    </form>
  )
}
