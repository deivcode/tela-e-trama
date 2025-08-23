// modal.js

const background = document.getElementById('modal-background');
const modalContainer = document.getElementById('modal-conteiner');

// Função para fechar o modal
function closeAndResetModal() {
    overlay.classList.remove('open');
    // Limpa o conteúdo para evitar que o modal antigo apareça rapidamente na próxima vez
    modalContainer.innerHTML = '';
}

background.addEventListener('click', closeAndResetModal);

// Função que cria o conteúdo do modal com os dados do filme
function createModal(data) {
    // --- Lógica para encontrar o trailer oficial ---
    // Procura na lista de vídeos por um que seja do tipo "Trailer" e do site "YouTube"
    const trailer = data.videos?.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    const trailerKey = trailer ? trailer.key : null;

    // --- Lógica para formatar os outros dados ---
    const genres = data.genres.map(genre => genre.name).join(', ');
    const cast = data.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    const year = data.release_date ? data.release_date.split('-')[0] : 'Ano não informado';

    modalContainer.innerHTML = `
        <button class="close-modal-button" id="close-modal">&times;</button>
        <h2 id="movie-title">${data.title}</h2>
        <h3 id="movie-year">${year}</h3>

        <section id="modal-body">
            <img id="movie-poster" src="${data.poster_path ? imageBaseUrl + data.poster_path : 'https://via.placeholder.com/250x375?text=Poster+N/A'}" alt="Poster do filme">
            
            <div id="movie-info"> 
                <div id="movie-plot">
                    <h3>${data.overview || "Sinopse não disponível em português."}</h3>
                </div>

                <div id="movie-cast">
                    <h5>Elenco:</h5> 
                    <h4>${cast}</h4>
                </div>

                <div id="movie-genre">
                    <h4 class="genero-filme">Gênero:</h4>
                    <h5>${genres}</h5>
                </div>
            </div>
        </section>
        
        <section id="modal-footer">
            ${trailerKey ? `<a href="https://www.youtube.com/watch?v=${trailerKey}" target="_blank" class="trailer-button">Ver Trailer</a>` : ''}
            <button id="add-to-list">Adicionar à Lista</button>
        </section>
    `;
    
    // --- Adicionando as funcionalidades aos botões ---

    // 1. Funcionalidade do botão de fechar "X"
    const closeModalButton = document.getElementById('close-modal');
    closeModalButton.addEventListener('click', closeAndResetModal);
    
    // 2. Funcionalidade do botão "Adicionar à Lista"
    const addToListButton = document.getElementById('add-to-list');
    addToListButton.addEventListener('click', () => {
        addToList(data); // Chama a função do script.js
    });
}