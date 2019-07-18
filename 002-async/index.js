
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
