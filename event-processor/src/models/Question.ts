export default class Question {

    constructor(id: string, question: string, answer: string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }

    id: string | undefined;
    question: string | undefined;
    answer: string | undefined;

}