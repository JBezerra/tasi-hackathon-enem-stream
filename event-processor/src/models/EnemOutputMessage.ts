import EnemInputMessage from "./EnemInputMessage";
import { faixaEtariaMap, tipoEscolaMap, situacaoConclusaoMap, questionMapper, q006Map, q008Map, q019Map, q022Map, q024Map, q025Map, corRacaMap } from "./MapperFunctions";
import Question from "./Question";

export default class EnemOutputMessage {
    
    constructor(input: EnemInputMessage){
        this.faixaEtaria = faixaEtariaMap.get(input.TP_FAIXA_ETARIA);
        this.sexo = faixaEtariaMap.get(input.TP_SEXO);
        this.localizacaoEscola = faixaEtariaMap.get(input.TP_LOCALIZACAO_ESC);
        this.tipoEscola = tipoEscolaMap.get(input.TP_ESCOLA);
        this.situacaoConclusao = situacaoConclusaoMap.get(input.TP_ST_CONCLUSAO);
        this.corRaca = corRacaMap.get(input.TP_COR_RACA);
        this.ufEscola = input.SG_UF_ESC;     

        this.questionario = [
            { 
                id: "Q005",
                question: questionMapper.get("Q005"),
                answer: input.Q005
            },
            { 
                id: "Q006",
                question: questionMapper.get("Q006"),
                answer: q006Map.get(input.Q006)
            },
            { 
                id: "Q008",
                question: questionMapper.get("Q008"),
                answer: q008Map.get(input.Q008)
            },
            { 
                id: "Q019",
                question: questionMapper.get("Q019"),
                answer: q019Map.get(input.Q019)
            },
            { 
                id: "Q022",
                question: questionMapper.get("Q022"),
                answer: q022Map.get(input.Q022)
            },
            { 
                id: "Q024",
                question: questionMapper.get("Q024"),
                answer: q024Map.get(input.Q024)
            },
            { 
                id: "Q025",
                question: questionMapper.get("Q025"),
                answer: q025Map.get(input.Q025)
            }
        ];
    }

    faixaEtaria: string | undefined;
    sexo: string | undefined;
    localizacaoEscola: string | undefined;
    tipoEscola: string | undefined;
    situacaoConclusao: string | undefined;
    ufEscola: string | undefined;
    questionario: Question[];
    corRaca: string | undefined;
}