console.log("O script background foi carregado!");


//Cria variavel de validacao para saber se já abriu uma janela
var windowOpen = {minuto: 99, janela: 0};

function abrirSite() {
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
      console.log(site.hora + " " +hora+" "+site.minuto+" "+minutos+" "+windowOpen.janela);
      if (site.hora == hora && site.minuto == minutos && windowOpen.janela < 2){
        console.log("Site a ser aberto sera o: "+ site.site);
        windowOpen.minuto = minutos;
        windowOpen.janela = 1;
        chrome.tabs.create({ url : site.site });
      }

    });

    windowOpen.janela = 2 ; 

    if ( windowOpen.janela > 1 && windowOpen.minuto != minutos ){
        windowOpen.janela = 0;
        windowOpen.minuto = 99;
    }

  });
}

setInterval(abrirSite, 25000);