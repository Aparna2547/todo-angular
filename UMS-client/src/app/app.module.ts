import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, withFetch, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProfileComponent } from './profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { SeachComponent } from './seach/seach.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import { ServicesService } from './services.service';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
     declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent,
        NavbarComponent,
        ProfileComponent,
        SeachComponent,
        EditModalComponent,
    ],
    bootstrap: [AppComponent],
     imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MessagesModule,
        MatPaginatorModule,
        MatIconModule,
        StoreModule.forRoot(reducers, {
      metaReducers
    })],
    providers: [
        provideClientHydration(),
        provideHttpClient(withFetch()),
        MessageService,
        ServicesService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
