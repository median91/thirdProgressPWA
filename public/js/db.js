let dbPromised = idb.open("football-reader", 1, function (upgradeDb) {
  let favoritesObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  favoritesObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(data) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.add(data);
      return tx.complete;
    })
    .then(function myNotif() {
      var txt;
      alert("Tim berhasil difavoritkan!");
      console.log("Data berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (favorites) {
        resolve(favorites);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(function (favorites) {
        if (favorites !== undefined) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}

function deletedTeam(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
    .then(function (db) {
      let tx = db.transaction("teams", 'readwrite');
      let store = tx.objectStore("teams");
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function myNotification() {
      var txt;
      alert("Tim berhasil dihapuskan dari daftar");
      console.log("Data berhasil dihapus.");
      resolve(true);
      getSavedKelompoknya();
    });
  });
}
