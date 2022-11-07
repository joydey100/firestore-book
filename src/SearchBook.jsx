const SearchBook = ({ searchedBook, setSearchedBook }) => {
  return (
    <div>
      <h4 style={{ marginTop: "30px" }}> Search your book </h4>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          required
          placeholder="Book Name"
          style={{ padding: "10px" }}
          value={searchedBook}
          onChange={(e) => setSearchedBook(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBook;
