const drawCSV = user => {
  let htmlStr = ''
  htmlStr += `<h3>${user.first_name} ${user.last_name}</h3>`
  htmlStr += `<div>`
  htmlStr += `<p><strong>Email</strong>: <a href="mailto:${user.email}">${user.email}</a></p>`
  htmlStr += `<p><strong>Company Name</strong>: ${user.company_name}</p>`
  htmlStr += `<p><strong>Address</strong>: ${user.address}</p>`
  htmlStr += `<p><strong>City</strong>: ${user.city}</p>`
  htmlStr += `<p><strong>County</strong>: ${user.county}</p>`
  htmlStr += `<p><strong>Zip</strong>: ${user.postal}</p>`
  htmlStr += `<p><strong>Phone number</strong>: ${user.phone1}</p>`
  htmlStr += `<p><strong>Secondary Phone number</strong>: ${user.phone2}</p>`
  htmlStr += `<p><strong>Website</strong>: <a target="_blank" href="${user.web}">${user.web}</a></p>`
  htmlStr += `</div>`
  return htmlStr
}

$.get('files/attachment2.csv', data => {
  const csvData = Papa.parse(data, {
    worker: true,
    header: true,
    complete: () => {
      $('#loading').remove()
      $('#accordion').accordion({collapsible: true})
    },
    step: row => $('#accordion').append(drawCSV(row.data[0]))
  })
})
