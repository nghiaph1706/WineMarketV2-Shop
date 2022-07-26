import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailsComponent } from './components/details/details.component';
import { FeaturepartComponent } from './components/featurepart/featurepart.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { SendcodeComponent } from './components/sendcode/sendcode.component';
import { SignupComponent } from './components/signup/signup.component';
import { SubcribeComponent } from './components/subcribe/subcribe.component';
import { TrendingComponent } from './components/trending/trending.component';
import { UserComponent } from './components/user/user.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BannerComponent,
    ContactComponent,
    DetailsComponent,
    FeaturepartComponent,
    ForgotComponent,
    HeaderComponent,
    LoginComponent,
    ProductlistComponent,
    SendcodeComponent,
    SignupComponent,
    SubcribeComponent,
    TrendingComponent,
    UserComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
