

const gridCont = document.getElementById('entries-container')
const styleSelect = document.getElementById('style-select')
const submitButton = document.getElementById('submit-button')


const getEntries = () => {
    axios.get('http://localhost:4000/api/entries')
        .then(res => {
            res.data.forEach(beer => {
                const div = document.createElement('div')

                const beerName = document.createElement('div')
                const breweryName = document.createElement('div')
                const img = document.createElement('img')
                const style = document.createElement('div')
                
                beerName.setAttribute('text', beer['beer_name'])
                breweryName.setAttribute('text', beer['brewery_name'])
                style.setAttribute('text', beer['style_id'])
              
                div.className = 'entry-div'
                img.className = 'entry-img'
                beerName.className = 'beer-name'
                breweryName.className = 'brewery-name'
                style.className = 'style'

                img.src = beer.beer_pic
                
                beerName.textContent = `Beer: ${beer.beer_name}`
                breweryName.textContent = `Brewery: ${beer.brewery_name}`
                style.textContent = `Style: ${beer.name}`

                div.append(img, beerName, breweryName, style)
                
                gridCont.appendChild(div)
            })
        })

}


const getStyles = () => {
    axios.get('http://localhost:4000/api/beers')
        .then(res => {
            res.data.forEach(style => {
                const option = document.createElement('option')
                option.setAttribute('value', style['style_id'])
                option.textContent = style.name
                styleSelect.appendChild(option)
            })
        })
}


const addEntry = (event) => {
    event.preventDefault()
    const addBeer = document.getElementById('beer-input')
    const addBrewery = document.getElementById('brewery-input')
    const addPic = document.getElementById('pic-input')
    const addStyle = document.getElementById('style-select')

    const body = {
        beerName: addBeer.value,
        breweryName: addBrewery.value,
        beerPic: addPic.value,
        styleId: addStyle.value
    }

    axios.post(`http://localhost:4000/api/entries`, body)
    .then(res => {
       console.log(res)
       gridCont.innerHTML = ''
       getEntries()
       alert('Beer successfully added!')
        })
        .catch(() => {
            alert('Looks like some information is missing...')
        })
        document.location.reload()
}

getEntries()
getStyles()



submitButton.addEventListener('click', addEntry)