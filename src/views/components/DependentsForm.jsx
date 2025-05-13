import React from 'react'
import {getSessionToJSON,setSessionToJSON} from "../../utils/functions"
import Select from 'react-select';

export default function DependentsForm({
  client,
  dependentsForm,
  onClose,
  saveDep
}) {




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


  return (
    <form
      method="post"
      className={dependentsForm ? '' : 'hidden'}
      onSubmit={saveDep}
    >
      <fieldset className="bordered-blue">
        <legend>Cuentanos sobre el dependiente de {client['first-name']}</legend>

        <label htmlFor={`${client['first-name']}-relationship`} className="label-input">
          <span>¿Cómo está relacionada esta persona con {client['first-name']}?</span>
          <Select
            name={`${client['first-name']}-relationship`}
            id={`${client['first-name']}-relationship`}
            defaultValue=""
            options={relaciones}
            className='select'
            classNamePrefix={'select'}
          />
        </label>

        {client['civil-state'] === 'casado(a)' && (
          <label htmlFor={`${client['married-with']}-relationship`} className="label-input">
            <span>¿Cómo está relacionada esta persona con {client['married-with']}?</span>
            <Select
              name={`${client['married-with']}-relationship`}
              id={`${client['married-with']}-relationship`}
              defaultValue=""
              options={relaciones}
              className='select'
              classNamePrefix={'select'}
            />
          </label>
        )}

        <label htmlFor="first-name" className="label-input">
          <span><b>Primer nombre</b></span>
          <input
            type="text"
            name="first-name"
            id="first-name"
            required
          />
        </label>

        <label htmlFor="middle-name" className="label-input">
          <span><b>Segundo nombre</b> <span className="caption">(Opcional)</span></span>
          <input type="text" name="middle-name" id="middle-name" />
        </label>

        <label htmlFor="last-name" className="label-input">
          <span><b>Apellido</b></span>
          <input type="text" name="last-name" id="last-name" required />
        </label>

        <label htmlFor="suffix" className="label-input">
          <span><b>Sufijo</b> <span className="caption">(Opcional)</span></span>
          <input type="text" name="suffix" id="suffix" />
        </label>

        <div className="container-inputs">
          <label className="label-input" htmlFor="client-dob">
            Fecha de nacimiento
            <p className="caption">Este campo es requerido</p>
            <div className="dob-inputs">
              <input type="number" name="dob-day" placeholder="DD" min="1" max="31" required />
              <input type="number" name="dob-month" placeholder="MM" min="1" max="12" required />
              <input type="number" name="dob-year" placeholder="YYYY" min="1900" max={new Date().getFullYear()} required />
            </div>
          </label>
        </div>

        <div className="container-inputs">
          <p><b>Sexo</b></p>
          <label className="radio-label">
            <input type="radio" name="genre" value="mujer" required />
            <span>Mujer</span>
          </label>
          <label className="radio-label">
            <input type="radio" name="genre" value="hombre" />
            <span>Hombre</span>
          </label>
        </div>

        <div className="flex">
          <button type="submit" className="green-btn">Guardar y continuar</button>
          <button type="button" className="blue-btn" onClick={onClose}>Cancelar</button>
        </div>
      </fieldset>
    </form>
  );
}
