import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanban-board';
  nameList: string;
  limitJob: number | boolean;
  lists: Array <any> = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  addList () {
    this.nameList && this.lists.push({
      name: this.nameList,
      limit: this.limitJob,
      jobs: []
    });
  }

  deleteList (idx) {
    this.lists.splice(idx, 1);
  }

  addItem (listIdx) {
    const list = this.lists[listIdx];
    list.nameJobs &&
    (list.jobs.length < list.limit || list.limit === undefined) &&
    list.jobs.push(list.nameJobs);
  }

  deleteItem (listIdx, jobIdx) {
    this.lists[listIdx].jobs.splice(jobIdx, 1);
  }

  cdkDropListConnectedTo (idx) {
    return this.lists.reduce(
      (s, e, i) => {
        if (i != idx) {
          s.push("list_" + i + "");
        }
        return s;
      },
      []
    );
  }
}
