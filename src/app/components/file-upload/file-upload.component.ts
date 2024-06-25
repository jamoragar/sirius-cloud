import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidFileType } from "../../helper/valid-file-type";
import { FileUploadService } from "../../services/file-upload/file-upload.service";

@Component({
  selector: "app-file-upload",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./file-upload.component.html",
  styleUrl: "./file-upload.component.css",
})
export class FileUploadComponent {
  isHovering = false;
  isFileInputFocused = false;
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

  private addFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      if (ValidFileType.isValidFileType(files.item(i)!))
        this.uploadingFiles.push(files.item(i)!);
      else alert("Only images, audio, video, and PDF files are allowed.");
    }
  }
}
