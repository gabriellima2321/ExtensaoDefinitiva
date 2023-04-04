//Cria variavel de validacao para saber se já abriu uma janela
var windowOpen = {minuto: 0, janela: 0};


function openLink(){

    // Cria objeto com as informacoes de data e hora do computador
    var currentTime = new Date();

    // Cria variaveis com as informacoes de hora e minutos
    var hora = currentTime.getHours();
    var minutos = currentTime.getMinutes();

    //Definicao de site para abrir
    var site = "https://www.twitch.tv/tck10";

    //Define horario para abrir o site
    var targetHours = 16;
    var targetMinutos = 02;

    if (hora === targetHours && minutos === targetMinutos && windowOpen.janela === 0){
        // Abra o link em uma nova aba
        windowOpen.minuto = minutos;
        windowOpen.janela = 1;
        chrome.tabs.create({ url : site });
    }

    
    if (windowOpen.janela === 1 && windowOpen.minuto != minutos){
        windowOpen.janela = 0;
        windowOpen.minuto = 0;
    }
    
}

setInterval(openLink, 10000);