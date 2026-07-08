
$(document).ready(function () {

  let currentPage = 1;
  let currentSearch = "";
  let currentType = "";
  let totalResults = 0;
  const ITEMS_PER_PAGE = 10;

  $("#pagination").hide();

  $("#searchBtn").click(function () {
    currentSearch = $("#searchInput").val().trim();
    currentType = $("#typeSelect").val();
    currentPage = 1;

    if (currentSearch === "") {
      alert("Please enter a search name!");
      return;
    }

    searchMovies();
  });

  $("#nextBtn").click(function () {
    currentPage++;
    searchMovies();
    window.scrollTo(0, 0);
  });

  $("#prevBtn").click(function () {
    if (currentPage > 1) {
      currentPage--;
      searchMovies();
      window.scrollTo(0, 0);
    }
  });

  function searchMovies() {

    let url = `https://www.omdbapi.com/?s=${encodeURIComponent(currentSearch)}&type=${currentType}&page=${currentPage}&apikey=130d2b6b`;

    $.ajax({
      url: url,
      method: "GET",
      success: function (data) {

        $("#results").empty();

        if (data.Response === "False") {
          $("#results").html(`<p class="text-danger">${data.Error}</p>`);
          $("#pagination").hide();
          return;
        }

        totalResults = parseInt(data.totalResults);
        const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

        $("#prevBtn").prop("disabled", currentPage === 1);
        $("#nextBtn").prop("disabled", currentPage === totalPages);

        if ($("#pageInfo").length === 0) {
          $("#prevBtn").after(`<span id="pageInfo" class="text-muted mx-3"></span>`);
        }
        $("#pageInfo").text(`Page ${currentPage} of ${totalPages}`);

        $("#pagination").show();
        displayResults(data.Search);
      },
      error: function () {
        $("#results").html("<p class='text-danger'>Error fetching data</p>");
      }
    });
  }

  function displayResults(movies) {

    movies.forEach(movie => {

      let poster = movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x445?text=No+Image";

      let imdbLink = `https://www.imdb.com/title/${movie.imdbID}`;

      let card = `
      <div class="col-md-3 mb-4">
        <div class="card movie-card bg-light text-dark h-100">
          <img src="${poster}" class="card-img-top">
          <div class="card-body">
            <h2>${movie.Title}</h2>
            <hr>
            <p>${"Year"}: ${movie.Year}</p>
            <hr>
            <p>${"Type"}: ${movie.Type}</p>
            <a href="${imdbLink}" target="_blank" class="btn btn-sm btn-warning">IMDb</a>
          </div>
        </div>
      </div>
    `;

      $("#results").append(card);
    });
  }

});