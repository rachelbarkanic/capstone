const gridCont = document.getElementById('grid-container')

const getStyles = () => {
    axios.get('http://localhost:4000/api/beers')
        .then(res => {
            console.log(res.data)
            res.data.forEach(beer => {
                const div = document.createElement('div')
                const name = document.createElement('div')
                const img = document.createElement('img')
                const note = document.createElement('div')

                name.setAttribute('text', beer['style_id'])
                note.setAttribute('text', beer['tasting_note'])

                img.className = 'beer-img'
                note.className = 'note-div'
                img.src = beer.picture

                name.textContent = beer.name.toUpperCase()
                note.textContent = beer.note

                div.append(name, img, note)
                

                gridCont.appendChild(div)
            })
        })

}


getStyles()