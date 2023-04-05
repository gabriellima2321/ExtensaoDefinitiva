function addSite() {
  var site = "https://www."+document.getElementById("site").value;
  var time = document.getElementById("horario").value;
  var hora = time.split(":")[0];
  var minuto = time.split(":")[1];

  // recuperar o array de sites armazenado no chrome.storage.local
  chrome.storage.local.get('sites', function(result) {
    var sites = result.sites || [];

       // certificar-se de que sites seja um array
       if (!Array.isArray(sites)) {
        sites = [sites];
      }

    // adicionar o novo site ao array
    sites.push({
      site: site,
      hora: hora,
      minuto: minuto
    });

    // armazenar o array atualizado no chrome.storage.local
    chrome.storage.local.set({ 'sites': sites }, function() {
      console.log("Site adicionado: " + site+" no horario: "+ hora + ":" + minuto);
      alert("Site adicionado: " + site+" no horario: "+ hora + ":" + minuto);
    });
  });
}

function removeSite() {
  chrome.storage.local.clear(function() {
    console.log("Dados de armazenamento local foram limpos.");
  });
}

function listaSites() {
  // Cria objeto com as informacoes de data e hora do computador
  var currentTime = new Date();

  // Cria variaveis com as informacoes de hora e minutos
  var hora = currentTime.getHours();
  var minutos = currentTime.getMinutes();

  var sites = [ // valor padrão
    { site: 'https://null.com', hora: 0, minuto: 0 }
  ];

  chrome.storage.local.get('sites', function(result) {
    var storedSites = result.sites || [];

    // certificar-se de que storedSites seja um array
    if (!Array.isArray(storedSites)) {
      storedSites = [storedSites];
    }

    if (storedSites.length > 0) {
      sites = storedSites;
    }

    // aqui você pode fazer o que quiser com o array de sites recuperado
    sites.forEach(function(site) {
      console.log("Site exibido : " + site.site + ' No horario: ' + site.hora + ':' + site.minuto);
      // execute a ação desejada com os valores recuperados
    });
  });
}


  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('definirHorario')
    .addEventListener('click', addSite)});

  document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('removerHorario')
      .addEventListener('click', removeSite)});

  document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('listaHorario')
        .addEventListener('click', listaSites)});
