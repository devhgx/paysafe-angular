import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from './core/interceptor/http.interceptor';
import { NotfoundComponent } from './modules/error/notfound.component';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
