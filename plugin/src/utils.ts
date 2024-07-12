export function toCamelCase(str: string) {
  return str.toLowerCase().replace(/[\s_-](.)/g, (_, group1) => {
    return group1.toUpperCase();
  });
}

export function toKebabCase(str: string) {
  return str.toLowerCase().replace(/[\s_-]+/g, "-");
}

export function toClassName(str: string) {
  return toKebabCase(removeGroupPrefix(str));
}

export function removeGroupPrefix(str: string) {
  let nameParts = str.split("/");
  return nameParts[nameParts.length - 1];
}

export function rgbToString(color: RGB | RGBA) {
  const red = Math.round(color.r * 255)
    .toString()
    .padStart(2, "0");
  const green = Math.round(color.g * 255)
    .toString()
    .padStart(2, "0");
  const blue = Math.round(color.b * 255)
    .toString()
    .padStart(2, "0");
  const alpha = color.hasOwnProperty("a") ? (color as RGBA).a : 1;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}