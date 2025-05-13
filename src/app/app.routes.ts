import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WorksComponent } from './pages/works/works.component';
import { WorkComponent } from './pages/works/work.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'works', component: WorksComponent },
    { path: 'works/:workName1', component: WorkComponent },
    { path: 'works/:workName1/:workName2', component: WorkComponent },
];
