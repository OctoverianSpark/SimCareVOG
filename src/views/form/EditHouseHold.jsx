import React, { useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import Select from 'react-select'
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])

export default function EditHouseHold() {

  const [depIndex, setIndex] = useState(new URLSearchParams(location.search).get('k'))
  const [dependentRes, setRes] = useState(dependents[depIndex])
  const [firstName, setFirstName] = useState(dependentRes['first-name'])

  const [params] = useSearchParams()


  const relaciones = [
    { value: "", label: "Seleccionar una relación", isDisabled: true },
    { value: "hijo/a", label: "Hijo/a (incluyendo hijo/a adoptados)" },
    { value: "hijastro/a", label: "Hijastro/a" },
    { value: "hijo/a de pareja domestica", label: "Hijo de pareja doméstica (incluyendo hijo/a adoptados)" },
    { value: "hermanos", label: "Hermanos (incluyendo medio-hermanos/as y hermanastros/as)" },
    { value: "esposo/a", label: "Esposo/a" },
    { value: "nieto/a", label: "Nieto/a" },
    { value: "abuelo", label: "Abuelo/a" },
    { value: "tutor legal", label: "Tutor legal" },
    { value: "otro pariente", label: "Otro pariente" },
    { value: "otro no pariente", label: "Otro (sin relación familiar)" },
    { value: "dependiente fiscal", label: "Dependiente fiscal" },
    { value: "no_dependiente fiscal", label: "No dependiente fiscal, pero miembro del hogar" },
    { value: "persona a cargo", label: "Persona bajo tu cuidado" },
  ];

  const setDependentsRelation = (e, key) => {


    dependents[key][`main-relationship`] = e.value

  }
  const goTo = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)


    data.entries().forEach(([key, value]) => {


      dependentRes[key] = value


    })

    dependents[depIndex] = dependentRes

    sessionStorage.setItem('dependents', JSON.stringify(dependents))

    location.href = `/household${params.get('final-check') ? '?final-check=true' : ''}`

  }

  return (
    <form method='POST' className="add-household" onSubmit={goTo}>

      <h2 className="section-title">Agregar a una persona que necesita cobertura de salud</h2>


      <label htmlFor="first-name" className="label-input">
        <span><b>Primer nombre</b></span>
        <input type="text" name="first-name" id="first-name" onInput={e => setFirstName(e.target.value)} defaultValue={dependentRes['first-name']} />
      </label>

      <label htmlFor="middle-name" className="label-input">
        <span><b>Segundo nombre</b></span>
        <span className="caption">Opcional</span>
        <input type="text" name="middle-name" id="middle-name" defaultValue={dependentRes['middle-name']} />
      </label>

      <label htmlFor="last-name" className="label-input">
        <span><b>Apellido</b></span>
        <input type="text" name="last-name" id="last-name" defaultValue={dependentRes['last-name']} />
      </label>

      <label htmlFor="suffix" className="label-input">
        <span><b>Sufijo</b></span>
        <span className='caption'>Opcional</span>
        <input type="text" name="suffix" id="suffix" defaultValue={dependentRes['suffix']} />
      </label>


      <div className="container-inputs">
        <label className="label-input" htmlFor="client-dob">
          Fecha de nacimiento
          <p className="caption">Este campo es requerido</p>
          <div className="dob-inputs">
            <input
              type="number"
              id="dob-month"
              name="dob-month"
              placeholder="MM"
              min="1"
              max="12"
              defaultValue={dependentRes["dob-month"]}
              required
            />
            <input
              type="number"
              id="dob-day"
              name="dob-day"
              placeholder="DD"
              min="1"
              max="31"
              defaultValue={dependentRes["dob-day"]}
              required
            />
            <input
              type="number"
              id="dob-year"
              name="dob-year"
              placeholder="YYYY"
              min="1900"
              max={new Date().getFullYear()}
              defaultValue={dependentRes["dob-year"]}
              required
            />
          </div>
        </label>
      </div>


      <div className="container-inputs">
        <p><b>Sexo</b></p>

        <label htmlFor="mujer" className="radio-label">
          <input type="radio" name="genre" id="mujer" value={'mujer'} defaultChecked={dependentRes['genre'] === 'mujer'} />
          <span>Mujer</span>
        </label>
        <label htmlFor="hombre" className="radio-label">
          <input type="radio" name="genre" id="hombre" value={'hombre'} defaultChecked={dependentRes['genre'] === 'hombre'} />
          <span>Hombre</span>
        </label>
      </div>


      <label htmlFor={`${client['first-name']}-relationship`} className="label-input">
        <span><b>Que relacion tiene {firstName} con {client['first-name']}</b></span>
        <Select
          name={`${client['first-name']}-relationship`}
          options={relaciones}
          className='select'
          classNamePrefix={'select'}
          placeholder='Selecciona una relacion'
          required
        />
      </label>

      {
        Object.keys(dependents).map(key => {


          if (dependents[key] === dependents[depIndex]) return

          return (
            <label htmlFor={`${dependents[key]['first-name']}-relationship`} className="label-input" key={dependents[key]['first-name'] ?? 'change'}>
              <span><b>Que relacion tiene {firstName} con {dependents[key]['first-name']}</b></span>
              <Select
                name={`${dependents[key]['first-name']}-relationship`}
                options={relaciones}
                className='select'
                classNamePrefix={'select'}
                placeholder='Selecciona una relacion'
                onChange={(e) => setDependentsRelation(e, key)}
                required
              />

            </label>
          )

        }



        )
      }


      <button type="submit" className="green-btn">Guardar y Continuar</button>



    </form>
  )
}
