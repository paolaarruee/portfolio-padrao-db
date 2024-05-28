import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SobreComponent } from './sobre/sobre.component';
import { ProjetosComponent } from './projetos/projetos.component';

@NgModule({
  declarations: [SobreComponent, ProjetosComponent],
  imports: [CommonModule],
  exports: [SobreComponent, ProjetosComponent],
})
export class ComponentsModule {}
