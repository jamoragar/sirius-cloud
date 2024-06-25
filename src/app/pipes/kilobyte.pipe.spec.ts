import { KilobytePipe } from "./kilobyte.pipe";

describe("KilobytePipe", () => {
  let pipe: KilobytePipe;

  beforeEach(() => {
    pipe = new KilobytePipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should transform bytes to kilobytes", () => {
    expect(pipe.transform(1024)).toBe("1.00 KB");
    expect(pipe.transform(2048)).toBe("2.00 KB");
    expect(pipe.transform(5120)).toBe("5.00 KB");
  });

  it("should handle zero bytes", () => {
    expect(pipe.transform(0)).toBe("0 KB");
  });

  it("should handle fractional kilobytes", () => {
    expect(pipe.transform(1025)).toBe("1.00 KB");
    expect(pipe.transform(1536)).toBe("1.50 KB");
  });

  it("should handle large values", () => {
    expect(pipe.transform(1048576)).toBe("1024.00 KB");
  });
});
