class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.bookCount = 0;
    this.books = [];
  }

  markRead(id, checkbox) {
    this.books.forEach((book) => {
      if (book.id === id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  addBook(title, author, read) {
    const newBook = new Book(title, author, read);
    newBook.id = this.bookCount++;

    const tableBody = document.querySelector("tbody");
    const newRow = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = newBook.title;

    const authorCell = document.createElement("td");
    authorCell.textContent = newBook.author;

    const readCell = document.createElement("td");
    const readCheckbox = document.createElement("input");

    readCheckbox.type = "checkbox";
    readCheckbox.checked = newBook.read;
    readCheckbox.classList.add("checkBoxes");

    if (newBook.read) {
      readCheckbox.disabled = true;
    }
    readCheckbox.addEventListener("click", () => {
      this.markRead(newBook.id, readCheckbox);
    });

    readCell.appendChild(readCheckbox);

    newRow.appendChild(titleCell);
    newRow.appendChild(authorCell);
    newRow.appendChild(readCell);

    tableBody.appendChild(newRow);

    this.books.push(newBook);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("read").checked = false;
  }
}
const myLibrary = new Library();

const addButton = document.getElementById("addBookButton");
addButton.addEventListener("click", () => {
  const titleInput = document.getElementById("title").value;
  const authorInput = document.getElementById("author").value;
  const readCheckbox = document.getElementById("read").checked;

  myLibrary.addBook(titleInput, authorInput, readCheckbox);
});

