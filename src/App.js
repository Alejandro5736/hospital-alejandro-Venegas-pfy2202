import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';

// Componente Home: selector de categorías de libros
function Home() {
  const navigate = useNavigate();
  const categories = ['Ficcion', 'Ciencia Ficcion', 'Drama'];

  const handleCategorySelect = (e) => {
    const genre = e.target.value;
    if (genre) {
      navigate(`/books/${genre}`);
    }
  };

  return (
    <div className="home-container">
      <h2>Tienda de Libros - Categorías</h2>
      <p>Selecciona una categoría para explorar:</p>
      
      <div className="category-links">
        {categories.map((cat) => (
          <Link key={cat} to={`/books/${cat}`} className="category-btn">
            {cat}
          </Link>
        ))}
      </div>

      <div className="select-container">
        <label htmlFor="genre-select">Filtrar por selector: </label>
        <select id="genre-select" onChange={handleCategorySelect} defaultValue="">
          <option value="" disabled>Seleccione un género...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Componente BookList: consume los datos del servidor mock usando fetch
function BookList() {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Realiza la petición al endpoint interceptado por MSW
    fetch(`/api/books?genre=${genre}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API.');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [genre]);

  if (loading) return <div className="loader">Cargando libros desde el servidor mock... ⏳</div>;
  if (error) return <div className="error-msg">Error: {error}</div>;

  return (
    <div className="booklist-container">
      <h3>Libros de la categoría: {genre}</h3>
      <Link to="/" className="back-link">← Volver al inicio</Link>

      {books.length === 0 ? (
        <p className="no-books">No hay libros disponibles en esta categoría.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h4>{book.title}</h4>
              <p><strong>Autor:</strong> {book.author}</p>
              <p className="price">Precio: ${book.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Componente principal de la app con las rutas configuradas
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <h1>📚 Librería Online (Integración REST con MSW)</h1>
          <nav>
            <Link to="/">Inicio</Link>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:genre" element={<BookList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;