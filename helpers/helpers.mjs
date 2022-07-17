export const crud = (method) => {
  let crudFunction
  switch (method) {
    case 'GET':
      crudFunction = async ({ url }, token = '') => {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        const data = await response.json()
        return data
      }
      break
    case 'POST':
      crudFunction = async ({ url, data }, token = '') => {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        const json = await response.json()
        return json
      }
      break
    case 'PUT':
      crudFunction = async ({ url, data }, token = '') => {
        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        const json = await response.json()
        return json
      }
      break
    case 'DELETE':
      crudFunction = async ({ url }, token = '') => {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        const json = await response.json()
        return json
      }
      break
    default:
      crudFunction = async ({ url }, token = '') => {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        const data = await response.json()
        return data
      }
  }

  return crudFunction
}

export const extractFormData = (form) => {
  //if the form is a form element, get the form data
  if (form instanceof HTMLFormElement) {
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => (obj[key] = value))
    return obj
  } else {
    throw new TypeError('The form must be a form element')
  }
}

export const createCustomEvent = (type, detail = 'test') => {
  const event = new CustomEvent(type, {
    bubbles: true,
    composed: true,
    detail,
  })
  return event
}

export const eventDispatcher = ({ event, target }) => {
  target.dispatchEvent(event)
}

export const createTransmitObj = (formData, url) => {
  const obj = {
    data: formData,
    url: url,
  }
  return obj
}
