// Your code here
const BASE_URL = "http://localhost:3000"

const movieList = document.getElementById("films")
const poster = document.getElementById("poster")
const title = document.getElementById("title")
const runtime = document.getElementById("runtime")
const description = document.getElementById("film-info")
const showtime = document.getElementById("showtime")
const ticketNumber = document.getElementById("ticket-num")
const button = document.getElementById("buy-ticket")

//Fetch movies
function getMoviesData() {
    fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(jsonData => {
        displayTitle(jsonData)
        displayMovie(jsonData[0])
        displayInfo(jsonData[0])
    })
}

getMoviesData()

function displayTitle(jsonData) {
    jsonData.forEach(movie => {
        const movieTitle = document.createElement("li")
        movieTitle.className = "film item"
        movieTitle.innerText = movie.title
        movieList.append(movieTitle)
        movieTitle.addEventListener('click', () => {
            displayMovie(movie)
            displayInfo(movie)
        })
    })
}

function displayMovie(movieObj) {
    poster.src = movieObj.poster
}

function displayInfo (movieObj) {
    title.innerText = movieObj.title
    runtime.innerText = movieObj.runtime + " minutes "
    description.innerText = movieObj.description
    showtime.innerText = movieObj.showtime
    ticketNumber.innerText = movieObj.capacity - movieObj.tickets_sold + " remaining tickets "
}

//Button action
button.addEventListener('click', () => {
    ticketNumber.innerText = buyTickets(parseInt(ticketNumber.innerText,10))
})

// Button details
function buyTickets(ticketNum){
    ticketNum -= 1
    if(ticketNum > 0) {
        return ticketNum + " remaining tickets "
    }
    else {
        return "sold out"
    }
}
