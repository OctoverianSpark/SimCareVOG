import React from 'react'

export default function FinalSectionWelcome() {
  return (
    <div className="section-welcome">
      <div className="section-header">
        <p className="section-number">SECCI&Oacute;N 4</p>
        <h2 className="section-title">Revisar, Firmar y Enviar</h2>
        <p>Revise su solicitud, acepte las declaraciones, luego firme y envie</p>
      </div>




      <div className="section-body">
        <h2 className="section-title">Est&aacute; por terminar!</h2>

        <p>S&oacute;lo quedan unos pocos pasos finales por completar:</p>
        <ul>
          <li>Revise toda la informaci&oacute;n que ha proporcionado. Podr&aacute; editarlo, si es necesario.</li>
          <li>Lea y acepte algunas declaraciones sobre c&oacute;mo desea que se utilice la informaci&oacute;n de su solicitud.</li>
          <li>Firme y envie su solicitud.</li>
        </ul>

        <p>
          Obtendr&aacute; los resultados de su elegibilidad despu&eacute;s de enviar su solicitud. Si es elegible, puede revisar los planes y precios e inscribirse en una cobertura m&eacute;dica.
        </p>
      </div>

      <button type="button" className="green-btn" onClick={() => location.href = '/final-check'}>Continuar</button>

    </div>
  )
}
