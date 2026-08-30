export function validateRequiredText(
  value,
  message = "Este campo es obligatorio",
) {
  if (!value || !value.trim()) {
    return message;
  }

  return "";
}
