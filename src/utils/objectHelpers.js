export const updateObjectInArray = (array, objPropName, id, newPropObj) => {
  return array.map(item => {
    if (item[objPropName] === id) {
      return {...item, ...newPropObj}
    }
    return item
  })
}