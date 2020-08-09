import { Component, OnInit } from '@angular/core';
import { Items } from 'src/app/models/items';
import { AllTasksService } from '../../services/all-tasks.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public todoItem: string;
  public allTasks: Items[] = [];
  private item: Items;

  constructor(
    private allTasksService: AllTasksService
  ) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.allTasksService.getAllTasks().subscribe(
      tasks => {
        this.allTasks = tasks;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  setTodoItem() {
    this.item = {
      id: '',
      name: this.todoItem,
      isComplete: false
    };
    if (this.todoItem === '' || this.todoItem === undefined) {
      alert('Cannot add empty task!!');
    } else {
      this.allTasksService.createNewTask(this.item).subscribe(
        task => {
          this.allTasks.push(task);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    }
    this.todoItem = '';
  }

  onTaskComplete(i) {
    this.item = {
      id: this.allTasks[i].id,
      name: this.allTasks[i].name,
      isComplete: true
    };
    this.allTasksService.completeTask(this.item).subscribe(
      () => {
        this.getAllTasks();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  resumeTask(i) {
    this.item = {
      id: this.allTasks[i].id,
      name: this.allTasks[i].name,
      isComplete: false
    };
    this.allTasksService.completeTask(this.item).subscribe(
      () => {
        this.getAllTasks();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
