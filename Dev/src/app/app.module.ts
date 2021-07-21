import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GovernmentWarningComponent } from './login/government-warning/government-warning.component';
import { HipaaWarningComponent } from './login/hipaa-warning/hipaa-warning.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponentSelectorDirective } from './user-component-selector.directive';
import { DefaultComponent } from './component_providers/default.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { HistogramComponent } from './histogram/histogram.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingRoutingModule } from './app-routing/app-routing-routing.module';
import { UserManagementComponent } from './component_providers/shared/user-management/user-management.component';
import { SiteManagementComponent } from './component_providers/shared/site-management/site-management.component';
import { AccountManagementComponent } from './component_providers/shared/account-management/account-management.component';
import { SignOutComponent } from './component_providers/shared/sign-out/sign-out.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadReportComponent } from './component_providers/shared/upload-report/upload-report.component';
import { AlphaNumericDirective } from './component_providers/shared/alpha-numeric.directive';
import { TokenReportComponent } from './component_providers/shared/upload-report/token-report/token-report.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BadgeAddComponent } from './component_providers/shared/badge-add/badge-add.component';
import { BadgeIssueComponent } from './component_providers/shared/badge-issue/badge-issue.component';
import { BadgeTurnInComponent } from './component_providers/shared/badge-turn-in/badge-turn-in.component';
import { NumericDirective } from './component_providers/shared/numeric.directive';
import { NgIdleModule } from '@ng-idle/core';
import { FileListComponent } from './component_providers/shared/file-list/file-list.component';
import { CustomDataComponent } from './component_providers/shared/custom-data/custom-data.component';
import { MaintenanceComponent } from './component_providers/shared/maintenance/maintenance.component';
import { UnlockAccountComponent } from './component_providers/shared/unlock-account/unlock-account.component';
import { UserRoleConverterPipe } from './shared/userRoleConverter.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HistogramGroupComponent } from './histogram/group/histogram-group.component';
import { HistogramBarComponent } from './histogram/bar/histogram-bar.component';
import { EditUserComponent } from './component_providers/shared/edit-user/edit-user.component';
import { CreateUserComponent } from './component_providers/shared/create-user/create-user.component';
import { LayoutWrapperComponent } from './shared/layout-wrapper/layout-wrapper.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { AnalyteExposureComponent } from './component_providers/shared/analyte-exposure/analyte-exposure.component';
import { ModalWindowComponent } from './component_providers/shared/modal-window/modal-window.component';
import { ModalWindowService } from './services/modal-window.service';
import { ParetoComponent } from './pareto/pareto.component';
import { ParetoLineComponent } from './pareto/pareto-line/pareto-line.component';
import { LocationConverterPipe } from './shared/locationConverter.pipe';
import { AnalyzedDataComponent } from './component_providers/shared/analyzed-data/analyzed-data.component';
import { AnalyzedDataSelectionComponent } from './component_providers/shared/analyzed-data/analyzed-data-selection/analyzed-data-selection.component';
import { httpInterceptorProviders } from './_helpers/interceptor-providers';
import { GraphSelectionComponent } from './component_providers/graph-selection.component/graph-selection.component';
import { BadgeEditComponent } from './component_providers/shared/badge-edit/badge-edit.component';
import { WearerHomeScreenComponent } from './component_providers/shared/home-screen/wearer-home-screen/wearer-home-screen.component';
import { CollapseDirective } from './component_providers/shared/collapse.directive';
import { CommonModule } from '@angular/common';
import { CssToggleDirective } from './component_providers/shared/css-toggle.directive';
import { PopOutWindowComponent } from './component_providers/shared/pop-out-window/pop-out-window.component';
import { BadgeAddBulkComponent } from './component_providers/shared/badge-add/badge-add-bulk/badge-add-bulk.component';
import { AnalysisResultsComponent } from './component_providers/shared/upload-report/token-report/analysis-results/analysis-results.component';
import { DoehrsUploadComponent } from './component_providers/shared/doehrs/doehrs-upload/doehrs-upload.component';
import { TokenValuesComponent } from './component_providers/shared/badge-add/token-values/token-values.component';
import { BadgeRemoveComponent } from './component_providers/shared/badge-remove/badge-remove.component';
import { MouseHoverDirective } from './component_providers/shared/mouse-hover.directive';
import { AuditorHomeScreenComponent } from './component_providers/shared/home-screen/auditor-home-screen/auditor-home-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GridComponent,
    HistogramComponent,
    GovernmentWarningComponent,
    HipaaWarningComponent,
    UserComponentSelectorDirective,
    DefaultComponent,
    PageNotFoundComponent,
    UserManagementComponent,
    SiteManagementComponent,
    AccountManagementComponent,
    SignOutComponent,
    BadgeAddComponent,
    BadgeIssueComponent,
    BadgeTurnInComponent,
    UploadReportComponent,
    AlphaNumericDirective,
    NumericDirective,
    TokenReportComponent,
    FileListComponent,
    CustomDataComponent,
    MaintenanceComponent,
    UnlockAccountComponent,
    UserRoleConverterPipe,
    LocationConverterPipe,
    HistogramGroupComponent,
    HistogramBarComponent,
    EditUserComponent,
    CreateUserComponent,
    LayoutWrapperComponent,
    AnalyteExposureComponent,
    ModalWindowComponent,
    ParetoComponent,
    ParetoLineComponent,
    AnalyzedDataComponent,
    AnalyzedDataSelectionComponent,
    GraphSelectionComponent,
    BadgeEditComponent,
    WearerHomeScreenComponent,
    CollapseDirective,
    CssToggleDirective,
    PopOutWindowComponent,
    BadgeAddBulkComponent,
    AnalysisResultsComponent,
    DoehrsUploadComponent,
    TokenValuesComponent,
    BadgeRemoveComponent,
    MouseHoverDirective,
    AuditorHomeScreenComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingRoutingModule,
    AgGridModule.withComponents(null),
    NgIdleModule.forRoot(),
    FileUploadModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    LoginService,
    UserService,
    ModalWindowService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
