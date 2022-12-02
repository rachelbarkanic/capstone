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
                const br = document.createElement('br')
               

                name.setAttribute('text', beer['style_id'])
                note.setAttribute('text', beer['tasting_note'])
               
                div.className = 'style-div'
                img.className = 'beer-img'
                note.className = 'note-div'
                img.src = beer.picture

                name.textContent = beer.name
                note.textContent = `I taste like: ${beer.note}`
             

                div.append(name, br, img, note)
                

                gridCont.appendChild(div)
            })
        })

}


getStyles()

