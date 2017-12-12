import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule
} from '@angular/material';

import { TasksService } from './services/tasks.service';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        MatButtonModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatInputModule
    ],
    providers: [TasksService],
    bootstrap: [AppComponent]
})
export class AppModule {}
