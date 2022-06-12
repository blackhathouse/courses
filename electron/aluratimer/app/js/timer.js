const { ipcRenderer } = require('electron');
const moment = require('moment');
let segundos = 0;
let timer;
// 00:12:32
module.exports = {
    iniciar(el){
        let tempo = moment.duration(el.textContent);
        segundos = tempo.asSeconds();
        clearInterval(timer);
        timer = setInterval(()=>{
            segundos++;
            el.textContent = this.segundosParaTempo(segundos);
        }, 1000);
    },parar(curso){
        clearInterval(timer);
        ipcRenderer.send('curso-parado', curso, this.segundosParaTempo(segundos));
    },segundosParaTempo(timeInSeconds){
        return moment().startOf('day').seconds(timeInSeconds).format("HH:mm:ss");
    }
}
