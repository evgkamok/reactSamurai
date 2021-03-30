export const updateObjectInArray = (array, replacePropName, id, newPropObj) => {
  return array.map(item => {
    if (item[replacePropName] === id) {
      return {...item, ...newPropObj}
    }
    return item
  })
}