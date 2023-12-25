// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ScoreComponent } from './score/score.component';
import { ProgressComponent } from './progress/progress.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'Login', component: LoginPageComponent },
  { path: 'SignUp', component: SignUpPageComponent },
  { path: 'questions/:languageId', component: QuestionListComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'scorepage', component: ScoreComponent }, 
  { path: 'progress', component: ProgressComponent },
  { path:'leaderboard',component:LeaderboardComponent},
  { path:'', redirectTo:'/Login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
