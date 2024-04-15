export function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  for (const [attribute, value] of Object.entries(attributes)) {
    if (value !== null) {
      element.setAttribute(attribute, value);
    }
  }
  return element;
}