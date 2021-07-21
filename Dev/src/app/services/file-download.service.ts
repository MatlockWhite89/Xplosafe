import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class FileDownloadService {
  constructor(private http: HttpClient) {}

  downloadFile(fileName: string, originalFileName: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/downloadFile`,
      {
        fileName,
        desiredFilename: originalFileName,
      },
      {
        responseType: 'blob' as 'json',
      }
    );
  }
}
