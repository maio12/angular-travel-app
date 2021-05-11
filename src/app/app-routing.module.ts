import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/hotels' },
  {path: 'hotels', loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule)}, //angular router lazy loading. property loadchildren. invece di importare il componente possiamo importare il module intero.
                                                                                                    //path: 'hotels', loadChcildeen: () => import('./hotels/hotels.module')
                                                                                                    //fa lazy loading: quando fa compilazione di questo modulo, crea un bundle di js. abbiamo tutta la app e poi quqesto module in un altro file a parte.
  {path: 'map', component: MapComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
