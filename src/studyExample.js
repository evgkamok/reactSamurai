someObj = {
  1: 111,
  2: 222,
  sss: 333
}

const keyObj = Object.keys(someObj);
// console.log(keyObj)

Object.keys(someObj).map(key => {
  console.log(someObj[key])
})

