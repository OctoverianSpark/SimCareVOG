import React from 'react'

export default function Section3() {
  return (
    <div className='section-welcome w-400'>

      <div className="section-header">
        <p className="section-number">SECCI&Oacute;N 3</p>
        <h2 className="section-title">Cobertura actual y cambios de vida</h2>
        <p>Informar otra cobertura de salud y cualquier cambio de vida reciente</p>
      </div>

      <div className="section-body">

        <h2 className='section-title'>Sobre qu&eacute; preguntaremos y por qu&eacute;</h2>

        <p>En esta secci&oacute;n, le pediremos informaci&oacute;n sobre cualquier oferta de cobertura m&eacute;dica o inscripci&oacute;n actual que su hogar pueda tener por parte de empleadores u otros programas. Esto nos ayuda a verificar la elegibilidad para ahorros en los planes del Mercado</p>


        <p>Tambi&eacute;n le preguntaremos sobre cambios de vida recientes para ver si usted u otros miembros de su hogar califican para un Per&iacute; odo Especial de Inscripci&oacute;n para inscribirse o cambiar la cobertura del Mercado fuera de la Inscripci&oacute;n Abierta.</p>


        <h2 className="section-title">Informaci&oacute;n que puede necesitar</h2>
        <p>Para cada persona en su hogar: </p>
        <ul>
          <li>Cobertura de salud actual, incluidos cambios de cobertura recientes o futuros</li>
          <li>Ofertas de cobertura a trav&eacute;s de un empleo, incluso si no est&aacute; inscrito</li>
          <li>Cambios de vida calificados, como mudanza, matrimonio o liberaci&oacute;n de encarcelamiento</li>
        </ul>
        <br />
        <p className='caption'>Est&aacute; bien si necesita hacer una pausa para recopilar cualquier documento que le ayude a proporcionar esta informaci&oacute;n. Todas sus respuestas hasta este punto han sido guardadas.</p>


        <button type="button" className='green-btn' onClick={() => location.href = '/actual-home-cover'}>Continuar</button>

      </div>


    </div>
  )
}
