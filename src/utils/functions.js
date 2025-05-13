export function getSessionToJSON (key, fallback = {}) {
  try {
    const value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch (e) {
    console.warn('Error parsing sessionStorage key: ', key, e)
    return fallback
  }
}

export function setSessionToJSON (key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.warn(`Error stringifying sessionStorage key "${key}":`, e)
  }
}

export function getSessionToText (key, fallback = '') {
  const value = sessionStorage.getItem(key)
  return value ?? fallback
}

export function setSessionToText (key, data) {
  sessionStorage.setItem(key, JSON.stringify(data))
}

export function age (DOB) {
  const today = new Date()
  const dob = new Date(DOB)

  let age = today.getFullYear() - dob.getFullYear()

  let months = today.getMonth() - dob.getMonth()
  let days = today.getDate() - dob.getDate()

  if (months < 0 || (months === 0 && days < 0)) {
    age--
  }

  return age
}
