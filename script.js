const topAnimeContainer = document.querySelector('#top-anime-container')
const seasonAnimeContainer = document.querySelector('#season-anime-container')
const navIcon = document.querySelector('.nav-icon')
const navLinks = document.querySelector('.nav-links')
const searchIcon = document.querySelector('.search-icon')
const searchBar = document.querySelector('.search-bar')
const searchAnimeTitle = document.querySelector('.search-anime-title')
const searchAnimeImage = document.querySelector('.search-anime-image')
const searchSuggestions = document.querySelector('.search-suggestions')
const animeCardArrow = document.querySelector('.anime-arrow')


const animeArray = []
const wrapperArray = []

searchBar.addEventListener('keyup', (e) => {
    searchSuggestions.innerHTML = ''
    let searchText = searchBar.value
    if (searchText === '') return searchSuggestions.style.display = "none"
    if (e.key === 'Backspace' && searchText === '') return searchSuggestions.innerHTML = ''
    console.log(searchText)
    
    let filteredAnime = animeArray.filter(anime => anime.title.startsWith(searchText))
    filteredAnime.forEach(anime => {
        const suggestionWrapper = document.createElement('div')
        suggestionWrapper.classList.add('suggestion-wrapper')
        suggestionWrapper.innerHTML = `
        <img src="${anime.image_url}" alt="" class="search-anime-image">
        <p class="search-anime-title">${anime.title}</p>
        `
        searchSuggestions.appendChild(suggestionWrapper)
        searchSuggestions.style.display = "flex"
    })
    
})

const fetchAnime = async (animeIndex) => {
    const url = `https://api.jikan.moe/v3/top/anime/1/upcoming`
    const res = await fetch(url)
    const data = await res.json()
    const animeData = data.top[animeIndex]
    createAnimeCard(animeData)
}
const getAllAnime = () => {
    for (let i = 0; i < 50; i++) {
        for (let j = 1; j < 8; j++) {
            fetchAllAnime(i, j)
        }
    }
    
}
const fetchAllAnime = async (animeValue, page) => {
    const url = `https://api.jikan.moe/v3/top/anime/${page}`
    const res = await fetch(url)
    const data = await res.json()
    const animeObject = {
        image_url: data.top[animeValue].image_url,
        title: data.top[animeValue].title.toLowerCase()
    }
    allAnimeData(animeObject)
}

function allAnimeData(anime) {
    animeArray.push(anime)
}

getAllAnime()

const getAnime = () => {
    for (let i = 0; i < 15; i++) {
        fetchAnime(i)
        fetchAnimeSeason(i)
    }
}

const fetchAnimeSeason = async (seasonAnimeIndex) => {
    const url = `https://api.jikan.moe/v3/season/2021/spring`
    const res = await fetch(url)
    const data = await res.json()
    const seasonAnimeData = data.anime[seasonAnimeIndex]
    createSeasonAnimeCard(seasonAnimeData)
}

function createAnimeCard(anime) {
    const animeCardEl = document.createElement('div')
    animeCardEl.classList.add('anime__card')
    animeCardEl.innerHTML = `<img src="${anime.image_url}" alt="" class="card-image">`
    topAnimeContainer.appendChild(animeCardEl)
}

function createSeasonAnimeCard(anime) {
    const animeCardEl = document.createElement('div')
    animeCardEl.classList.add('anime__card')
    animeCardEl.innerHTML = `<img src="${anime.image_url}" alt="" class="card-image">`
    seasonAnimeContainer.appendChild(animeCardEl)
}

getAnime()

navIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active-nav')
})

searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('show-search')
    searchBar.focus()
})
/* let animeCard = document.querySelector('.anime__card')
const animeCards = Array.from(topAnimeContainer.children)
animeCardArrow.addEventListener('click', () => {
    animeCards.forEach(card => {
        card.style.transform = 'translateX(-500px)'
    })
    
})
console.log(animeCard) */