import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/Task';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class TasksService {
    private tasks: Task[];

    constructor(private fire: AngularFirestore) {}

    getTasks(userId: string): Observable<any[]> {
        return this.fire
            .collection('tasks', ref => ref.where('userId', '==', userId))
            .valueChanges();
    }

    addTask(task: Task): void {
        const newId = this.fire.createId();
        this.fire
            .collection('tasks').doc(newId)
            .set({
                id: newId,
                title: task.title,
                priority: task.priority,
                description: task.description,
                userId: task.userId
            });
    }

    deleteTask(task: Task): void {
        this.fire.collection('tasks').doc(task.id).delete();
    }
}
