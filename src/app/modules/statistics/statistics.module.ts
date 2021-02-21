import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { AdminAuthorizationDirective } from '../../directives/admin-authorization.directive';


@NgModule({
  declarations: [
    OverviewComponent,
    AdminAuthorizationDirective
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
