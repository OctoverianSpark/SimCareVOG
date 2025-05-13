import React, { use, useEffect, useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
import Select from 'react-select'

export default function CivilState() {

  const [marriage, setMarriage] = useState([])
  const [state, setState] = useState('single')
  const [marriedWith, setMarriedWith] = useState('')


  useEffect(() => {

    const data = []
    dependents.forEach(dep => {
      if (dep[client['first-name'] + '-relationship'] === 'esposo/a') {
        data.push(dep)
      }
    })

    setMarriage(data.map(x => {
      return { label: `${x['first-name']}`, value: `${x['first-name']}` }
    }))

  }, [])


  const goTo = e => {

    e.preventDefault()

    const data = new FormData(e.target)

    data.set('married-with', marriedWith)

    data.entries().forEach(([key, value]) => {

      client[key] = value

    })

    sessionStorage.setItem('client', JSON.stringify(client))
    location.href = '/home-tax-declarations'

  }


  return (

    <form method='POST' className="civil-state" onSubmit={goTo}>


      <h2 className="section-title">Estado civil</h2>


      <p><b>Cual es el estado civil de {client['first-name']} </b></p>

      <label htmlFor="single" className="radio-label">
        <input type="radio" name="civil-state" id="single" value={'soltero(a)'} defaultChecked={marriage.length === 0} onChange={e => setState('single')} />
        <span>Soltero(a)</span>
      </label>

      <div className="flex gap-5">

        <label htmlFor="married" className="radio-label">
          <input type="radio" name="civil-state" id="married" value={'casado(a)'} disabled={marriage.length === 0} onChange={e => setState('married')} />
          <span>Casado(a) {marriage.length > 0 ? 'con' : ''}</span>

        </label>
        {
          marriage.length > 0 && (

            <Select
              className='select'
              classNamePrefix={'select'}
              options={marriage}
              id='married-with'
              onChange={e => setMarriedWith(e.value)}
              isDisabled={state === 'single'}

            />

          )
        }
      </div>


      <button className='green-btn' type="submit">Guardar y continuar</button>


    </form>
  )
}
