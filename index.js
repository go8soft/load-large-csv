const fs = require('fs');
const csv = require('csv-parser')

let countries = { population: { included: {}, ignored: {} } }
let emissions = { country: null, year: null, value: null }
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row['Indicator Name'] == 'Urban population growth (annual %)') {
      if (countries['population']['ignored'][row['Country Name']]) return

      for(let i = 1980; i <= 1990; i++) {
        if(!row[i]) {
          countries['population']['ignored'][row['Country Name']] = true
          delete countries['population']['included'][row['Country Name']]
          break
        } else {
          if(!countries['population']['included'][row['Country Name']]) {
            countries['population']['included'][row['Country Name']] = 0
          }

          countries['population']['included'][row['Country Name']] += parseFloat(row[i])
        }
      }
    } else if (row['Indicator Name'] == 'CO2 emissions (kt)') {
      for(let i = 1960; i <= 2017; i++) {
        if(!row[i]) continue

        let val = parseFloat(row[i])
        if(!emissions['value'] ||
          val > emissions['value']) {
            emissions = {
              country: row['Country Name'],
              year: i,
              value: val
            }
        }
      }
    }
  })
  .on('end', () => {
    let countryResult = { population: { name: null, value: null } }
    for(let country in countries['population']['included']) {
      if(!countryResult['population']['value'] ||
          countries['population']['included'][country] > countryResult['population']['value']) {
            countryResult['population'] = {
              name: country,
              value: countries['population']['included'][country]
            }
      }
    }
    console.log(countryResult)

    console.log(emissions)
  })
