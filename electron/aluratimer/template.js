const data = require('./data');
const { ipcMain } = require ('electron');

module.exports = {
    template: null,

    geraTrayTemplate(window) {
        this.template = [
            {
                label: 'Cursos'
            },        
            {
                type: 'separator'
            }
        ];
        let cursos = data.pegaNomeDosCursos();
        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    window.send('curso-trocado', curso);
                }
            }
            this.template.push(menuItem);
        });
        return this.template;
    },
    adicionaCursoNoTray(curso, window) {
        this.template.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                window.send('curso-trocado', curso);
            }
        });
        return this.template;
    },
    geraMenuPrincipalTemplate(app) {
        let templateMenu = [{
            label: 'View',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    role: 'minimize',
                    accelerator: 'Alt+M'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            label: 'Sobre',
            submenu: [
                {
                    label: 'Sobre o Alura Timer',
                    click: () => {
                        ipcMain.emit('abrir-janela-sobre');
                    },
                    accelerator: 'CommandOrControl+I'
                }
            ]
        }];
    
        if(process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                submenu: []
            })
        }
        return templateMenu;
    }
}