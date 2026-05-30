/**
 * lib/utils/file.ts
 * SRP: Pure browser-side file manipulation utilities.
 * No API calls — only transforms File objects.
 */

/**
 * Converts a File object to a Base64 string (stripped of data URI prefix).
 */
export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const base64 = result.includes('base64,') ? result.split('base64,')[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Generates a unique file path for storage uploads.
 */
export function generateFilePath(folder: string, originalName: string): string {
  const fileExt = originalName.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  return `${folder}/${fileName}`;
}
