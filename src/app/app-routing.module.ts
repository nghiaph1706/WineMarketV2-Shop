import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailsComponent } from './components/details/details.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { SendcodeComponent } from './components/sendcode/sendcode.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { AppGuard } from './guard/app.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'index', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {
    path: 'product/:page', 
    component: ProductComponent,
    children: [
      {path: 'category/:category_Id', component: ProductComponent},
      {path: 'brand/:brand_Id', component: ProductComponent}
    ]
  },
  {path: 'contact', component: ContactComponent},
  {path: 'user', component: UserComponent, canActivate: [AppGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  {path: 'sendcode', component: SendcodeComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AppGuard]},
  {path: 'cartDetails', component: CartComponent, canActivate: [AppGuard]},
  {path: 'forgot', component: ForgotComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
