import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReportService,
  TokenReportForm,
} from '../../../../services/report.service';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../../../services/user.service';
import { ModalWindowService } from '../../../../services/modal-window.service';
import {Badge} from '../../../../database/Models/database.model.badge';
import {Analyte} from '../../../../database/Models/database.model.analyte';
import {Method} from '../../../../database/Models/database.model.method';
import {TokenType} from '../../../../database/Models/database.mode.tokenType';

@Component({
  selector: 'app-token-report',
  templateUrl: './token-report.component.html',
  styleUrls: ['./token-report.component.css'],
})
export class TokenReportComponent implements OnInit {
  @Input() tokenFormData: TokenReportForm;
  @Input() badgeList: Badge[];
  @Input() analyteList: Analyte[];
  @Input() methodList: Method[];
  @Input() tokenTypeList: TokenType[];
  @Output() queuedFile = new EventEmitter<{
    outerIndex: string;
    innerIndex: number;
    queuedFile: FileItem;
  }>();
  @Output() stateChanged = new EventEmitter<string>();
  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    authToken: this.userService.userAuthToken,
    itemAlias: 'file',
  });
  uniqueUploaderName: string;
  uniquePopoutName: string;
  // Filled by the analysis-results.component in this component's template.
  requestedCompounds: string[] = [];

  constructor(
    private reportService: ReportService,
    private userService: UserService,
    private modalService: ModalWindowService
  ) {}

  ngOnInit(): void {
    const badgeNum = this.tokenFormData.badge_serial_number;
    const tubeNum = this.tokenFormData.tube_number;
    this.uniqueUploaderName = badgeNum + '-' + tubeNum + '-uploader';
    this.uniquePopoutName = badgeNum + '-' + tubeNum + +'-popout';
    this.handleUploaderEvents();
  }

  /*
   * Hooking into the file-uploader's events.
   *   - onAfterAddingFile: Called immediately after the file input window is closed.
   *   - onBuildItemForm: Called immediately before the file is uploaded to the backend.
   *   - onErrorItem: Called when an error occurs.
   *   - onCompleteItem: Called immediately after the upload request finishes.
   * */
  handleUploaderEvents(): void {
    this.uploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      const event = {
        outerIndex: this.tokenFormData.badge_serial_number,
        innerIndex: this.tokenFormData.tube_number,
        queuedFile: fileItem,
      };
      this.queuedFile.emit(event);
      this.handleStateUpdate('MODIFIED');
    };

    this.uploader.onBuildItemForm = (fileItem, form) => {
      form.append(
        'badge_serial_number',
        this.tokenFormData.badge_serial_number
      );
      form.append('tube_number', this.tokenFormData.tube_number);
      form.append('raw_comments', this.tokenFormData.raw_comments);
      form.append('uploaded_by', this.userService.getActiveUser().userId);
      form.append('raw_data_id', this.tokenFormData.raw_data_id);
    };

    this.uploader.onErrorItem = () => this.handleStateUpdate('ERROR');

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      let jResponse = null;
      console.log('Response: ' + response);
      console.log('item: ' + item);
      console.log('Headers ' + headers);
      try {
        jResponse = JSON.parse(response);
      }catch (err){
        // Fail silently
        // console.err(err);
      }

      console.log('reached the area');
      console.log('Response: ' + response);
      console.log('Status: ' + status);
      if (status === 200 && jResponse && jResponse.affectedRows > 0) {
        this.tokenFormData.original_filename = item.file.name;
        this.handleStateUpdate('COMPLETED');
      }
      else if (status === 200){
        this.tokenFormData.original_filename = item.file.name;
        this.handleStateUpdate('COMPLETED');
      }
      else if (status === 204) {
        // tslint:disable-next-line:no-console
        console.debug('FILE HAS BEEN QUARANTINED!!!');
        console.log('The File ' + item._file.name + ' did not parse and has been moved to the Quarantined folder');
        this.modalService.setModalContext('The File ' + item._file.name + ' did not parse and has been moved to the Quarantined folder');
        this.tokenFormData.original_filename = item.file.name;
        this.handleStateUpdate('QUARANTINED');
      } else {
        this.handleStateUpdate('ERROR');
      }
    };
  }

  /*
   * Showing the pop-out window with projected content.
   * */
  showAnalyzedValues($event: MouseEvent): void {
    $event.stopPropagation();
    this.modalService.setPopOutContext(this.uniquePopoutName);
  }

  /*
   * The analysis-results.component pumps events into this function.
   * */
  handleStateUpdate($event: string): void {
    switch ($event) {
      case 'DEFAULT':
        if (this.tokenFormData.original_filename !== null) {
          this.tokenFormData.setStateValue('PARTIAL_COMPLETION');
          this.stateChanged.emit('PARTIAL_COMPLETION');
        } else {
          this.tokenFormData.setStateValue($event);
          this.stateChanged.emit($event);
        }
        break;
      case 'MODIFIED':
        this.tokenFormData.setStateValue($event);
        this.stateChanged.emit($event);
        break;
      case 'PARTIAL_COMPLETION':
        this.tokenFormData.setStateValue($event);
        this.stateChanged.emit($event);
        break;
      case 'ERROR':
        // tslint:disable-next-line:no-console
        console.debug('Emitting ERROR');
        this.tokenFormData.setStateValue($event);
        this.stateChanged.emit($event);
        break;
      case 'QUARANTINED':
        this.tokenFormData.setStateValue($event);
        this.stateChanged.emit($event);
        break;
      case 'COMPLETED':
        if (this.tokenFormData.original_filename !== null) {
          this.tokenFormData.setStateValue($event);
          this.stateChanged.emit($event);
        } else {
          this.tokenFormData.setStateValue('PARTIAL_COMPLETION');
          this.stateChanged.emit('PARTIAL_COMPLETION');
        }
        break;
      default:
        // tslint:disable-next-line:no-console
        console.debug('Emitting ERROR');
        this.tokenFormData.setStateValue('ERROR');
        this.stateChanged.emit('ERROR');
    }
  }
}
