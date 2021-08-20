class Option {
    constructor(public op: string, public ans: string) {}
}
  
export class TestModel {
constructor(public num: number,
            public question: string,
            public answers: Option[],
            public solution: string) { }
}
  