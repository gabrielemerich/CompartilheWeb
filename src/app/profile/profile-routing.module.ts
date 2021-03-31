import { Routes} from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';


export const routes: Routes = [

{ 
  path:'', component: ProfileComponent
},
{ 
  path:':id', component: ProfileComponent
}
  
  
];

