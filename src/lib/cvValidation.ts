export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB limit

export function validatePDFFile(file: File): ValidationResult {
  if (!file) {
    return {
      isValid: false,
      errorMessage: "No file was selected for upload.",
    };
  }

  // File Type Validation
  const isPdfMime = file.type === "application/pdf";
  const hasPdfExtension = file.name.toLowerCase().endsWith(".pdf");

  if (!isPdfMime && !hasPdfExtension) {
    return {
      isValid: false,
      errorMessage: `Invalid file format "${file.name}". Only PDF documents (.pdf) are permitted.`,
    };
  }

  // File Size Validation
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      errorMessage: `File size (${sizeInMB} MB) exceeds the maximum allowed limit of 10 MB.`,
    };
  }

  return {
    isValid: true,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
