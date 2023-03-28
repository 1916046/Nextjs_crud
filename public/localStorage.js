export const getItem = (key) => {
    try {
      const serializedValue = localStorage.getItem(key)
      return JSON.parse(serializedValue)
    } catch (err) {
      console.error(`Error getting item ${key} from local storage`, err)
      return null
    }
  }
  
  export const setItem = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (err) {
      console.error(`Error setting item ${key} in local storage`, err)
    }
  }

  
  