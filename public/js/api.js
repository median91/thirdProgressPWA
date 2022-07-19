const base_url = "https://api.football-data.org/v2/";
const endPointTeams = `${base_url}competitions/2003/teams`;
const endPointStandings = `${base_url}competitions/2003/standings`;
const endPointTeams2 = `${base_url}competitions/2002/teams`
const fetchData = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': `99202c3389644160b403a1c02469062b`
    }
  })
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
  } else {
      return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getKelompoknya() {
  if ("caches" in window) {
    caches.match(endPointTeams).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var kelompoknyaHTML = "";
          data.teams.forEach(function (kelompok) {
            kelompoknyaHTML += `
            <div class="col s10">
                <div class="card">
                <div class="card-content valign-wrapper">
                  <a href="./kelompok.html?id=${kelompok.id}">
                    <div class="col s7" class="logo-team">
                        <img src="${kelompok.crestUrl}" alt="${kelompok.name}" class="responsive-img center-align">
                    </div>
                  </a>
                    <div class="col s5 information-team">
                    <span class="badge-blue"><strong>${kelompok.name}</strong></span>
                    <p>(Address: ${kelompok.address})</p>
                    </div>
                </div>
                <div class="card-action right-align">
                    <a href="${kelompok.website}" target="_blank" class="website-action">WEBSITE</a>
                </div>
                </div>
            </div>
                `;
          });
          document.getElementById("kelompoknya").innerHTML = kelompoknyaHTML;
        });
      }
    });
  }

  fetchData(endPointTeams)
    .then(status)
    .then(json)
    .then(function (data) {

      var kelompoknyaHTML = "";
      data.teams.forEach(function (kelompok) {
        kelompoknyaHTML += `
        <div class="col s10">
            <div class="card">
            <div class="card-content valign-wrapper">
              <a href="./kelompok.html?id=${kelompok.id}">
                <div class="col s7" class="logo-team">
                    <img src="${kelompok.crestUrl}" alt="${kelompok.name}" class="responsive-img center-align">
                </div>
              </a>
                <div class="col s5 information-team">
                <span class="badge-blue"><strong>${kelompok.name}</strong></span>
                <p>(Address: ${kelompok.address})</p>
                </div>
            </div>
            <div class="card-action right-align">
                <a href="${kelompok.website}" target="_blank" class="website-action">WEBSITE</a>
            </div>
            </div>
        </div>
            `;
      });
      document.getElementById("kelompoknya").innerHTML = kelompoknyaHTML;
    })
    .catch(error);
}

function getKelompokById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var kelompokHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" class="responsive-img"  />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
              </div>
            </div>
          `;
            document.getElementById("body-content").innerHTML = kelompokHTML;

            resolve(data);
          });
        }
      });
    }

    fetchData(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        var kelompokHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" class="responsive-img" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = kelompokHTML;
        resolve(data);
      });
  });
}

function getSavedKelompoknya() {
  getAll().then(function (kelompoknya) {
    console.log(kelompoknya);
    var kelompoknyaHTML = "";
    kelompoknya.forEach(function (kelompok) {
      kelompoknyaHTML += `
                  <div class="card">
                    <a href="./kelompok.html?id=${kelompok.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${kelompok.crestUrl}" class="responsive-img" />
                      </div>
                    </a>
                    <div class="card-content">
                    <a class="btn-floating halfway-fab waves-effect waves-light red" id="deleted" onclick="deletedTeam(${kelompok.id})"><i class="material-icons">delete</i></a>
                      <span class="card-title truncate">${kelompok.name
        }</span>
                      <p>${kelompok.website}</p>
                    </div>
                  </div>
                `;
    });
    document.getElementById("body-content").innerHTML = kelompoknyaHTML;
  });
}

function getSavedKelompokById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (kelompok) {
    kelompokHTML = '';
    var kelompokHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${kelompok.crestUrl}" class="responsive-img" />
      </div>
      <div class="card-content">
        <span class="card-title">${kelompok.name}</span>
        <p>${kelompok.website}</p>
      </div>
    </div>
  `;
    document.getElementById("body-content").innerHTML = kelompokHTML;
  });
}
//Batas T-S
function getStandings() {
  if ("caches" in window) {
    caches.match(endPointStandings).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var standingsHTML = "";
          data.standings[0].table.forEach(function (standing) {
            standingsHTML += `
                  <tr>
                      <td>${standing.position}</td>
                      <td><img src="${standing.team.crestUrl}" alt="${standing.team.name}" class="responsive-img" width="50"></td>
                      <td>${standing.team.name}</td>
                      <td>${standing.points}</td>
                  </tr>
                `;
          });
          document.getElementById("standings-table").innerHTML = standingsHTML;
        });
      }
    });
  }

  fetchData(endPointStandings)
    .then(status)
    .then(json)
    .then(function (data) {

      var standingsHTML = "";
      data.standings[0].table.forEach(function (standing) {
        standingsHTML += `
        <tr>
            <td>${standing.position}</td>
            <td><img src="${standing.team.crestUrl}" alt="${standing.team.name}" class="responsive-img" width="50"></td>
            <td>${standing.team.name}</td>
            <td>${standing.points}</td>
        </tr>
            `;
      });
      document.getElementById("standings-table").innerHTML = standingsHTML;
    })
    .catch(error);
}
//batas S-T
function getTims() {
  if ("caches" in window) {
    caches.match(endPointTeams2).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var timsHTML = "";
          data.teams.forEach(function (tim) {
            timsHTML += `
            <div class="col s10">
                <div class="card">
                <div class="card-content valign-wrapper">
                  <a href="./kelompok.html?id=${tim.id}">
                    <div class="col s7" class="logo-team">
                        <img src="${tim.crestUrl}" alt="${tim.name}" class="responsive-img center-align">
                    </div>
                  </a>
                    <div class="col s5 information-team">
                    <span class="badge-blue"><strong>${tim.name}</strong></span>
                    <span>(Address: ${tim.address})</span>
                    </div>
                </div>
                <div class="card-action right-align">
                    <a href="${tim.website}" target="_blank" class="website-action">WEBSITE</a>
                </div>
                </div>
            </div>
                `;
          });
          document.getElementById("tims").innerHTML = timsHTML;
        });
      }
    });
  }

  fetchData(endPointTeams2)
    .then(status)
    .then(json)
    .then(function (data) {

      var timsHTML = "";
      data.teams.forEach(function (tim) {
        timsHTML += `
        <div class="col s10">
            <div class="card">
            <div class="card-content valign-wrapper">
              <a href="./kelompok.html?id=${tim.id}">
                <div class="col s7" class="logo-team">
                    <img src="${tim.crestUrl}" alt="${tim.name}" class="responsive-img center-align">
                </div>
              </a>
                <div class="col s5 information-team">
                <span class="badge-blue"><strong>${tim.name}</strong></span>
                <span>(Address: ${tim.address})</span>
                </div>
            </div>
            <div class="card-action right-align">
                <a href="${tim.website}" target="_blank" class="website-action">WEBSITE</a>
            </div>
            </div>
        </div>
            `;
      });
      document.getElementById("tims").innerHTML = timsHTML;
    })
    .catch(error);
}

function getTimById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var timsHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                <p>${data.website} </p>
              </div>
            </div>
          `;
            document.getElementById("body-content").innerHTML = timsHTML;

            resolve(data);
          });
        }
      });
    }

    fetchData(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        var timsHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <p>${data.website} </p>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = timsHTML;
        resolve(data);
      });
  });
}

function getSavedTims() {
  getAll().then(function (tims) {
    console.log(tims);
    var timsHTML = "";
    tims.forEach(function (tim) {

      timsHTML += `
                  <div class="card">
                    <a href="./tims.html?id=${tim.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${tim.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                    <a class="btn-floating halfway-fab waves-effect waves-light red" id="deleted" onclick="deletedTeam(${tim.id})"><i class="material-icons">delete</i></a>
                      <span class="card-title truncate">${tim.name
        }</span>
                      <p>${tim.website}</p>
                    </div>
                  </div>
                `;
    });
    document.getElementById("body-content").innerHTML = timsHTML;
  });
}

function getSavedTimById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (tim) {
    timsHTML = '';
    var timsHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${tim.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title">${tim.name}</span>
        <p>${tim.website}</p>
      </div>
    </div>
  `;
    document.getElementById("body-content").innerHTML = timsHTML;
  });
}
