const loadNode = () => {
  return new Promise((resolve, reject) => {
    frames[0].onload = e => resolve(e)
    frames[0].onerror = e => reject(e)
  })
}

loadNode()
  .then(res => {
    document.body.children[0].appendChild(res.target.body.lastElementChild)
  })
  .catch(err => console.error('iframe failed to load', err))
