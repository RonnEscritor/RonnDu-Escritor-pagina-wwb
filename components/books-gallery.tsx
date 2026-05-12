import { createClient } from '@/lib/supabase/server'
import { BookCardDB } from '@/components/book-card-db'

export async function BooksGallery() {
  const supabase = await createClient()
  
  const { data: books } = await supabase
    .from('books')
    .select('*')
    .or('is_published.eq.true,is_coming_soon.eq.true')
    .order('sort_order', { ascending: true })

  // If no books in database, show placeholder message
  if (!books || books.length === 0) {
    return (
      <section id="libros" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Mis Libros
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada obra es un viaje único. Explora las historias que he creado y encuentra la que resuene contigo.
            </p>
          </div>
          
          <div className="text-center py-16">
            <p className="text-muted-foreground">Próximamente disponibles...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="libros" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Mis Libros
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada obra es un viaje único. Explora las historias que he creado y encuentra la que resuene contigo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCardDB key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  )
}
