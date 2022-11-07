import { onSnapshot, doc, deleteDoc, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { bookCollection, db } from "./firebase/firebase";
import "./App.css";
import AddBook from "./AddBook";
import SearchBook from "./SearchBook";

function App() {
  const [books, setBooks] = useState([]);
  const [searchedBook, setSearchedBook] = useState("");
  const [searchedBookArr, setSearchedBookArr] = useState([]);
  const allBooks = searchedBookArr.length > 0 ? searchedBookArr : books;
  // states
  const [bookInfo, setBookInfo] = useState({
    name: "",
    price: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedBookInfo, setUpdatedBookInfo] = useState({});

  // fetching book data
  const fetchBookData = useCallback(() => {
    const q = query(bookCollection, orderBy("name", "asc"));
    onSnapshot(q, (snapshot) => {
      let allBooks = [];
      snapshot.docs.forEach((item) => {
        const newBook = { ...item.data(), id: item.id };
        allBooks.push(newBook);
      });
      setBooks(allBooks);
    });
  }, []);

  useEffect(() => {
    fetchBookData();
  }, [fetchBookData]);

  // delete book
  const deleteBook = (id) => {
    const docRef = doc(db, "books", id);

    deleteDoc(docRef)
      .then(() => alert("successfully deleted"))
      .catch((err) => alert(err.message));
  };

  // search a book
  const searchBookFunc = useCallback(() => {
    let searchedBooks = books.filter((item) =>
      item.name.toUpperCase().includes(searchedBook.toUpperCase())
    );
    setSearchedBookArr(searchedBooks);
  }, [searchedBook, books]);

  useEffect(() => {
    searchBookFunc();
  }, [searchBookFunc]);

  const getDataToUpdateBook = (id) => {
    setIsUpdate(true);

    // find the data from db
    const docRef = doc(db, "books", id);

    onSnapshot(docRef, (doc) => {
      setUpdatedBookInfo({ ...doc.data(), id: doc.id });
    });
  };

  return (
    <div className="firebase">
      <h2> Firebase Cloud Storage Practice</h2>

      <AddBook
        bookInfo={bookInfo}
        setBookInfo={setBookInfo}
        isUpdate={isUpdate}
        updatedBookInfo={updatedBookInfo}
        setUpdatedBookInfo={setUpdatedBookInfo}
        setIsUpdate={setIsUpdate}
      />

      <SearchBook
        searchedBook={searchedBook}
        setSearchedBook={setSearchedBook}
      />
      {searchedBookArr.length === 0 && (
        <p style={{ marginTop: "3px", color: "red" }}>
          {" "}
          Searched Item not Found{" "}
        </p>
      )}

      {allBooks.length > 0 && (
        <h4 style={{ marginTop: "30px" }}> Book list </h4>
      )}

      <div className="book_list_container" style={{ width: "80%" }}>
        {allBooks.map((book) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={book.id}
            >
              <div className="book_name"> {book.name} </div>
              <div className="book__price" style={{ marginLeft: "10px" }}>
                ${book.price}
              </div>
              <button
                style={{ padding: "10px", marginLeft: "10px" }}
                onClick={() => getDataToUpdateBook(book.id)}
              >
                {" "}
                Update {book.name}
              </button>
              <button
                style={{ padding: "10px", marginLeft: "10px" }}
                onClick={() => deleteBook(book.id)}
              >
                {" "}
                Delete {book.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
