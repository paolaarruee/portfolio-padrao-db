import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatIconModule, AppRoutingModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
