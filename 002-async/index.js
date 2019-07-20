
const show = console.log

// -- async functions automatically return a promise
function f0 (a, b) {
  return Promise.resolve(a + b)
}

async function f1 (a, b) {
  return a + b
}

show(f0(1, 2)) // Promise { 3 }
show(f1(1, 2)) // Promise { 3 }

// -- you can manually make promises in 3 ways:

Promise.resolve('hello')
Promise.reject(new Error('some error'))

new Promise((resolve, reject) => {
  resolve('some random value')
})

// -- in older versions of node, you write code like
const timeoutPromise = new Promise(resolve => {
  setTimeout(resolve, 1000)
})

timeoutPromise
// -- resolves
.then(() => {
    show("one second elapsed")
  })
.catch(err => {
 // -- no error in this case
  show(err)
})

// in newer versions you write

async function main () {
  try {
    await timeoutPromise
    show("one second elapsed")
  } catch (err) {
    show(err)
  }
}

main()

// okay, so converting callback code to promise code

const sendHi = callback => {
  setTimeout(() => {
    callback("hi")
  }, 1000)
}

sendHi(hi => {
  console.log(hi)
})

// now as a promise

async function main() {
  const sendHiPromise = new Promise(resolve => {
    sendHi(hi => resolve(hi))
  })

  const hi = await sendHiPromise
  console.log(hi)
}

// why use promises rather than direct values?
const fs = require('fs').promises

const main = async () => {
  const content = await fs.readFile('somerandomfile.txt').toString()

  console.log('file read')

  await fs.writeFile('someotherfile.txt', content.reverse())
}

main()
// using .then (don't)

const x =fs.readFile('somerandomfile.txt')
  .then(val => {
    return val.toString()
  })
  .then(valStr => {
    // note; if you return a Promise in .then, the rest of the
    // .then chain will use the resolved value from writeFile (if it returned one)
    return fs.writeFile('someotherfile.txt', valStr.reverse())
  })

  // x is STILL a promise, if you want to work with resolved value you need
  // to use .then