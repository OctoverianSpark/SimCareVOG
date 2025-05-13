import React from 'react'

export default function JobBasedCoverInfo() {
  return (
    <div className='section-welcome w-180'>

      <h2 className="section-title">Cobertura de salud basada en el empleo</h2>

      <p>

        Algunos empleadores pueden ofrecer planes de seguro m&eacute;dico a los empleados. Estos planes tambi&eacute;n pueden tambi&eacute;n pueden estar disponibles para otros miembros de la familia.

      </p>

      <h2 className='section-title'><b>Informacion que puede necesitar</b></h2>
      <p>
        Detalles sobre los beneficios y la cobertura de un plan de salud del empleador, incluidos:
      </p>

      <ul>
        <li>Costos de prima</li>
        <li>Qui&eacute;n en el hogar puede inscribirse</li>
        <li>Si alg&uacute;n plan cumple con el est&aacute;ndar de valor m&iacute;nimo</li>
      </ul>


      <p>Est&aacute; bien si necesito hacer una pausa para bucsar estos documentos. Todas sus respuestas hata este punto se han guardado</p>


      <button className="green-btn" onClick={() => location.href = '/job-based-offers'}>Continuar</button>
    </div>
  )
}
