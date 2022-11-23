const noteSelect = document.querySelector('#note-select')
const beerButton = document.getElementById("random-beer-button")

const getNotes = () => {
    axios.get('http://localhost:4000/api/notes')
        .then(res => {
            res.data.forEach(note => {
                const option = document.createElement('option')
                option.setAttribute('value', note['style_id'])
                option.textContent = note.note
                noteSelect.appendChild(option)
            })
        })
}

const randomBeer = () => {
    axios.get('http://localhost:4000/api/beers/random')
    .then(res => {
        const data = res.data.name;
        alert("The style you should be drinking right now is: " + data.toUpperCase());
    })
}



beerButton.addEventListener('click', randomBeer)
getNotes()