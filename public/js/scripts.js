document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display books
    async function fetchBooks() {
      try {
        const response = await axios.get('/books');
        const books = response.data.books;
        const bookList = document.querySelector('#book-list');
        bookList.innerHTML = '';
        books.forEach(book => {
          const bookItem = document.createElement('li');
          bookItem.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Rating: ${book.rating}</p>
            <p>Review: ${book.review}</p>
            <p>Date Read: ${new Date(book.dateRead).toLocaleDateString()}</p>
            <a href="/books/edit/${book._id}">Edit</a>
            <button class="delete-btn" data-id="${book._id}">Delete</button>
          `;
          bookList.appendChild(bookItem);
        });
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
  
    // Delete a book
    document.addEventListener('click', async (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const bookId = event.target.getAttribute('data-id');
        try {
          await axios.get(`/books/delete/${bookId}`);
          fetchBooks();
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      }
    });
  
    // Initial fetch
    fetchBooks();
  });
  