const tBody = document.getElementById('table-body');
const table = document.getElementById('table');
const addBook = document.getElementById('add-book-button');
const dialog = document.getElementById('add-book-dialog');
const form = document.getElementById('dialog-form');
const closeDialog = document.getElementById('close-dialog');
const submit = document.getElementById('add-book-submit');
const title = document.getElementById('book-title');
const author = document.getElementById('book-author');
const pages = document.getElementById('book-pages');
const reading = document.getElementById('book-read');
const library = [];

function Book(title, author, pages, hasFinished) {
  // Book constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasFinished = hasFinished;
}

function addToLibrary(book) {
  if (!(library.includes(book))) {
    library.push(book);
  }
}

addBook.addEventListener('click', () => {
  dialog.showModal();
});

closeDialog.addEventListener('click', () => {
  dialog.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newBook = new Book(title.value, author.value, pages.value, reading.checked);
  addToLibrary(newBook);

  form.reset();
  
  dialog.close();

  resetTable();
  displayCatalogue();
});

function displayCatalogue() {
  library.forEach((book) => {

    // Make row and cells in the row
    const row = tBody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const readingCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    // Adding content in each cell
    const titleText = document.createTextNode(`${book.title}`)
    const authorText = document.createTextNode(`${book.author}`)
    const pagesText = document.createTextNode(`${book.pages}`)
    const finishedReading = document.createElement('input');
    finishedReading.setAttribute('type', 'checkbox');
    finishedReading.checked = book.hasFinished;
    if(reading.checked == true) {
      finishedReading.setAttribute('checked', true);
    }
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.addEventListener('click', removeRow);

    const buttonIcon = document.createElement('span');
    buttonIcon.setAttribute('class', 'material-symbols-outlined');
    buttonIcon.setAttribute('id', 'remove-book-button');
    const buttonText = document.createTextNode('close');
    buttonIcon.appendChild(buttonText);
    deleteButton.appendChild(buttonIcon);

    // Adding the content into its correct cell
    titleCell.appendChild(titleText);
    authorCell.appendChild(authorText);
    pagesCell.appendChild(pagesText);
    readingCell.appendChild(finishedReading);
    deleteCell.appendChild(deleteButton);
  });
}

function resetTable() {
  for(let i = tBody.rows.length - 1; i >= 0; i--) {
    tBody.deleteRow(i);
  }
}

function removeRow(e) {
  let index = e.target.closest('tr').rowIndex;
  library.splice(index - 1, 1);
  e.target.closest('tr').remove();
  console.log(index + ' ' + library);
}