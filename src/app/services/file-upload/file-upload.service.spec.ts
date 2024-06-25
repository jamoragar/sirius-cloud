import { TestBed } from "@angular/core/testing";
import { FileUploadService } from "./file-upload.service";
import { Observable } from "rxjs";

describe("FileUploadService", () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadService],
    });
    service = TestBed.inject(FileUploadService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should upload a file and return a success message", (done: DoneFn) => {
    const file = new File([""], "test-file.jpg");
    const uploadObservable = service.uploadFile(file);

    uploadObservable.subscribe({
      next: (message) => {
        expect(message).toBe("File uploaded successfully");
      },
      complete: () => {
        done();
      },
    });
  });

  it("should log the file name when uploading", () => {
    spyOn(console, "log");
    const file = new File([""], "test-file.jpg");
    service.uploadFile(file).subscribe();

    expect(console.log).toHaveBeenCalledWith("Uploading file:", file.name);
  });

  it("should emit and complete after 3000ms", (done: DoneFn) => {
    jasmine.clock().install();

    const file = new File([""], "test-file.jpg");
    const uploadObservable = service.uploadFile(file);

    let emittedValue: string | undefined;
    let completed = false;

    uploadObservable.subscribe({
      next: (message) => {
        emittedValue = message;
      },
      complete: () => {
        completed = true;
      },
    });

    jasmine.clock().tick(3000);

    expect(emittedValue).toBe("File uploaded successfully");
    expect(completed).toBeTrue();

    jasmine.clock().uninstall();
    done();
  });
});
