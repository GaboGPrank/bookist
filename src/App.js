import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const sampleBooks = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
    read: true,
  },
  {
    id: 2,
    title: "El nombre del viento",
    author: "Patrick Rothfuss",
    year: 2007,
    read: false,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    read: true,
  },
  {
    id: 4,
    title: "Sapiens: De animales a dioses",
    author: "Yuval Noah Harari",
    year: 2011,
    read: false,
  },
  {
    id: 5,
    title: "El señor de los anillos",
    author: "J.R.R. Tolkien",
    year: 1954,
    read: true,
  },
];

function App() {
  const [books, setBooks] = useState(sampleBooks);
  const [searchKey, setSearchKey] = useState("");

  function handleSubmit(book) {
    setBooks(() => [...books, book]);
  }

  function handleChangeRead(id) {
    const updatedBooks = books.map((b) =>
      b.id === id ? { ...b, read: !b.read } : b
    );
    setBooks(updatedBooks);
  }

  return (
    <div className="book-app">
      <div className="book-controls">
        <BookSearch searchKey={searchKey} setSearchKey={setSearchKey} />
        <BookForm onSubmitForm={handleSubmit} />
      </div>
      <div className="book-list">
        <BookList
          books={books}
          onChangeRead={handleChangeRead}
          searchKey={searchKey}
        />
      </div>
    </div>
  );
}

function BookSearch({ searchKey, setSearchKey }) {
  return (
    <div className="book-form book-search">
      <i className="bi bi-search"></i>
      <input
        type="text"
        className="book-input"
        placeholder="Busca..."
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </div>
  );
}

function BookForm({ onSubmitForm }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [read, setRead] = useState(false);

  return (
    <form
      className="book-form"
      onSubmit={(e) => {
        e.preventDefault();
        const book = {
          title: title,
          author: author,
          year: year ? Number(year) : null,
          read: read,
          id: crypto.randomUUID(),
        };

        onSubmitForm(book);

        setTitle("");
        setAuthor("");
        setYear("");
        setRead(false);
      }}
    >
      <label>Título</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Autor</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label>Año</label>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <div className="checkbox-container">
        <label htmlFor="read">Leído</label>
        <input
          type="checkbox"
          name="read"
          id="read"
          checked={read}
          onChange={(e) => setRead(e.target.checked)}
        />
      </div>

      <button className="book-submit-btn">
        <i className="bi bi-plus"></i>Añadir
      </button>
    </form>
  );
}

function BookList({ books, onChangeRead, searchKey }) {
  const bookList = searchKey
    ? books.filter((b) =>
        b.title.toLowerCase().includes(searchKey.toLowerCase())
      )
    : books;
  return (
    <ul>
      {bookList.map((b) => (
        <BookItem book={b} onChangeRead={onChangeRead} />
      ))}
    </ul>
  );
}

function BookItem({ book, onChangeRead }) {
  return (
    <div className="book-item">
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-meta">
          Autor: {book.author} · Año: {book.year}
        </p>
      </div>
      <div
        onClick={() => onChangeRead(book.id)}
        className={`book-status ${book.read ? "read" : "unread"}`}
      >
        {book.read ? "Leído" : "Pendiente"}
      </div>
    </div>
  );
}

export default App;
