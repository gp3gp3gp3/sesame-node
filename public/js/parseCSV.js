$.get('files/attachment2.csv', data => {
  const csvData = Papa.parse(data, {header: true})

  console.log(csvData)
  $('.content').append(csvData.data.map(e => `<p>${e.first_name}</p>`))
})
