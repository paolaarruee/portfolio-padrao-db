import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobreComponent } from './components/sobre/sobre.component';
import { ProjetosComponent } from './components/projetos/projetos.component';

const routes: Routes = [
  { path: '', component: SobreComponent },
  { path: 'projetos', component: ProjetosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
