import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
