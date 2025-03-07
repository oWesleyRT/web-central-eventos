import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardModule } from '../partials/general/card/card.module';
import { SalesComponent } from './sales/sales.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../_layout/blockui/block-template.component';
import { MatchHeightModule } from '../partials/general/match-height/match-height.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HospitalComponent } from './hospital/hospital.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    MatchHeightModule,
    NgxDatatableModule,
    PerfectScrollbarModule,
    NgbModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'hospital',
        component: HospitalComponent
      }
    ])
  ],
  declarations: [SalesComponent, HospitalComponent],

  exports: [RouterModule]
})
export class DashboardModule { }
