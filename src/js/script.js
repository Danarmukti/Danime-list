let currentpage = 1;
$(".nav-link").on("click", function () {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");

  let kategori = $(this).html();
  console.log(kategori);
  $("#judulHalaman").html(kategori);

  // Bersihkan konten sebelum menambahkan yang baru
  $("#content").empty();

  if (kategori == "Home") {
    $("#content").html(`
          <h4 class="text-center p-5">
            Just Practice to GET PUBLIC API into my own website<br />
            click menu to see the result.
          </h4>
          <a
            class="px-5 py-3 btn btn-success fw-medium"
            href="https://github.com/Danarmukti"
            target="_blank"
          >
            DanarCode
          </a>
          `);
    return;
  }

  if (kategori == "Top Anime") {
    $.ajax({
      url: `https://api.jikan.moe/v4/top/anime?page=${currentpage}&limit=20`,
      success: function (result) {
        console.log(result.data);
        let content = `<div class="row mt-5" id="contentanime">
        <h3 class="mb-5 fw-bold">TOP ${result.pagination.items.count} Anime </h3>
        `;

        result.data.forEach(function (item) {
          content += `<div class="col-md-4 col-sm-6 mb-5 position-relative align-items-center rounded-3 d-flex flex-column">
              <div class="bg-warning p-2 fw-bold rounded-4 position-absolute " style="top: 20px; left:85px">Rank ${
                item.rank
              }</div>
              <div class="bg-warning py-2 px-3 fw-bold rounded-4 position-absolute " style="top: 20px; left:165px">⭐${
                item.score === null ? "-" : item.score
              }</div>
          <img
              src="${item.images.jpg.large_image_url}"
              style="width: 75%; height: 20rem; object-fit: cover center"
              alt=""
              class="rounded-4 border border-dark border-5 "
            />
            <div class="row align-items-center justify-content-between "> 
              <div class="col"> 
                <h5 class="p-2">${item.title}</h5>
              </div>
            </div>
            <button 
              class="btn btn-danger btn-sm see-details" 
              data-bs-toggle="modal" 
              data-bs-target="#detailsModal" 
              data-title="${item.title}" 
              data-image="${item.images.jpg.image_url}" 
              data-description="${item.synopsis}"
              data-score="${item.score}"
              data-rank="${item.rank}"
              data-status="${item.status}"
              data-episodes="${item.episodes}"
              data-source="${item.source}"
              data-type="${item.type}"
              data-rating="${item.rating}"
              data-season="${item.season}"
              data-year="${item.year}">
              See Details
            </button>
          </div>`;
        });

        content += `</div>`;
        $("#content").html(content);
        $("#detailsModal").remove();
        // Tambahkan modal HTML di luar loop
        let modalHTML = `
          <div class="modal fade container" id="detailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="" class="img-fluid w-100 modal-image rounded-4 " alt="">
                    </div>
                    <div class="col-md-8">
                      <h5 class="modal-title"></h5>
                      <div class="status"> </div>
                      <div class="episode"> </div>
                      <div class="season"> </div>
                      <div class="year"> </div>
                      <div class="score"> </div>

                      <h5 class="mt-3"> Synopsis </h5>
                      <hr/>
                      <p class="modal-description"></p>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`;

        // Tambahkan modal ke body
        $("body").append(modalHTML);

        // Event handler untuk tombol See Details
        $(".see-details").on("click", function () {
          let title = $(this).data("title");
          let image = $(this).data("image");
          let alt = $(this).data("title");
          let rank = $(this).data("rank");
          let vote = $(this).data("score");
          let status = $(this).data("rating");
          let episode = $(this).data("episodes");
          let year = $(this).data("year");
          let season = $(this).data("season");
          let description = $(this).data("description");

          $("#detailsModal .modal-title").text(title);
          $("#detailsModal .status").text(
            "Status : " + (status === null ? "--" : status)
          );
          $("#detailsModal .episode").text(
            "Episode : " + (episode === null ? "--" : episode)
          );
          $("#detailsModal .year").text(
            "Year : " + (year === null ? "--" : year)
          );
          $("#detailsModal .season").text(
            "Season : " + (season === null ? "--" : season)
          );
          $("#detailsModal .score").text("⭐ " + (vote === null ? "--" : vote));
          $("#detailsModal .modal-image").attr("src", image);
          $("#detailsModal .modal-image").attr("alt", alt);
          $("#detailsModal .modal-description").text(description);
        });
      },
    });
  } else if (kategori == "Now Season") {
    $.ajax({
      url: `https://api.jikan.moe/v4/seasons/now?page=${currentpage}&limit=15`,
      success: function (result) {
        console.log(result.data);
        let content = `<div class="row mt-5" id="contentanime">`;

        result.data.forEach(function (item) {
          content += `<div class="col-md-4 col-sm-6 mb-5 position-relative align-items-center rounded-3 d-flex flex-column">
              <div class="bg-warning py-2 px-3 fw-bold rounded-4 position-absolute " style="top: 20px; left:85px">⭐${
                item.score === null ? "-" : item.score
              }</div>
          <img
              src="${item.images.jpg.large_image_url}"
              style="width: 75%; height: 20rem; object-fit: cover center"
              alt=""
              class="rounded-4 border border-dark border-5 "
            />
            <div class="row align-items-center justify-content-between "> 
              <div class="col"> 
                <h5 class="p-2">${item.title}</h5>
              </div>
            </div>
            <button 
              class="btn btn-danger btn-sm see-details" 
              data-bs-toggle="modal" 
              data-bs-target="#detailsModal" 
              data-title="${item.title}" 
              data-image="${item.images.jpg.image_url}" 
              data-description="${item.synopsis}"
              data-score="${item.score}"
              data-rank="${item.rank}"
              data-status="${item.status}"
              data-episodes="${item.episodes}"
              data-source="${item.source}"
              data-type="${item.type}"
              data-rating="${item.rating}"
              data-season="${item.season}"
              data-year="${item.year}">
              See Details
            </button>
          </div>`;
        });

        content += `</div>`;
        $("#content").html(content);
        $("#detailsModal").remove();
        // Tambahkan modal HTML di luar loop
        let modalHTML = `
          <div class="modal fade container" id="detailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="" class="img-fluid w-100 modal-image rounded-4 " alt="">
                    </div>
                    <div class="col-md-8">
                      <h5 class="modal-title"></h5>
                      <div class="status"> </div>
                      <div class="episode"> </div>
                      <div class="season"> </div>
                      <div class="year"> </div>
                      <div class="score"> </div>

                      <h5 class="mt-3"> Synopsis </h5>
                      <hr/>
                      <p class="modal-description"></p>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`;

        // Tambahkan modal ke body
        $("body").append(modalHTML);

        // Event handler untuk tombol See Details
        $(".see-details").on("click", function () {
          let title = $(this).data("title");
          let image = $(this).data("image");
          let alt = $(this).data("title");
          let rank = $(this).data("rank");
          let vote = $(this).data("score");
          let status = $(this).data("rating");
          let episode = $(this).data("episodes");
          let year = $(this).data("year");
          let season = $(this).data("season");
          let description = $(this).data("description");

          // Isi konten modal
          $("#detailsModal .modal-title").text(title);
          $("#detailsModal .status").text(
            "Status : " + (status === null ? "--" : status)
          );
          $("#detailsModal .episode").text(
            "Episode : " + (episode === null ? "--" : episode)
          );
          $("#detailsModal .year").text(
            "Year : " + (year === null ? "--" : year)
          );
          $("#detailsModal .season").text(
            "Season : " + (season === null ? "--" : season)
          );
          $("#detailsModal .score").text("⭐ " + (vote === null ? "--" : vote));
          $("#detailsModal .modal-image").attr("src", image);
          $("#detailsModal .modal-image").attr("alt", alt);
          $("#detailsModal .modal-description").text(description);
        });
      },
    });
  } else if (kategori == "Top Manga") {
    $.ajax({
      url: `https://api.jikan.moe/v4/top/manga?page=${currentpage}&limit=20`,
      success: function (result) {
        console.log(result.data);
        let content = `<div class="row mt-5" id="contentanime">
        <h3 class="mb-5 fw-bold">TOP ${result.pagination.items.count} Manga </h3>
        `;

        result.data.forEach(function (item) {
          content += `<div class="col-md-4 col-sm-6 mb-5 position-relative align-items-center rounded-3 d-flex flex-column">
              <div class="bg-warning p-2 fw-bold rounded-4 position-absolute " style="top: 20px; left:85px">Rank ${item.rank}</div>
              <div class="bg-warning py-2 px-3 fw-bold rounded-4 position-absolute " style="top: 20px; left:165px">⭐${item.score}</div>
          <img
              src="${item.images.jpg.large_image_url}"
              style="width: 75%; height: 20rem; object-fit: cover center"
              alt=""
              class="rounded-4 border border-dark border-5 "
            />
            <div class="row align-items-center justify-content-between "> 
              <div class="col"> 
                <h5 class="p-2">${item.title}</h5>
              </div>
            </div>
            <button 
              class="btn btn-danger btn-sm see-details" 
              data-bs-toggle="modal" 
              data-bs-target="#detailsModal" 
              data-title="${item.title}" 
              data-image="${item.images.jpg.image_url}" 
              data-description="${item.synopsis}"
              data-score="${item.score}"
              data-rank="${item.rank}"
              data-status="${item.status}"
              data-chapters="${item.chapters}"
              data-volumes="${item.volumes}"
              data-type="${item.type}"
              data-rating="${item.rating}"
              data-season="${item.season}"
              data-year="${item.year}"
              data-published="${item.published.string}">
              See Details
            </button>
          </div>`;
        });

        content += `</div>`;
        $("#content").html(content);
        $("#detailsModal").remove();
        // Tambahkan modal HTML di luar loop
        let modalHTML = `
          <div class="modal fade container" id="detailsModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="" class="img-fluid w-100 modal-image rounded-4 " alt="">
                    </div>
                    <div class="col-md-8">
                      <h5 class="modal-title"></h5>
                      <div class="status-manga"> </div>
                      <div class="chapter"> </div>
                      <div class="volume"> </div>
                      <div class="author"> </div>
                      <div class="From"> </div>
                      <div class="score"> </div>

                      <h5 class="mt-3"> Synopsis </h5>
                      <hr/>
                      <p class="modal-description"></p>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`;

        // Tambahkan modal ke body
        $("body").append(modalHTML);

        // Event handler untuk tombol See Details
        $(".see-details").on("click", function () {
          const title = $(this).data("title");
          const image = $(this).data("image");
          const alt = $(this).data("title");
          const rank = $(this).data("rank");
          const vote = $(this).data("score");
          const status = $(this).data("status");
          const episode = $(this).data("chapters");
          const year = $(this).data("volumes");
          const published = $(this).data("published");
          const description = $(this).data("description");

          // Isi konten modal
          $("#detailsModal .modal-title").text(title);
          $("#detailsModal .status-manga").text("Status : " + status);
          $("#detailsModal .chapter").text(
            "Chapters : " + (episode === null ? "--" : episode)
          );
          $("#detailsModal .volume").text(
            "Volume : " + (year === null ? "--" : year)
          );
          $("#detailsModal .From").text(
            "published : " + (published === null ? "--" : published)
          );
          $("#detailsModal .score").text("⭐ " + vote);
          $("#detailsModal .modal-image").attr("src", image);
          $("#detailsModal .modal-image").attr("alt", alt);
          $("#detailsModal .modal-description").text(description);
        });
      },
    });
  }
});
