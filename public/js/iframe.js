const loadNode = () => {
  return new Promise ((resolve, reject) => {
    frames[0].onload = e => resolve(e)
  })
}

loadNode().then(res => {
  document.body.children[0].appendChild(res.target.body.lastElementChild)
})
