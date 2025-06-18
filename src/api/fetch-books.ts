export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  description: string;
  pages: number;
  genre: string;
  rating: number;
}

export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch('/data/books.json');
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки книг:', error);
    throw error;
  }
}
