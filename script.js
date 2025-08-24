/*--------------------------------------------------------------------------
   CONFIGURAÇÃO INICIAL
   --------------------------------------------------------------------------*/
const searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');
const movieNameInput = document.getElementById('nome-filme');
const movieYearInput = document.getElementById('ano-filme');
const movieListContainer = document.getElementById('movie-list');

let movieList = [];

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

/*--------------------------------------------------------------------------
   LÓGICA DO LOCALSTORAGE
   --------------------------------------------------------------------------*/

function saveListToLocalStorage() {
    localStorage.setItem('minhaListaDeFilmes', JSON.stringify(movieList));
}

function loadListFromLocalStorage() {
    const savedListJSON = localStorage.getItem('minhaListaDeFilmes');
    if (savedListJSON) {
        movieList = JSON.parse(savedListJSON);
    }
}

function renderList() {
    movieListContainer.innerHTML = '';
    if (movieList.length > 0) {
        movieList.forEach(movie => {
            updateUI(movie);
        });
    } else {
        movieListContainer.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-camera-reels"></i>
                <h2>Sua lista de filmes está vazia</h2>
                <p>Use a busca acima para encontrar filmes e adicioná-los à sua coleção!</p>
            </div>
        `;
    }
}

/*--------------------------------------------------------------------------
   FUNÇÕES AUXILIARES E VALIDAÇÃO
   --------------------------------------------------------------------------*/
function limparCampos() {
    movieNameInput.value = '';
    movieYearInput.value = '';
}

function getMovieNameParameter() {
    if (movieNameInput.value.trim() === '') {
        throw new Error('O campo "Nome do Filme" é obrigatório para a busca.');
    }
    return encodeURIComponent(movieNameInput.value);
}

function getMovieYearParameter() {
    const year = movieYearInput.value;
    if (year === '') {
        return '';
    }
    if (year.length !== 4 || isNaN(Number(year))) {
        throw new Error('Ano do filme inválido. Deve conter 4 dígitos.');
    }
    return year;
}

function exibirModal() {
    overlay.classList.add('open');
}

/*------------------------------------------------------------------------
   LÓGICA DA API (TMDB)
   --------------------------------------------------------------------------*/
async function searchButtonClickHandler() {
    try {
        const movieName = getMovieNameParameter();
        const movieYear = getMovieYearParameter();

        let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}&language=pt-BR`;
        if (movieYear !== '') {
            searchUrl += `&primary_release_year=${movieYear}`;
        }
        
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (searchData.results.length === 0) {
            notie.alert({ type: 'warning', text: 'Nenhum filme encontrado com esse nome e ano.' });
            return;
        }

        const movieId = searchData.results[0].id;
        const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`;
        
        const detailsResponse = await fetch(detailsUrl);
        const movieDetails = await detailsResponse.json();
        
        createModal(movieDetails);
        exibirModal();
        limparCampos();

    } catch (error) {
        notie.alert({
            type: 'error',
            text: error.message
        });
    }
}

/*--------------------------------------------------------------------------
   EVENT LISTENERS (PESQUISA)
   -----------------------------------------------------------------------*/
searchButton.addEventListener('click', searchButtonClickHandler);
movieNameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchButtonClickHandler();
});
movieYearInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchButtonClickHandler();
});

/*------------------------------------------------------------------------
   LISTA DE FILMES
   --------------------------------------------------------------------------*/

function addToList(movieObject) {
    if (movieList.some(movie => movie.id === movieObject.id)) {
        notie.alert({ type: 'warning', text: 'Este filme já está na sua lista!' });
        return;
    }
    movieList.push(movieObject);
    updateUI(movieObject);
    saveListToLocalStorage();
    overlay.classList.remove('open');
}

function updateUI(movieObject) {
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }

    movieListContainer.innerHTML += `
        <div class="movie-card" id="movie-card-${movieObject.id}">
            <img src="${imageBaseUrl}${movieObject.poster_path}" alt="Poster do filme ${movieObject.title}.">
            <button class="remove-button" onclick="removeFromList(${movieObject.id})">
                <i class="bi bi-trash3-fill"></i> Remover
            </button>
        </div>`;
}

function removeFromList(movieId) {
    movieList = movieList.filter(movie => movie.id !== movieId);
    document.getElementById(`movie-card-${movieId}`).remove();
    saveListToLocalStorage();

    if (movieList.length === 0) {
        movieListContainer.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-camera-reels"></i>
                <h2>Sua lista de filmes está vazia</h2>
                <p>Use a busca acima para encontrar filmes e adicioná-los à sua coleção!</p>
            </div>
        `;
    }
}

/*--------------------------------------------------------------------------
   INICIALIZAÇÃO DA PÁGINA
   -----------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    loadListFromLocalStorage();
    renderList();
});