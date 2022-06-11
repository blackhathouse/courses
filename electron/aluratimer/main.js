const { app, BrowserWindow, ipcMain, Tray, Menu } = require ('electron');
const data = require('./data');
const template = require('./template');

let tray = null;
let mainWindow = null;
app.on('ready', () => {
    console.log('Init Application');
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        width: 600,
        height: 400
    });

    tray = new Tray(`${__dirname}/app/img/icon.png`);
    let trayMenu = Menu.buildFromTemplate(template.geraTrayTemplate(mainWindow));
    tray.setContextMenu(trayMenu);

    Menu.setApplicationMenu(Menu.buildFromTemplate(template.geraMenuPrincipalTemplate(app)));

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {
    if(sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
            },
            width: 300,
            height: 220,
            alwaysOnTop: true,
            frame: false
        });
    
        sobreWindow.on('closed', () => {
            sobreWindow = null;
        })
    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('curso-parado', (_event, curso, tempoEstudado) => {
    data.savaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (_event, curso) => {
    let trayMenu = Menu.buildFromTemplate(template.adicionaCursoNoTray(curso, mainWindow));
    tray.setContextMenu(trayMenu);
});