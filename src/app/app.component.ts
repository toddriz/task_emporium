import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { TasksService } from './services/tasks.service';
import { Task } from './models/Task';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Task Tracker';

    public user: any;

    public newTaskTitle: string;
    public newTaskPriority = false;
    public newTaskDescription: string;

    public tasks: Task[];

    public loading = true;

    constructor(private afAuth: AngularFireAuth, private tasksService: TasksService) {
        afAuth.authState.subscribe(response => {
            this.loading = false;
            if (response) {
                this.user = response;
                this.getTasks();
            }
        });
    }

    private getTasks() {
        this.tasksService.getTasks(this.user.uid).subscribe(data => {
            this.tasks = data;
        });
    }

    public addTask() {
        const task = new Task();
        task.title = this.newTaskTitle;
        task.priority = this.newTaskPriority;
        task.description = this.newTaskDescription;
        task.userId = this.user.uid;

        this.tasksService.addTask(task);
    }

    public deleteTask(task) {
        this.tasksService.deleteTask(task);
    }

    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(response => {
            this.user = response.user;
            this.getTasks();
        });
    }

    logout() {
        this.afAuth.auth.signOut().then(() => {
            this.tasks = [];
            this.user = null;
        });
    }
}
