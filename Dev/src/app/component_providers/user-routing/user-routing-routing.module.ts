import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from '../shared/user-management/user-management.component';
import { SiteManagementComponent } from '../shared/site-management/site-management.component';
import { AccountManagementComponent } from '../shared/account-management/account-management.component';
import { SignOutComponent } from '../shared/sign-out/sign-out.component';
import { DefaultComponent } from '../default.component';
import { UploadReportComponent } from '../shared/upload-report/upload-report.component';
import { MaintenanceComponent } from '../shared/maintenance/maintenance.component';
import { FileListComponent } from '../shared/file-list/file-list.component';
import { BadgeAddComponent } from '../shared/badge-add/badge-add.component';
import { BadgeIssueComponent } from '../shared/badge-issue/badge-issue.component';
import { BadgeTurnInComponent } from '../shared/badge-turn-in/badge-turn-in.component';
import { EditUserComponent } from '../shared/edit-user/edit-user.component';
import { LayoutWrapperComponent } from '../../shared/layout-wrapper/layout-wrapper.component';
import { AuthGuard } from '../../_helpers/auth.guard';
import { BadgeEditComponent } from '../shared/badge-edit/badge-edit.component';
import { DoehrsUploadComponent } from '../shared/doehrs/doehrs-upload/doehrs-upload.component';
import {BadgeRemoveComponent} from '../shared/badge-remove/badge-remove.component';
import {AuditorHomeScreenComponent} from '../shared/home-screen/auditor-home-screen/auditor-home-screen.component';
import {CustomDataComponent} from '../shared/custom-data/custom-data.component';
import {BadgeAddBulkComponent} from '../shared/badge-add/badge-add-bulk/badge-add-bulk.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: DefaultComponent },
      {
        path: 'manage/account',
        component: AccountManagementComponent,
      },
      {
        path: 'manage/users',
        component: UserManagementComponent,
        children: [
          {
            path: 'editUser/:id',
            component: EditUserComponent,
          },
        ],
      },
      {
        path: 'manage/sites',
        component: SiteManagementComponent,
      },
      {
        path: 'extract/doehrs',
        component: DoehrsUploadComponent,
      },
      {
        path: 'manage/badges/add',
        component: BadgeAddComponent,
      },
      {
        path: 'manage/badges/remove',
        component: BadgeRemoveComponent,
      },
      {
        path: 'manage/badges/edit',
        component: BadgeEditComponent,
      },
      {
        path: 'manage/badges/issue',
        component: BadgeIssueComponent,
      },
      {
        path: 'manage/badges/turnIn',
        component: BadgeTurnInComponent,
      },
      {
        path: 'upload/report',
        component: UploadReportComponent,
      },
      {
        path: 'search/report',
        component: FileListComponent,
      },
      {
        path: 'manage/maintenance',
        component: MaintenanceComponent,
      },
      {
        path: 'signOut',
        component: SignOutComponent,
      },
      {
        path: 'view/customData',
        component: CustomDataComponent,
      },
      {
        path: 'manage/badgeAddBulk',
        component: BadgeAddBulkComponent,
      },
      {
        path: 'extract/audits',
        component: AuditorHomeScreenComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LayoutWrapperComponent],
})
export class UserRoutingRoutingModule {}
