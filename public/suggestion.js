
const noteSelect = document.querySelector('#note-select')
const beerButton = document.getElementById('random-beer-button')
const submitButton = document.getElementById('submit')

const getNotes = () => {
    axios.get('http://localhost:4000/api/notes')
        .then(res => {
            res.data.forEach(note => {
                const option = document.createElement('option')

                option.className = 'opt'
                
                option.setAttribute('value', note['style_id'])
                option.textContent = note.note
                noteSelect.appendChild(option)
            })
        })
}



const styleSuggestion = () => {
    axios.get(`http://localhost:4000/api/beers/suggest/${noteSelect.value}`)
    .then(res => {

       const data = res.data.name;
       console.log(res)
            alert('you want to drink: ' + data)
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
submitButton.addEventListener('click', styleSuggestion)

getNotes()
