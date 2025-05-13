import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])


export default function HomeInfo() {

  const [qParams, setQParams] = useSearchParams()
  const [covereds, setCovereds] = useState(dependents.filter(x => x['cover']))
  const [hispanic, setHispanic] = useState(null)
  const [races, setRaces] = useState([])

  const k = parseInt(qParams.get('k') ?? -1)


  const goTo = (e) => {

    e.preventDefault()

    const limit = covereds.length - 1

    if (k >= limit || covereds.length == 0) {
      location.href = '/ssn-check'
    } else {
      console.log('NUH')

      setQParams({ k: k + 1 })

    }



  }



  return (

    <form method='POST' onSubmit={goTo} className="home-info">

      <h2 className='section-title'>Informacion de {k == -1 ? client['first-name'] : covereds[k]['first-name']}</h2>

      <div className="form-section">
        <p><b>Es {k == -1 ? client['first-name'] : covereds[k]['first-name']} de origen hispano, latino o español?</b></p>
        <p className="caption">Opcional</p>

        <label htmlFor='hispanic-yes' className="radio-label">
          <input type="radio" name='hispanic' value='si' checked={hispanic == 'si'} onChange={e => setHispanic(e.target.value)} />
          <span>Si</span>
        </label>
        <label htmlFor='hispanic-no' className="radio-label">
          <input type="radio" name='hispanic' value='no' checked={hispanic == 'no'} onChange={e => setHispanic(e.target.value)} />
          <span>No</span>
        </label>

        <button onClick={e => setHispanic("")} type="button" className="blue-btn">Borrar su seleccion</button>

      </div>
      <div className="form-section">
        <p><b>Cual es la raza de {k == -1 ? client['first-name'] : covereds[k]['first-name']}</b></p>
        <p className="caption">Opcional. Seleccione todas las que correspondan</p>

        <label htmlFor="indian/alaskian" className="checkbox-label">

          <input type="checkbox" name="race" id="indian/alaskian" value={'indio americano o nativo de alaska'} onChange={e => races.push(e.target.value)} />
          <span>Indio Americano o nativo de Alaska</span>

        </label>
        <label htmlFor="asiatic indian" className="checkbox-label">

          <input type="checkbox" name="race" id="asiatic indian" value={'Indio asiatico'} onChange={e => races.push(e.target.value)} />
          <span>Indio Asiatico</span>

        </label>
        <label htmlFor="black" className="checkbox-label">

          <input type="checkbox" name="race" id="black" value={'negro afroamericano'} onChange={e => races.push(e.target.value)} />
          <span>Negro afroamericano</span>

        </label>
        <label htmlFor="chineese" className="checkbox-label">

          <input type="checkbox" name="race" id="chineese" value={'chino'} onChange={e => races.push(e.target.value)} />
          <span>Chino</span>

        </label>
        <label htmlFor="white" className="checkbox-label">

          <input type="checkbox" name="race" id="white" value={'blanco'} onChange={e => races.push(e.target.value)} />
          <span>Blanco</span>

        </label>

        <button onClick={e => setRaces([])} type="button" className="blue-btn">Borrar su seleccion</button>

      </div>


      <button type="submit" className='green-btn'>Guardar y Continuar</button>

    </form>






  )
}
