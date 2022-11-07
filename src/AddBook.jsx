import { addDoc, doc, updateDoc } from "@firebase/firestore";
import { bookCollection, db } from "./firebase/firebase";

const AddBook = ({
  bookInfo,
  setBookInfo,
  isUpdate,
  updatedBookInfo,
  setUpdatedBookInfo,
  setIsUpdate,
}) => {
  // add new book function
  const addBook = (e) => {
    e.preventDefault();

    addDoc(bookCollection, {
      ...bookInfo,
    })
      .then(() => setBookInfo({ name: "", price: "" }))
      .catch((err) => console.log(err.message));
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    if (isUpdate) {
      setUpdatedBookInfo({ ...updatedBookInfo, [field]: value });
    } else {
      setBookInfo({ ...bookInfo, [field]: value });
    }
  };

  // update the book
  const updateBook = (e) => {
    e.preventDefault();
    //doc ref
    const docRef = doc(db, "books", updatedBookInfo.id);

    updateDoc(docRef, {
      ...updatedBookInfo,
    }).then(() => {
      setUpdatedBookInfo({ name: "", price: "" });
      setIsUpdate(false);
    });
  };



  return (
    <div className="add_book" style={{ marginTop: "20px" }}>
      <form onSubmit={isUpdate ? updateBook : addBook}>
        {isUpdate ? <h4> Update book </h4> : <h4> Add a book </h4>}
        <input
          type="text"
          name="name"
          placeholder="book Name"
          style={{ padding: "10px" }}
          value={isUpdate ? updatedBookInfo.name : bookInfo.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="book Price"
          style={{ padding: "10px" }}
          value={isUpdate ? updatedBookInfo.price : bookInfo.price}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ padding: "10px" }}>
          {" "}
          {isUpdate ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
