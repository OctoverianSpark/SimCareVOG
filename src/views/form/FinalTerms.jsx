import React from 'react'

export default function FinalTerms() {


  const goTo = e => {
    e.preventDefault()

    location.href = '/sign'
  }

  return (
    <form method='POST' className='w-180 grid gap-5' onSubmit={goTo}>

      <h2 className="section-title">
        Lea y acepte estas declaraciones
      </h2>
      <p>
        Si no esta de acuerdo con cualquiera de las declaraciones o "testimonios", se le pedir&aacute; proveer informaci&oacute;n adicional. En algunos casos, debe aceptar la declaraci&oacute;n para continuar la solicitud del Mercado.
      </p>

      <br />

      <p>
        <b>
          Para facilitar la determinaci&oacute;n de mi elegibilidad para recibir ayuda con los pagos de mi cobertura de salud en los pr&oacute;ximos años, acepto que el Mercado utilice los datos de ingresos, incluyendo la informaci&oacute;n de las declaraciones de impuestos, durante los proximos 5 años. El Mercado me enviar&aacute; un aviso, me dejar&aacute; hacer cambios y podr&eacute; optar por no participar en cualquier momento.
        </b>
      </p>

      <label htmlFor="agree" className="radio-label">
        <input type="radio" name="agree" id="agree" value={'agree'} required />
        <span>Estoy de acuerdo</span>
      </label>
      <label htmlFor="not-agree" className="radio-label">
        <input type="radio" name="agree" id="not-agree" value={'not agree'} />
        <span>No estoy de acuerdo</span>
      </label>


      <p>
        <b>Si alguien en su solicitud esta inscrito en la cobertura del Mercado y tambiên tiene
          cobertura de Medicare, el Mercado finalizar a su cobertura del plan del Mercado.
          Recibirán un aviso antes de que el Mercado cancele su cobertura en ceso de que
          necesiter conservarla o realizar cambios. Durante todos los meses de cobertura
          superpuesta, son responsables de pagar el costo total de la prima del plan del
          Mercado y los servicios cubiertos.</b>
      </p>
      <label htmlFor="agree-2" className="radio-label">
        <input type="radio" name="agree-2" id="agree-2" value={'agree'} required />
        <span>Estoy de acuerdo</span>
      </label>
      <label htmlFor="not-agree-2" className="radio-label">
        <input type="radio" name="agree-2" id="not-agree-2" value={'not agree'} />
        <span>No estoy de acuerdo</span>
      </label>


      <button type="submit" className="green-btn">Guardar y Continuar</button>

    </form>
  )
}
