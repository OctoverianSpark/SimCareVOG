// utils/screenRecorder.js

export async function getScreenStream () {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: 'motion' },
      audio: false
    })
    return stream
  } catch (error) {
    console.error('Error obteniendo pantalla:', error)
    throw error
  }
}

export function startScreenRecording (stream, onStop) {
  const chunks = []
  const recorder = new MediaRecorder(stream)

  recorder.ondataavailable = e => {
    if (e.data.size > 0) chunks.push(e.data)
  }

  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' })
    onStop(blob)
  }

  recorder.start()
  return recorder
}

export function stopScreenRecording (recorder, stream) {
  recorder?.stop()
  stream?.getTracks().forEach(track => track.stop())
}
