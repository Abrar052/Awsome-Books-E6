import { DateTime } from './modules/luxon.js';
import Library from './modules/list.js';

const library = new Library();

// BOOK ELEMENT

const listOfBooksElement = document.querySelector('#books .list-books');

const deleteBook = (parentContainer, id) => {
  parentContainer.remove();
  library.remove(id);
};

const CreateBookItemHTML = (id, title, author) => {
  const divContainer = document.createElement('div');
  const bookTitleAndAuthor = document.createElement('p');
  const deleteBookBtn = document.createElement('button');

  divContainer.id = `Book-${id}`;
  divContainer.classList.add('details');

  bookTitleAndAuthor.innerText = `"${title}" by ${author}`;
  bookTitleAndAuthor.classList.add('title');
  bookTitleAndAuthor.classList.add('author');

  deleteBookBtn.innerText = 'Remove';
  deleteBookBtn.classList.add('delete');

  deleteBookBtn.addEventListener('click', () => {
    deleteBook(divContainer, id);
  });

  divContainer.appendChild(bookTitleAndAuthor);
  divContainer.appendChild(deleteBookBtn);

  return divContainer;
};

const AddBookToContainer = (book) => {
  listOfBooksElement.appendChild(CreateBookItemHTML(book.id, book.title, book.author));
};

const createBookListing = () => {
  library.books.forEach((book) => {
    AddBookToContainer(book);
  });
};

// ADD book from

const addBookForm = document.querySelector('#book-form');
const bookTitleInput = addBookForm.querySelector('#title');
const bookAuthorInput = addBookForm.querySelector('#author');

const addBook = (e) => {
  e.preventDefault();
  AddBookToContainer(library.createBookAndAdd(bookTitleInput.value, bookAuthorInput.value));
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  return false;
};

const addBookButtonLIstener = () => {
  addBookForm.addEventListener('submit', addBook);
};

const refreshTime = () => {
  const timeDisplay = document.getElementById('date-time');
  timeDisplay.textContent = DateTime.now().setLocale('en-GB').toLocaleString(DateTime.DATE_HUGE);
};

const initTime = () => {
  refreshTime();
};

const sectionList = document.getElementById('books');
const addBookSection = document.getElementById('add-book');
const contactSection = document.getElementById('contact-us');

const listMenu = document.getElementById('list-menu');
const addMenu = document.getElementById('add-menu');
const contactMenu = document.getElementById('contact-menu');

const removeActiveLink = () => {
  listMenu.classList.remove('active');
  addMenu.classList.remove('active');
  contactMenu.classList.remove('active');
};

const clickOnList = (e) => {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  sectionList.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
};

const clickOnAdd = (e) => {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  sectionList.style.display = 'none';
  addBookSection.style.display = 'block';
  contactSection.style.display = 'none';
};

const clickOnContact = (e) => {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  sectionList.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'block';
};

const addNavListeners = () => {
  listMenu.addEventListener('click', clickOnList);
  addMenu.addEventListener('click', clickOnAdd);
  contactMenu.addEventListener('click', clickOnContact);
};

// INITS

const init = () => {
  library.initBookStorage();
  createBookListing();
  addBookButtonLIstener();
  addNavListeners();
  initTime();
};

window.addEventListener('load', init);