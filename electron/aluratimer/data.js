const jsonFile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    savaDados(curso, tempoEstudado) {
        let arquivoDoCurso = `${__dirname}/data/${curso}.json`;
        if(fs.existsSync(arquivoDoCurso)) {
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
        } else {
            this.criaArquivoDeCurso(arquivoDoCurso, {})
                .then(() => {
                    this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
                });
        }
    },
    adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado) {
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }
        jsonFile.writeFile(arquivoDoCurso, dados, {spaces: 2})
            .then(() => {
                console.log('Tempo salvo com sucesso')
            }).catch((err) => {
                console.log(err);
            });
    },
    criaArquivoDeCurso(nome, conteudo) {
        return jsonFile.writeFile(nome, conteudo)
            .then(() => {
                console.log('Arquivo Criado');
            }).catch((err) => {
                console.log(err);
            });
    },
    pegaDados(curso) {
        let arquivoDoCurso = `${__dirname}/data/${curso}.json`;
        return jsonFile.readFile(arquivoDoCurso);
    },
    pegaNomeDosCursos() {
        return fs.readdirSync(`${__dirname}/data/`).map((arquivo) => {
            return arquivo.substring(0, arquivo.lastIndexOf('.'))
        });
    }
}