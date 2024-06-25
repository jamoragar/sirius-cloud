import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor() {}

  uploadFile(file: File): Observable<string> {
    return new Observable((observer) => {
      console.log("Uploading file:", file.name);
      setTimeout(() => {
        observer.next("File uploaded successfully");
        observer.complete();
      }, 1000);
    });
  }
}
