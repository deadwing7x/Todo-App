import { Component, OnInit } from '@angular/core';
import { CompletedTasksService } from '../../services/completed-tasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Items } from 'src/app/models/items';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  public completedTasks: any[] = [];
  private item: Items;

  constructor(
    private completedTaskService: CompletedTasksService
  ) { }

  ngOnInit() {
    this.getCompletedTasks();
  }

  getCompletedTasks() {
    this.completedTaskService.getCompletedTasks().subscribe(
      tasks => {
        this.completedTasks = tasks;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  deleteTask(i) {
    this.item = {
      id: this.completedTasks[i].id,
      name: this.completedTasks[i].name,
      isComplete: this.completedTasks[i].completed
    };

    this.completedTaskService.deleteTask(this.item).subscribe(
      data => {
        alert('The completed task has been deleted succcessfully!!');
        this.getCompletedTasks();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  deleteAllTasks() {
    this.completedTaskService.deleteAll(this.completedTasks).subscribe(
      data => {
        alert('Deleted all completed tasks!!');
        this.getCompletedTasks();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
