const apiDomain = "api.themoviedb.org";
const apiKey = "78dfcd8bdc571ab3d4d798876dc32051";
var quantity = 4;

function setKeywordSearch() {
    keyword = $("#input-pesquisar").val();
    localStorage.setItem("keyword-search", keyword);
    window.location.href = "search.html";
}

function getSearchResults() {
  keyword = localStorage.getItem("keyword-search");

  if(jQuery.isEmptyObject(keyword)) {
    presentSearchError(keyword);
    return;
  }

  $("#section-search search-results").remove();
  let endpoint = `/3/search/movie`;
  let params = `api_key=${apiKey}&language=pt-BR&page=1&query=${keyword}&page=1&include_adult=false`;

  let url = `https://${apiDomain}${endpoint}?${params}}`;

  $.getJSON(url, (response) => {
    const movies = response.results;
    
    if(Object.keys(movies).length == 0) {
      presentSearchError(keyword);
      return;
    }
  
    $("#texto-busca").html(`Resultados para "${keyword}"`);

    movies.forEach((movie, index) => {
      const imgUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

      if (movie.poster_path != null) {
          console.log(movie.id);
          $("#section-search").append(`
          
          <div class="col-12 col-sm-6 col-lg-3 destaque">
            <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
              <img src="${imgUrl}" alt="Destaque 01">
              <p>${movie.original_title}</p>
              </a>
          </div>
          
        `);
      }
    });
  });
}

function presentSearchError(keyword) {
  $("#texto-busca").html(`Não encontramos resultados para "${keyword}"`);
}

function getTopRated(page) {
    let endpoint = `/3/movie/popular`;
    let params = `api_key=${apiKey}&language=pt-BR&page=${page}`;
  
    let url = `https://${apiDomain}${endpoint}?${params}}`;
  
    $.getJSON(url, (response) => {
      const movies = response.results.slice(0, quantity);

      if(Object.keys(movies).length > 0) {
        $(".title_container").removeClass("hidden-div");

        movies.forEach((movie, index) => {
          const imgUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
          console.log(imgUrl);
    
          $('#em_destaque').append(`
              <div class="col-12 col-sm-6 col-lg-3 destaque ${index > 1 ? "destaque_para_esconder" : ""}">
                <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
                  <img src="${imgUrl}" alt="Destaque 01">
                </a>
              </div>
          `);
        });
   
        if(quantity < 16) {
            $('#em_destaque').append(`
          <div class="col-12 div_carregar_mais">
            <button onClick="loadMore()" type="button" class="btn btn-outline-warning carregar_mais">Carregar mais filmes</button>
          </div>`);
        }
      }
    });
  }

  function loadMore() {
    quantity += 4;
    $("#em_destaque .div_carregar_mais").remove();
    $("#em_destaque .destaque").remove();
    getTopRated();
  }