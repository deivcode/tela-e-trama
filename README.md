# 🎬 Tela & Trama

![Status do Projeto](https://img.shields.io/badge/status-concluído-green)

Bem-vindo ao Tela & Trama! Este é um dos meus primeiros projetos como programador, criado durante um curso de JavaScript para aprofundar meus conhecimentos em desenvolvimento front-end. O objetivo era consumir uma API real e construir uma experiência de usuário interativa e prática. A proposta do Tela & Trama é simples: um espaço onde você pode buscar filmes e salvar seus favoritos em uma lista que permanece salva, mesmo depois de fechar o navegador. Tudo foi feito com objetivo de aprendizado .

<br>

<p align="center">
  <img src="gif-tela-e-trama.gif" alt="Demonstração do Tela & Trama em ação" width="80%">
</p>

## ✨ O que ele faz?

* **Busca de Filmes em Tempo Real:** Conectado com a API do [The Movie Database (TMDB)](https://www.themoviedb.org/), você pode pesquisar praticamente qualquer filme que imaginar.
* **Detalhes Completos:** Veja a sinopse, elenco, gênero e ano de lançamento de cada filme em um modal limpo e responsivo.
* **Sua Lista Salva, Sempre!** Graças ao `localStorage` do navegador, sua lista de filmes não desaparece. Recarregue a página ou volte amanhã, e seus filmes estarão lá esperando por você.
* **Design Moderno e Responsivo:** Desenvolvi uma interface com um tema claro e vibrante, que se adapta perfeitamente a telas de desktop e de celular.

## 🛠️ Ferramentas e Tecnologias

Este projeto foi construído do zero, focando nas tecnologias essenciais do front-end:

* **HTML5:** Para a estrutura semântica do conteúdo.
* **CSS3:** Para a estilização, com uso de Flexbox, variáveis CSS e Media Queries para a responsividade. Inicialmente o foco nao era na estetica do site
  o foco era totalmente na linguagem de programção JavaScript , os detalhes e leves animações foram adicionados posteriormente junto com uma paleta de cores harmonicas
  com ajuda de recursos da internet sobre estilização e documento de CSS.
* **JavaScript (ES6+):** Para toda a interatividade, manipulação do DOM e lógica da aplicação, incluindo:
    * `fetch` API com `async/await` para as requisições.
    * `localStorage` para a persistência de dados.

## Você pode acessar diretamente pela internet por esse link : https://deivcode.github.io/tela-e-trama/

## ou :

## 🚀 Como Rodar Localmente

Se você quiser explorar o código na sua máquina, é bem simples:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/deivcode/tela-e-trama.git
    ```

2.  **Crie seu arquivo de configuração:**
    * Dentro da pasta, você encontrará um arquivo chamado `config.js.example`.
    * Crie uma cópia dele e renomeie para `config.js`.

3.  **Adicione sua chave da API:**
    * Você vai precisar de uma chave de API do TMDB. É grátis e você consegue [aqui](https://www.themoviedb.org/settings/api). é bem rapidinho só colocar o email e senha e ele ja te envia sua API .
    * Abra o `config.js` que você criou e cole sua chave de API lá dentro.

4.  **Pronto!**
    * Agora é só abrir o arquivo `index.html` no seu navegador.


## 🧠 Principais Aprendizados

Desenvolver o Tela & Trama foi uma jornada de novos conhecimentos , marca meu inicio na programação . Alguns dos pontos que mais me desenvolveram foram:

* Aprofundar o uso de `async/await` para lidar com a natureza assíncrona das APIs.
* Entender na prática a importância de proteger chaves de API, utilizando `.gitignore` e um arquivo de configuração separado.
* Implementar um fluxo completo de CRUD (Create, Read, Delete) em uma lista de dados, com persistência no `localStorage` OBS: essa foi uma das parte mais magicas, tirando quando a api puxou os dados para o meu site.
* Refinar a estilização e a experiência do usuário, pensando em responsividade e microinterações.

---

Feito Deive. Fique à vontade para explorar o código!
