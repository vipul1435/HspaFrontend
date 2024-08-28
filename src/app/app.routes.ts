import { Routes } from '@angular/router';
import { BuyPageComponent } from './pages/buy-page/buy-page.component';
import { SellPageComponent } from './pages/sell-page/sell-page.component';
import { ListPropertyPageComponent } from './pages/list-property-page/list-property-page.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';

export const routes: Routes = [
    {
        path: '',
        component: BuyPageComponent,
        title: 'Buy property',
    },
    {
        path: 'sell',
        component: SellPageComponent,
        title: 'Sell property'
    },
    {
        path:'list-property',
        component: ListPropertyPageComponent,
        title:'List property'
    },
    {
        path: 'property-detail/:id',
        component: PropertyDetailComponent,
        title:'Details'
    },
    {
        path: 'register-user',
        component: RegisterUserComponent,
        title:"Register"
    },
    {
        path:'login-user',
        component: LoginUserComponent,
        title:"Login"
    },
    {
        path:'**',
        component: Error404Component,
        title:'Ah! Page not fount'
    },
];
