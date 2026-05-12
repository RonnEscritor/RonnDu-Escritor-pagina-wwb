export interface Book {
  id: string
  title: string
  synopsis: string
  priceInCents: number
  coverImage: string
  available: boolean
}

// Catálogo de libros de RonnDu
// Los precios están en centavos (999 = $9.99)
// Cambia 'available: false' a 'true' cuando el libro esté listo
export const BOOKS: Book[] = [
  {
    id: 'libro-1',
    title: 'Título del Libro 1',
    synopsis: 'Una historia cautivadora que explora los límites de la imaginación humana. Descubre un mundo donde la realidad se entrelaza con los sueños más profundos.',
    priceInCents: 999,
    coverImage: '/images/book-1.jpg',
    available: true,
  },
  {
    id: 'libro-2',
    title: 'Título del Libro 2',
    synopsis: 'Un viaje emocional a través de personajes complejos y situaciones que desafían las convenciones. Una lectura que te mantendrá reflexionando mucho después de la última página.',
    priceInCents: 1299,
    coverImage: '/images/book-2.jpg',
    available: true,
  },
  {
    id: 'libro-3',
    title: 'Título del Libro 3',
    synopsis: 'Narrativa contemporánea que aborda temas universales con una voz única y distintiva. Una obra que resuena con las experiencias de nuestra generación.',
    priceInCents: 1499,
    coverImage: '/images/book-3.jpg',
    available: true,
  },
  {
    id: 'libro-4',
    title: 'Título del Libro 4',
    synopsis: 'La más reciente creación que desafía los géneros literarios tradicionales. Una propuesta fresca y audaz para el lector contemporáneo.',
    priceInCents: 1199,
    coverImage: '/images/book-4.jpg',
    available: true,
  },
  {
    id: 'libro-5',
    title: 'Próximamente',
    synopsis: 'Un nuevo proyecto literario está en desarrollo. Mantente atento para descubrir la próxima aventura narrativa.',
    priceInCents: 0,
    coverImage: '/images/book-placeholder.jpg',
    available: false,
  },
  {
    id: 'libro-6',
    title: 'Próximamente',
    synopsis: 'Otra historia está tomando forma. Suscríbete para ser el primero en conocer los detalles.',
    priceInCents: 0,
    coverImage: '/images/book-placeholder.jpg',
    available: false,
  },
]
