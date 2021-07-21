import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BadgeReportForm,
  ReportService,
  TokenReportForm,
} from '../../../services/report.service';
import { ModalWindowService } from '../../../services/modal-window.service';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { merge } from 'rxjs';
import { Badge } from '../../../database/Models/database.model.badge';
import { BadgeService } from '../../../services/badge.service';
import { Analyte } from '../../../database/Models/database.model.analyte';
import { Method } from '../../../database/Models/database.model.method';
import { TokenType } from '../../../database/Models/database.mode.tokenType';
export interface ILwiFileItem extends FileItem {
  isQuarantined: boolean;
}

@Component({
  selector: 'app-upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.css'],
})
export class UploadReportComponent implements OnInit {
  badgeForms = Array<BadgeReportForm>();
  private queuedFiles = new Map<
    { outerIndex: string; innerIndex: number },
    ILwiFileItem
  >();
  fileUploader = new FileUploader({});
  badgeList: Badge[];
  analyteList: Analyte[];
  methodList: Method[];
  tokenTypeList: TokenType[];
  formLoaded: boolean;
  constructor(
    private httpClient: HttpClient,
    private reportService: ReportService,
    private modalService: ModalWindowService,
    private badgeService: BadgeService
  ) {
    this.badgeList = [];
    this.analyteList = [];
    this.methodList = [];
    this.tokenTypeList = [];
    this.formLoaded = false;
  }

  /*
   * Gets the Key/Value pairs of the queued files Map data structure.
   * */
  get queue(): [{ outerIndex: string; innerIndex: number }, ILwiFileItem][] {
    return [...this.queuedFiles.entries()];
  }

  /*
   * Calculates the progress of all the files being uploaded.
   * */
  get queueProgress(): number {
    let progress = 0;
    for (const value of this.queuedFiles.values()) {
      progress += value.progress;
    }
    return progress / this.queuedFiles.size;
  }

  /*
   * Subscribes to the observables returned from the report service and returns results as if they came from the same observable.
   * When the response from the backend come in, create new badge forms with creating new token forms displaying them all in a nested
   * relationship.
   * */
  ngOnInit(): void {
    const completedBadges = this.reportService.getBadgesWithStatus(4);
    const damagedBadges = this.reportService.getBadgesWithStatus(6);
    const analyzedBadges = this.reportService.getBadgesWithStatus(8);
    const mergedResults = merge(completedBadges, damagedBadges, analyzedBadges);
    mergedResults.subscribe(
      (values) => {
        for (const valuesKey in values) {
          const tokenForm = new TokenReportForm();
          const tokenFormData = values[valuesKey];
          tokenForm.badge_serial_number = tokenFormData.badge_serial_number;
          tokenForm.tube_number = tokenFormData.tube_number;
          tokenForm.raw_data = tokenFormData.raw_data;
          tokenForm.comments = tokenFormData.comments;
          tokenForm.original_filename = tokenFormData.original_filename;
          tokenForm.raw_data_id = tokenFormData.raw_data_id;
          tokenForm.raw_comments = tokenFormData.raw_comments;
          tokenForm.date_last_updated = tokenFormData.date_last_updated;
          tokenForm.data_table_id = tokenFormData.data_table_id;
          tokenForm.token_state = tokenFormData.token_state;
          const badgeGroup = this.badgeForms.find(
            (x) => x.name === tokenForm.badge_serial_number
          );
          if (!badgeGroup) {
            const newBadgeForm = new BadgeReportForm();
            newBadgeForm.name = tokenForm.badge_serial_number;
            newBadgeForm.addToTokenReports(tokenForm);
            newBadgeForm.damaged = tokenFormData.badge_status === 6;
            newBadgeForm.damagedComments = tokenForm.raw_comments;
            if (newBadgeForm.damaged) {
              newBadgeForm.setStateValue('DAMAGED');
            }
            this.badgeForms.push(newBadgeForm);
          } else {
            badgeGroup.addToTokenReports(tokenForm);
          }
        }
      },
      (error) => {
        console.error('Error getting completed badges.', error);
      }
    );
    this.badgeService.getAllBadges().subscribe(
      (value) => {
        this.badgeList = value;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.determineFormLoaded();
      }
    );

    this.reportService.getAnalytes().subscribe(
      (value) => {
        this.analyteList = value;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.determineFormLoaded();
      }
    );

    this.reportService.getMethods().subscribe(
      (value) => {
        this.methodList = value;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.determineFormLoaded();
      }
    );

    this.reportService.getTokenTypes().subscribe(
      (value) => {
        this.tokenTypeList = value;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.determineFormLoaded();
      }
    );
  }

  determineFormLoaded(): void {
    this.formLoaded =
      this.tokenTypeList !== [] &&
      this.methodList !== [] &&
      this.analyteList !== [] &&
      this.badgeList !== [];
  }
  /*
   * Marks a badge in the database as damaged.
   * */
  submitDamagedBadgeReport(badgeReportForm: BadgeReportForm): void {
    this.reportService
      .addDamagedBadgeReport(
        badgeReportForm.name,
        badgeReportForm.damagedComments
      )
      .subscribe(
        () => {
          this.modalService.setModalContext(
            'Badge has successfully been marked damaged'
          );
        },
        (error) => {
          this.modalService.setModalContext(
            'There was an error in submitting the damaged report. Check the values before sending again'
          );
        }
      );
  }

  /*
   * Handler of a token report's emitted event.
   * */
  addToQueue($event: {
    outerIndex: string;
    innerIndex: number;
    queuedFile: FileItem;
  }): void {
    const x = $event.queuedFile as ILwiFileItem;
    console.log('The Event: ', $event);
    this.queuedFiles.set(
      { outerIndex: $event.outerIndex, innerIndex: $event.innerIndex },
      x
    );
    console.log('X value: ', x);
  }

  /*
   * Handler of a token report's emitted event.
   *  */
  removeFromQueue(key: { outerIndex: string; innerIndex: number }): void {
    this.queuedFiles.get(key).remove();
    this.queuedFiles.delete(key);
  }

  /*
   * Instructs all FileItems to upload to the backend.
   * */
  uploadAll(): void {
    for (const file of this.queuedFiles.values()) {
      file.upload();
    }
  }

  /*
   * Returns the number of FileItems not yet uploaded from the queued files Map.
   * */
  getNotUploadedItemsCount(): number {
    const temp = [];
    for (const file of this.queuedFiles.values()) {
      if (!file.isUploaded) {
        temp.push(file);
      }
    }
    return temp.length;
  }

  /*
   * Cancels the uploading of the FileItems in the queued files Map.
   * */
  cancelAll(): void {
    for (const file of this.queuedFiles.values()) {
      if (file.isUploading) {
        file.cancel();
      }
    }
  }

  /*
   * Returns the number of FileItems currently uploading from the queued files Map.
   * */
  getUploadingItemsCount(): number {
    const temp = [];
    for (const file of this.queuedFiles.values()) {
      if (file.isUploading) {
        temp.push(file);
      }
    }
    return temp.length;
  }

  /*
   * Tied to a button click event. Removes all entries from the queued files Map.
   * */
  removeAll(): void {
    for (const key of this.queuedFiles.keys()) {
      this.queuedFiles.get(key).remove();
    }
    this.queuedFiles.clear();
  }
}
