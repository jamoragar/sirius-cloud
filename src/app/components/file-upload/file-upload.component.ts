import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidFileType } from "../../helper/valid-file-type";
import { FileUploadService } from "../../services/file-upload/file-upload.service";
import { KilobytePipe } from "../../pipes/kilobyte.pipe";
import { forkJoin } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-file-upload",
  standalone: true,
  imports: [CommonModule, KilobytePipe],
  templateUrl: "./file-upload.component.html",
  styleUrl: "./file-upload.component.css",
})
export class FileUploadComponent {
  isHovering = false;
  isUploading = false;
  isReportDone = false;
  uploadingFiles: File[] = [];

  constructor(private fileUploadSvc: FileUploadService) {}

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHovering = true;
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHovering = false;
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isHovering = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.addFiles(files);
    }
  }

  public onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  public addFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      if (ValidFileType.isValidFileType(files.item(i)!)) {
        this.uploadingFiles.push(files.item(i)!);
      } else alert("Only images, audio, video, and PDF files are allowed.");
    }
    this.uploadFiles(this.uploadingFiles);
  }

  public uploadFiles(files: File[]): void {
    this.isUploading = true;

    const uploadObservables = files.map((file) =>
      this.fileUploadSvc.uploadFile(file)
    );

    forkJoin(uploadObservables)
      .pipe(
        finalize(() => {
          this.isUploading = false;
          this.isReportDone = true;
        })
      )
      .subscribe((responses) => {
        responses.forEach((response) => {
          console.log(response);
        });
      });
  }
}
