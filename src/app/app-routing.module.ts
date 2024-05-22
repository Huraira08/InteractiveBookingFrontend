import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsPageComponent } from './pages/bookings-page/bookings-page.component';

const routes: Routes = [
  {path: '', redirectTo:'/bookings', pathMatch: "full"},
  {path: 'bookings', component: BookingsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
