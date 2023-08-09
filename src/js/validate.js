export function fileValidation(file) {
  const allowedImageTypes = ["image/jpeg", "image/gif", "image/png"];
  if (!allowedImageTypes.includes(file.type)) return false;
  if (file.size > 1024 * 1024 * 5) return false;
  return true;
}
