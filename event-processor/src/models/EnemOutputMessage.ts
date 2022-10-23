import EnemInputMessage from "./EnemInputMessage";

export default class EnemOutputMessage {
    
    constructor(input: EnemInputMessage){
        this.faixaEtaria = faixaEtariaMap.get(input.TP_FAIXA_ETARIA) ?? 'N/A';
        this.sexo = faixaEtariaMap.get(input.TP_SEXO) ?? 'N/A';
    }

    faixaEtaria: string;
    sexo: string;
}