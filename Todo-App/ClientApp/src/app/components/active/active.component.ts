import { Component, OnInit } from '@angular/core';
import { ActiveTasksService } from '../../services/active-tasks.service';
import { Items } from '../../models/items';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  public todoItem: string;
  public activeTasks: Items[] = [];
  private item: Items;

  constructor(
    private activeTaskService: ActiveTasksService
  ) { }

  ngOnInit() {
    this.getActiveTasks();
  }

  getActiveTasks() {
    this.activeTaskService.getActiveTasks().subscribe(
      tasks => {
        this.activeTasks = tasks;
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
      this.activeTaskService.createNewTask(this.item).subscribe(
        task => {
          this.activeTasks.push(task);
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
      id: this.activeTasks[i].id,
      name: this.activeTasks[i].name,
      isComplete: true
    };
    this.activeTaskService.completeTask(this.item).subscribe(
      () => {
        this.getActiveTasks();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
