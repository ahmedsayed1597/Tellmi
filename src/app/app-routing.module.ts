import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FavouriteMessageComponent } from './favourite-message/favourite-message.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PathguardGuard } from './pathguard.guard';
import { SendMessageComponent } from './send-message/send-message.component';
import { SettingComponent } from './setting/setting.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'signup', pathMatch:'full'},
  {path:'sendMessage/:id', component:SendMessageComponent},
  {path:'home', component: HomeComponent, canActivate:[PathguardGuard]},
  {path:'favourite', component: FavouriteMessageComponent, canActivate:[PathguardGuard]},
  {path:'signup', component: SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'setting', component: SettingComponent, canActivate:[PathguardGuard]},
  {path:'aboutus', component:AboutusComponent, },
  {path: '**', component: NotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
