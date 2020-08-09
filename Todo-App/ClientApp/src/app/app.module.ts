import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ActiveComponent } from './components/active/active.component';
import { CompletedComponent } from './components/completed/completed.component';
import { NavComponent } from './components/nav/nav.component';
import { ActiveTasksService } from './services/active-tasks.service';
import { CompletedTasksService } from './services/completed-tasks.service';
import { AllTasksService } from './services/all-tasks.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActiveComponent,
    CompletedComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ActiveTasksService,
    CompletedTasksService,
    AllTasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
