export function fileValidation(file) {
  const allowedImageTypes = ["image/jpeg", "image/gif", "image/png"];
  if (!allowedImageTypes.includes(file.type)) return false;
  if (file.size > 1024 * 1024 * 5) return false;
  return true;
}

export function searchFormIsEmpty(form) {
  const categorySelected = Array.from(
    form.querySelectorAll("input[name='category']:checked"),
  ).map((el) => el.value);
  const genderSelected = Array.from(
    form.querySelectorAll("input[name='gender']:checked"),
  ).map((el) => el.value);

  if (
    categorySelected.length === 0 &&
    genderSelected.length === 0 &&
    form.keywords.value === ""
  )
    return true;
  return false;
}
