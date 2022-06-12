const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () => {
    data.pegaDados(curso.textContent)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        }).catch((err) => {
            console.log(err);
        });
};

linkSobre.addEventListener('click', function () {
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', function () {
    if (play) {
        timer.parar(curso.textContent);
        play = false;
        try {
            new Notification('Alura Timer', {
                body: `O curso ${curso.textContent} foi pausado`,
                icon: 'img/stop-button.png'
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        timer.iniciar(tempo);
        play = true;
        try {
            new Notification('Alura Timer', {
                body: `O curso ${curso.textContent} foi iniciado`,
                icon: 'img/play-button.png'
            });
        } catch (error) {
            console.log(error);
        }
    }
    imgs = imgs.reverse();
    botaoPlay.src = imgs[0];
});

ipcRenderer.on('curso-trocado', (_event, cursoSelecionado) => {
    if (play) {
        timer.parar(curso.textContent);
    }
    curso.textContent = cursoSelecionado;
    data.pegaDados(cursoSelecionado)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        }).catch((_err) => {
            console.log('Curso ainda não possui registros');
            tempo.textContent = '00:00:00';
        });
});

botaoAdicionar.addEventListener('click', function () {
    if (campoAdicionar.value == '') {
        console.log('Não posso adicionar um curso com o nome vazio');
        return;
    }
    curso.textContent = campoAdicionar.value;
    tempo.textContent = '00:00:00';
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado', curso.textContent);
});

ipcRenderer.on('atalho-iniciar-parar', () => {
    let click = new MouseEvent('click');
    botaoPlay.dispatchEvent(click);
});