export function isValidZip(zip) {
    let regExp = /^\d{5}(-\d{4})?$/;
    return regExp.test(zip);
}

export function showAlert(message, className) {
  const div = document.createElement('div');

  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const form = document.querySelector('#pet-form');

  container.insertBefore(div, form);

  setTimeout(() => document.querySelector('.alert').remove(), 3500);
}
