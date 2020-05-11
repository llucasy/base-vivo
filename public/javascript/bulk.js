const bulkLinhas = document.querySelector('#bulkLinhas')
const textarea = document.querySelector('textarea[name="bulkLinhas"]')

textarea.addEventListener('change', event => {
  
  const str = textarea.value
  let arr = str.replace(/\n/g," ").split(" ")

  bulkLinhas.innerHTML = arr.length
  
})
