import { Component, OnInit } from '@angular/core';
import { GraderService } from '../grader.service';
import { TestModel } from '../test.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  questions: TestModel[] = [];
  answers = new Array(10);
  correct = 0;
  msg = "";

  constructor(public grader:GraderService) { }

  ngOnInit(): void {
    this.grader.checkTestInfo().subscribe(
      (response: TestModel[]) => { this.questions = response; },
      (error: any) => console.log(error)
    );
  }

  userAnswer(event: any): void {
    console.log(event);
    let ans = event.value;
    let questionNumber = event.source._elementRef.nativeElement.parentElement.id;
    this.answers[questionNumber - 1] = ans;
  }

  checkAnswers(): void {

    let count = 0;
    for (let i = 0; i < 10; i++) {
      let expected = this.questions[i].solution;
      let answered = this.answers[i];
      if (expected === answered) {
        count++;
        this.changeColor(i + 1, expected, 'correct');
      } else {
        this.changeColor(i + 1, expected, 'correct');
        if (answered !== undefined && answered !== expected) {
          this.changeColor(i + 1, answered, 'wrong');
        }
      }
    }
    this.correct = count;
    if(count > 6){
      this.msg = "PASSED :)";
    }
    else{
      this.msg = "Failed :(";
    }
    (document.getElementById('results') as HTMLElement).style.display = "block";
  }

  changeColor(questionNum: number, ansChoice: string, type: string): void {
    let questionHTML = document.getElementById(`${questionNum}`) as HTMLElement;
    let options = questionHTML.getElementsByTagName('mat-radio-button');
    switch(ansChoice){
      case "a":
        options[0].classList.add(type);
        break;
      case "b":
        options[1].classList.add(type);
        break;
      case "c":
        options[2].classList.add(type);
        break; 
      case "d":
        options[3].classList.add(type);
        break;
    }
  }

  reloadPage() {
    window.location.reload();
  }

}
