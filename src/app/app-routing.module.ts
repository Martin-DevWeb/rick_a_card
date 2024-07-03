import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageCardsComponent } from './pages/page-cards/page-cards.component';

const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'cards', component: PageCardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
