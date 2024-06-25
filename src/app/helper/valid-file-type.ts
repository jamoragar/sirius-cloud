export class ValidFileType {
  static allowedTypes = ["image/", "audio/", "video/", "application/pdf"];

  static isValidFileType(file: File): boolean {
    return this.allowedTypes.some((type) => file.type.startsWith(type));
  }
}
