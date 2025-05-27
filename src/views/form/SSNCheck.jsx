import React, { useEffect, useState } from 'react'
import { getSessionToJSON, setSessionToJSON } from "../../utils/functions"
import { useSearchParams } from 'react-router-dom'

const client = getSessionToJSON('client')
const dependents = getSessionToJSON('dependents', [])
const all = [client, ...dependents].filter(cover => cover['cover'] == true || cover['cover'] == 'true')
console.log(all);


export default function SSNCheck() {

	const [qParams, setQParams] = useSearchParams()
	const [confirm, setConfirm] = useState(false)
	const [jump, setJump] = useState(false)
	const [ssn, setSSN] = useState('')
	const [hasSSN, setHasSSN] = useState(true)

	const k = parseInt(qParams.get('k')) || 0


	const goTo = (e) => {


		e.preventDefault()

		const data = new FormData(e.target)


		all[k]['ssn'] = data.get('ssn') || ''
		all[k]['ssn-name-confirm'] = data.get('ssn-name-confirm') || ''
		all[k]['ssn-first-name'] = data.get('ssn-first-name') || all[k]['first-name']
		all[k]['ssn-middle-name'] = data.get('ssn-middle-name') || all[k]['middle-name']
		all[k]['ssn-last-name'] = data.get('ssn-last-name') || all[k]['last-name']
		all[k]['ssn-suffix'] = data.get('ssn-suffix') || all[k]['suffix']

		all.forEach((cover, i) => {
			if (cover === client) {
				setSessionToJSON('client', all[0])
			} else {
				dependents.forEach((dep, index) => {
					if (cover === dep) {
						dependents[index] = cover
					}
				})
				setSessionToJSON('dependents', dependents)
			}
		})

		if (k + 1 < all.length) {
			location.href = `/ssn-check?k=${k + 1}`
		} else {
			location.href = '/citizenship'
		}
	}



	return (
		<form method='POST' className='ssn-check' onSubmit={goTo}>


			<h2 className="section-title">Informacion de {all[k]['first-name']}</h2>

			<div className="form-section">

				<label htmlFor="ssn" className="label-input">

					<p><b>Cu&aacute;l es el Numero de Seguro Social (SSN) de {all[k]['first-name']}</b></p>
					<p className="caption">
						Ingrese el numero de serie de 9 digitos de {all[k]['first-name']}. Verificamos el SSN con el <br /> Seguro Social de acuerdo con el consentimiento que usted dio al inicio de la solicitud.
					</p>

					<input type="text" name="ssn" id="ssn" required={all[k]['cover'] == 'true'} onChange={e => setSSN(e.target.value)} value={ssn} disabled={!hasSSN} />

					<label htmlFor="no-ssn" className="checkbox-label h-15">
						<input type="checkbox" name="has-ssn" id="no-ssn" value={hasSSN} onChange={() => setHasSSN(!hasSSN)} checked={!hasSSN} />
						<span>No tiene SSN.</span>
					</label>
				</label>

			</div>

			{
				hasSSN === true && (

					<div className="form-section">
						<p><b>El nombre a continuaci&oacute;n coincide con el nombre en la tarjeta de Seguro Social de {all[k]['first-name']}</b></p>

						<div className="w-60 h-10 flex-1/2 p-2 bg-gray-400">
							<p>{all[k]['first-name']} {all[k]['last-name']}</p>
						</div>

						<label htmlFor="ssn-name-yes" className="radio-label">
							<input type="radio" name="ssn-name-confirm" id="ssn-name-yes" value={'si'} onChange={e => setConfirm(false)} />
							<span>Si</span>
						</label>
						<label htmlFor="ssn-name-no" className="radio-label">
							<input type="radio" name="ssn-name-confirm" id="ssn-name-no" value={'no'} onChange={e => setConfirm(true)} />
							<span>No</span>
						</label>

					</div>
				)
			}

			{
				confirm && (


					<div className="form-section">
						<p><b>Ingrese el nombre de esta persona exactamente como aparece en su tarjeta del Seguro Social</b></p>

						<label htmlFor="first-name" className="label-input">
							<span>Primer nombre</span>
							<input type="text" id='first-name' name='ssn-first-name' />
						</label>
						<label htmlFor="middle-name" className="label-input">
							<span>Segundo nombre</span>
							<input type="text" id='middle-name' name='ssn-middle-name' />
						</label>
						<label htmlFor="last-name" className="label-input">
							<span>Apellido</span>
							<input type="text" id='last-name' name='ssn-last-name' />
						</label>
						<label htmlFor="suffix" className="label-input">
							<span>Sufijo</span>
							<input type="text" id='suffix' name='ssn-suffix' />
						</label>
					</div>

				)
			}


			{
				ssn === '' && jump && (
					<div className="yellow-bordered-container">
						<div className="text">

							<h2 className='section-title'>Desea continuar sin ingresar un SSN?</h2>
							<p>Ingrese el SSN de {all[k]['first-name']}, para que podamos verificar si los miembros del
								hogar son elegibles para los ahorros. Proporcionar el SSN ayuda a asegurarse
								que la elegibilidad sea correcta, ayuda a que el proceso de solicitud sea más
								fluido y rapido, y hace que sea menos probable que deba enviar mas
								informacion mas adelante.</p>

							<button type="button" className='green-btn' onClick={e => setJump(false)}>Ingrese el SSN ahora</button>
							<button type="submit" className="blue-btn">Continuar sin ingresar el SSN</button>

						</div>

					</div>
				)
			}


			<button type="submit" className={`green-btn ${jump ? 'hidden' : ''}`}>Guardar y Continuar</button>

		</form>
	)
}
