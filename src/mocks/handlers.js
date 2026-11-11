import { http, HttpResponse, delay } from 'msw';

// Definición de datos simulados (mock) organizados por género de libros
const booksByGenre = {
  Ficcion: [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', price: 15990 },
    { id: 2, title: '1984', author: 'George Orwell', price: 12990 },
  ],
  'Ciencia Ficcion': [
    { id: 3, title: 'Duna', author: 'Frank Herbert', price: 18990 },
    { id: 4, title: 'Fundación', author: 'Isaac Asimov', price: 14990 },
  ],
  Drama: [] // Arreglo vacío para simular cuando no hay libros disponibles en una categoría
};

export const handlers = [
  http.get('/api/books', async ({ request }) => {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');

    // Simula un retraso en la respuesta del servidor de 1 segundo
    await delay(1000);

    // Valida si el género existe en los datos mock
    if (!genre || !booksByGenre[genre]) {
      return new HttpResponse(
        JSON.stringify({ message: 'Género no encontrado o no especificado' }), 
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Devuelve los libros correspondientes al género solicitado
    return HttpResponse.json(booksByGenre[genre]);
  }),
];