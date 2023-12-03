// Create a class for the book info
class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

//Library class to store the books
class Library {
  constructor() {
    this.bookCount = 0;
    this.books = [];
  }

  // Mark the book as read
  markRead(id, checkbox) {
    this.books.forEach((book) => {
      if (book.id === id) {
        book.read = true;
        checkbox.checked = true;
        checkbox.disabled = true;
      }
    });
  }

  // Add the book to the library
  addBook(title, author, read) {
    const newBook = new Book(title, author, read);
    newBook.id = this.bookCount++;

    // Create the table row and cells
    const tableBody = document.querySelector("tbody");
    const newRow = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = newBook.title;

    const authorCell = document.createElement("td");
    authorCell.textContent = newBook.author;

    const readCell = document.createElement("td");
    const readCheckbox = document.createElement("input");
    const removeButton = document.createElement("button");

    readCell.classList.add("readCell");

    readCheckbox.type = "checkbox";
    readCheckbox.checked = newBook.read;
    readCheckbox.classList.add("checkBoxes");

    // Disable the checkbox if the book is already read
    if (newBook.read) {
      readCheckbox.disabled = true;
    }
    readCheckbox.addEventListener("click", () => {
      this.markRead(newBook.id, readCheckbox);
    });

    // Create the remove button
    removeButton.textContent = "X";
    removeButton.classList.add("removeBtn");

    // Remove the book from the library
    removeButton.addEventListener("click", () => {
      const row = removeButton.parentNode.parentNode;
      row.parentNode.removeChild(row);
      this.removeBook(newBook.id);
    });

    // Append the cells to the row
    readCell.append(readCheckbox, removeButton);
    newRow.appendChild(titleCell);
    newRow.appendChild(authorCell);
    newRow.appendChild(readCell);
    tableBody.appendChild(newRow);

    // Push the book to the library
    this.books.push(newBook);

    // Clear the input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("read").checked = false;
  }

  // Remove the book from the library
  removeBook(id) {
    this.books.forEach((book, index) => {
      if (book.id === id) {
        this.books.splice(index, 1);
      }
    });
  }
}

// Create MyLibrary object
const myLibrary = new Library();

// Add the book to the library
const addButton = document.getElementById("addBookButton");
addButton.addEventListener("click", () => {
  const titleInput = document.getElementById("title").value;
  const authorInput = document.getElementById("author").value;
  const readCheckbox = document.getElementById("read").checked;

  myLibrary.addBook(titleInput, authorInput, readCheckbox);
});
