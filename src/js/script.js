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
      url: `https://api.jikan.moe/v4/top/anime?page=${currentpage}&limit=10`,
      success: function (result) {
        console.log(result.data);

        // Tampilkan data ke dalam #content
        let content = `<div class="row mt-5" id="contentanime">`;
        // Tampilkan data ke dalam #content

        result.data.forEach(function (item) {
          content += `<div class="col-md-4 col-sm-6  align-items-center rounded-3 d-flex flex-column">
            <img
              src="${item.images.jpg.large_image_url}"
              style="width: 80%; height: 20rem; object-fit: cover center"
              alt=""
              class="rounded-4 border border-dark border-5"
            />  
            <h5  class="p-2">${item.title}</h5>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn mb-3 btn-danger fw-medium see-details"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-title="${item.title}"
              data-image="${item.images.jpg.large_image_url}"
              data-summary="${item.synopsis}"
              data-youtube="${item.trailer.url}"
          
            >
              See Details
            </button>
            <div div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${item.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ${item.synopsis}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>`;
        });
        content += `</div>`;
        $("#content").html(content);
      },
    });
  } else if (kategori == "Now Season") {
    $.ajax({
      url: `https://api.jikan.moe/v4/seasons/now?page=${currentpage}&limit=10`,
      success: function (result) {
        console.log(result.data);

        let content = `<div class="row mt-5" id="contentanime">`;
        // Tampilkan data ke dalam #content

        result.data.forEach(function (item) {
          content += `<div class="col-md-4 col-sm-6  align-items-center rounded-3 d-flex flex-column">
            <img
              src="${item.images.jpg.large_image_url}"
              style="width: 80%; height: 20rem; object-fit: cover center"
              alt=""
              class="rounded-4 border border-dark border-5"
            />
            <h5  class="p-2">${item.title}</h5>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn mb-3 btn-danger fw-medium"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              See Details
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Modal title
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" href="" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        });
        content += `</div>`;
        $("#content").html(content);
      },
    });
  } else if (kategori == "Top Manga") {
    $.ajax({
      url: `https://api.jikan.moe/v4/top/manga?page=${currentpage}&limit=10`,
      success: function (result) {
        console.log(result.data);
        let content = `<div class="row mt-5" id="contentanime">`;
        // Tampilkan data ke dalam #content

        result.data.forEach(function (item) {
          content += `<div class="col-md-4 col-sm-6  align-items-center rounded-3 d-flex flex-column">
            <img
              src="${item.images.jpg.large_image_url}"
              style="width: 80%; height: 20rem; object-fit: cover center"
              alt=""
              class="rounded-4 border border-dark border-5"
            />
            <h5  class="p-2">${item.title}</h5>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn mb-3 btn-danger fw-medium"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              See Details
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Modal title
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" href="" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        });
        content += `</div>`;
        $("#content").html(content);
      },
    });
  }
});
