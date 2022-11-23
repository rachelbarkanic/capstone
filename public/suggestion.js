const noteSelect = document.querySelector('#note-select')

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

    getNotes()