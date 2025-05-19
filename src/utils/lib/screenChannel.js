let channel = null

export function getScreenChannel () {
  if (!channel || channel._closed) {
    channel = new BroadcastChannel('screen-rec')

    // Agregamos un flag manual para saber si está cerrado
    const originalClose = channel.close.bind(channel)
    channel._closed = false
    channel.close = () => {
      channel._closed = true
      originalClose()
    }
  }
  return channel
}
