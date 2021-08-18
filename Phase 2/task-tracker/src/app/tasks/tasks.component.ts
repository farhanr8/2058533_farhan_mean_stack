import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {task} from './task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Array<task> = new Array();

  constructor() { }

  ngOnInit(): void {
  }

  addTask(idRef:any,nameRef:any,taskRef:any,dateRef:any){
    let id = idRef.value;
    let name = nameRef.value;
    let t = taskRef.value;
    let deadline = dateRef.value;
    let entry = new task(id, name, t, deadline);
    this.tasks.push(entry); 
    console.log(this.tasks);
  }

}
