const faixaEtariaMap = new Map<string, string>([
    ["1", "Menor de 17 anos"],
    ["2", "17 anos"],
    ["3", "18 anos"],
    ["4", "19 anos"],
    ["5", "20 anos"],
    ["6", "21 anos"],
    ["7", "22 anos"],
    ["8", "23 anos"],
    ["9", "24 anos"],
    ["10","25 anos"],
    ["11", "Entre 26 e 30 anos"],
    ["12", "Entre 31 e 35 anos"],
    ["13", "Entre 36 e 40 anos"],
    ["14", "Entre 41 e 45 anos"],
    ["15", "Entre 46 e 50 anos"],
    ["16", "Entre 51 e 55 anos"],
    ["17", "Entre 56 e 60 anos"],
    ["18", "Entre 61 e 65 anos"],
    ["19", "Entre 66 e 70 anos"],
]);

const sexoMap = new Map<string, string>([
    ["M", "Masculino"],
    ["F", "Feminino"],
]);

const situacaoConclusaoMap = new Map<string, string>([
    ["1", "Conluído"],
    ["2", "Estou cursando e concluirei o Ensino Médio em 2021"],
    ["3", "Estou cursando e concluirei o Ensino Médio após 2021"],
    ["4", "Não concluí e não estou cursando o Ensino Médio"],
]);

const tipoEscolaMap = new Map<string, string>([
    ["1", "Não respondeu"],
    ["2", "Pública"],
    ["3", "Privada"],
]);

const localizacaoEscolaMap = new Map<string, string>([
    ["1", "Urbana"],
    ["2", "Rural"],
]);

const corRacaMap = new Map<string, string>([
    ["0", "Não declarado"],
    ["1", "Branca"],
    ["2", "Preta"],
    ["3", "Parda"],
    ["4", "Amarela"],
    ["5", "Indígena "],
    ["6", "Não dispõe da informação"],
]);

module.exports = { faixaEtariaMap };