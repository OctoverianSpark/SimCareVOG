import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Simulations() {
  const [sims, setSims] = useState([])
  const [video, setVideo] = useState('')
  const [id, setId] = useState(null)
  useEffect(() => {
    axios.get('https://apisim.asistentevirtualsas.com/simulations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => setSims(res.data))
  }, [])

  const goTo = e => {
    e.preventDefault()

    const data = new FormData(e.target)
    let body = {
      calification: data.get('calification'),
      id: id
    }


    axios.post('https://apisim.asistentevirtualsas.com/simulations/update', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`

      }
    }).then(res => {
      console.log(res)
    })

  }

  const closeModal = () => setVideo('')

  return (
    <div className="sim-table">
      <div className="table">
        <div className="table-header">
          <div className="header cell">Nombre</div>
          <div className="header cell">Video</div>
          <div className="header cell">Calificación</div>
        </div>

        {
          sims.map((x, idx) => (
            <div className="table-row" key={idx}>
              <div className="cell">{x.name}</div>
              <div className="cell">
                {x.video ? (
                  <button className="blue-btn" onClick={() => {
                    setVideo(x.video)
                    setId(x.id)
                  }}>
                    Ver video
                  </button>
                ) : 'No disponible'}
              </div>
              <div className="cell">{x.calification ?? '-'}</div>
            </div>
          ))
        }
      </div>

      {video && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <video
              src={`https://apisim.asistentevirtualsas.com/videos/${video}`}
              controls
              autoPlay
              style={{ width: '100%', borderRadius: '8px' }}
            />

            <form method='POST' onSubmit={goTo}>
              <label htmlFor="grade" className="label-input">
                <span className='text-white'>Calificacion</span>
                <input className='bg-white' type="number" name="calification" id="grade" />
              </label>
              <button type="submit" value="Enviar" className='green-btn'>Calificar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
