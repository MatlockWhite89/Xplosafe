import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GridService } from '../../../services/agGrid.service';
import { DataTableResponseData } from '../../../database/Models/database.model.data';
import { FileDownloadService } from '../../../services/file-download.service';
import { Subscription } from 'rxjs';
import { ModalWindowService } from '../../../services/modal-window.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit, OnDestroy {
  rowSelectionSub: Subscription;
  subscriptions: Subscription;
  previewAnalyzed: boolean;
  constructor(
    private http: HttpClient,
    private gridService: GridService,
    private downloadService: FileDownloadService,
    private modalService: ModalWindowService,
  ) {
    this.rowSelectionSub = new Subscription();
    this.subscriptions = new Subscription();
    this.gridService.setGridType(3);
    this.previewAnalyzed = false;
    this.rowSelectionSub.add(
      this.gridService.rowSelected.subscribe((value) => {
        if (value) {
          this.showSelectedFile();
        } else {
          this.fileInformation.reset();
          this.resetSubscriptions();
        }
      })
    );
  }
  fileInformation = new FormGroup({
    rawFileName: new FormControl(),
    analyzedFileName: new FormControl(),
    badgeSerialNumber: new FormControl(),
  });

  // Form Values
  files: string;
  showFormValue = false;
  /*
   * The following static function dynamically creates an HTMLAnchorElement,
   * then attaches it to the DOM, and finally simulates a mouse click on it.
   */
  private downLoadFile(data: any, attribute: Attr): void {
    const dataType = data.type;
    const binaryData = [];
    binaryData.push(data);
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(
      new Blob(binaryData, { type: dataType })
    );
    downloadLink.setAttribute(attribute.name, attribute.value);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  /*
   * The following function requests the downloadService to prepare a file
   * for download.
   * FileDownloadService.downloadFile(...) returns an Observable of a backend
   * call that will copy the file from the "./public/uploads" directory to the
   * "./public/download" directory within the backend's file structure.
   * Upon completion of this operation, the copied file's name is passed back
   * in JSON which is then passed to FileListComponent.downLoadFile(...).
   */
  private requestDownloadFromService(filename: string, originalFileName: string, attribute: Attr): void {
      this.downloadService.downloadFile(filename, originalFileName).subscribe(
      (resData) => {
        const fn = originalFileName;
        console.log(resData);
        attribute.value = fn;
        this.downLoadFile(resData, attribute);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.modalService.setModalContext('Was not able to retrieve file from server.');
      },
      () => {}
    );
  }

  /*
   * Private getter for the rawFileName FormControl within the fileInformation FormGroup.
   */
  private get rawFileName(): FormControl {
    return this.fileInformation.get('rawFileName') as FormControl;
  }

  /*
   * Private getter for the analyzedFileName FormControl within the fileInformation FormGroup.
   */
  private get analyzedFileName(): FormControl {
    return this.fileInformation.get('analyzedFileName') as FormControl;
  }

  /*
   * Getter for the badgeSerialNumber FormControl within the fileInformation FormGroup.
   */
  get badgeSerialNumber(): FormControl {
    return this.fileInformation.get('badgeSerialNumber') as FormControl;
  }

  // Determines if the form should display.
  showForm(): boolean {
    this.showFormValue = true;
    return this.showFormValue;
  }

  // Shows the file selected based on the grid selection.
  showSelectedFile(): void {
    const data = this.gridService.getSelectedRow() as DataTableResponseData;
    console.log(data);
    this.rawFileName.setValue(data.original_filename);
    this.badgeSerialNumber.setValue(data.badge_serial_number);
  }

  // Reset the displays based on button press.
  cancelButtonPressed(): void {
    this.fileInformation.reset();
    this.resetSubscriptions();
  }

  // Download the raw file.
  submitButtonPressed(): void {
    const file = this.gridService.getSelectedRow();
    if (file && (this.rawFileName.value && this.rawFileName.value !== '')) {
      this.openFiles();
    } else {
      this.modalService.setModalContext(
        'No File was selected, please make a selection from grid and try again.'
      );
    }
  }

  // Download the Raw File from the server.
  openFiles(): void {
    const attribute = document.createAttribute('download');
    const selectedFile = this.gridService.getSelectedRow() as DataTableResponseData;
    if (selectedFile) {
      let desiredName = selectedFile.original_filename;
      console.log(selectedFile);
      if (!desiredName){
        desiredName = selectedFile.raw_data;
      }

      if (selectedFile.raw_data && selectedFile.raw_data !== '') {
        attribute.value = undefined;
        this.requestDownloadFromService(selectedFile.raw_data, desiredName, attribute);
      }
    }
    else {
      this.modalService.setModalContext('Please select a badge from the grid.');
    }
  }

  // Initialization.
  ngOnInit(): void {}

  // Preview the Raw Data File.
  previewRawPressed(): void {
    if (this.rawFileName.value && this.rawFileName.value !== '') {
      const attribute = document.createAttribute('target');
      attribute.value = '_blank';
      const selectedFile = this.gridService.getSelectedRow() as DataTableResponseData;
      if (selectedFile) {
        let desiredName = selectedFile.original_filename;
        if (!desiredName) {
          desiredName = selectedFile.raw_data;
        }

        this.requestDownloadFromService(selectedFile.raw_data, desiredName, attribute);
      }
      else {
        this.modalService.setModalContext('Please select a badge from the grid.');
      }
    }
  }

  // Unsubscribe from current temporary Subscriptions.
  resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  // Reset all subscriptions.
  ngOnDestroy(): void {
    this.resetSubscriptions();
    this.rowSelectionSub.unsubscribe();
  }
}
