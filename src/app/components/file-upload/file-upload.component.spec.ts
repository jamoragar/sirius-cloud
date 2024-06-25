import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FileUploadComponent } from "./file-upload.component";
import { FileUploadService } from "../../services/file-upload/file-upload.service";
import { CommonModule } from "@angular/common";
import { KilobytePipe } from "../../pipes/kilobyte.pipe";
import { of } from "rxjs";

class MockFileUploadService {
  uploadFile(file: File) {
    return of("File uploaded successfully");
  }
}
class MockValidFileType {
  static isValidFileType(file: File): boolean {
    const validExtensions = ["image", "audio", "video", "pdf"];
    return validExtensions.some((ext) => file.type.includes(ext));
  }
}
describe("FileUploadComponent", () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let fileUploadSvc: FileUploadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent],
      providers: [
        { provide: FileUploadService, useClass: MockFileUploadService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fileUploadSvc = TestBed.inject(FileUploadService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set isHovering to true and prevent default behavior on drag over", () => {
    const event = new DragEvent("dragover");
    spyOn(event, "preventDefault");
    spyOn(event, "stopPropagation");

    component.onDragOver(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.isHovering).toBeTrue();
  });

  it("should set isHovering to false on drag leave", () => {
    const event = new DragEvent("dragleave");
    component.onDragLeave(event);
    expect(component.isHovering).toBeFalse();
  });

  it("should not add any files to uploadingFiles array when no files are provided", function () {
    const fileList = {
      length: 0,
      item: (index: number) => null,
    } as FileList;

    const fileUploadSvc = jasmine.createSpyObj("FileUploadService", [
      "uploadFile",
    ]);
    const component = new FileUploadComponent(fileUploadSvc);

    component.addFiles(fileList);

    expect(component.uploadingFiles.length).toBe(0);
  });
});
