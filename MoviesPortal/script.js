
const apiDomain = "api.themoviedb.org";
const apiKey = "78dfcd8bdc571ab3d4d798876dc32051";
var quantity = 4;

function getTopRated() {
    $("#container-top-rated").html("");
    console.log("teste");
    let endpoint = `/3/movie/top_rated`;
    let params = `api_key=${apiKey}&language=pt-BR&page=1`;
  
    let url = `https://${apiDomain}${endpoint}?${params}}`;
  
    $.getJSON(url, (response) => {
      const movies = response.results.slice(0, quantity);

      console.log("teste 1");
  
      movies.forEach((movie, index) => {
        const imgUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        console.log(imgUrl);
  
        $('#container-top-rated').prepend(`
            <div class="col-12 col-sm-6 col-lg-3 destaque destaque_para_esconder">
                <img src="${imgUrl}" alt="Destaque 04">
            </div>
        `);
      });
    });
  }