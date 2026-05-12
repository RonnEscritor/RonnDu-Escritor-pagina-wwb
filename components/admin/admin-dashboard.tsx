'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { BookOpen, LogOut, Plus } from 'lucide-react'
import { BookEditor } from './book-editor'
import { BookList } from './book-list'

export interface Book {
  id: string
  title: string
  slug: string
  description: string
  synopsis: string | null
  price_in_cents: number
  cover_image_url: string | null
  is_published: boolean
  is_coming_soon: boolean
  sort_order: number
  stripe_product_id: string | null
  digital_file_url: string | null
  created_at: string
  updated_at: string
}

interface AdminDashboardProps {
  initialBooks: Book[]
}

export function AdminDashboard({ initialBooks }: AdminDashboardProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  function handleEditBook(book: Book) {
    setEditingBook(book)
    setIsCreating(false)
  }

  function handleCreateNew() {
    setEditingBook(null)
    setIsCreating(true)
  }

  function handleCloseEditor() {
    setEditingBook(null)
    setIsCreating(false)
  }

  function handleBookSaved(savedBook: Book) {
    if (editingBook) {
      setBooks(books.map(b => b.id === savedBook.id ? savedBook : b))
    } else {
      setBooks([...books, savedBook])
    }
    handleCloseEditor()
  }

  function handleBookDeleted(deletedId: string) {
    setBooks(books.filter(b => b.id !== deletedId))
    handleCloseEditor()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/10 border border-border">
              <BookOpen className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-cursive)' }}>
                RonnDu
              </h1>
              <p className="text-xs text-muted-foreground">Panel de Administración</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver sitio
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Mis Libros</h2>
            <p className="text-muted-foreground">Gestiona tu catálogo de libros</p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Agregar libro
          </Button>
        </div>

        {(isCreating || editingBook) ? (
          <BookEditor
            book={editingBook}
            onSave={handleBookSaved}
            onCancel={handleCloseEditor}
            onDelete={editingBook ? handleBookDeleted : undefined}
          />
        ) : (
          <BookList books={books} onEditBook={handleEditBook} />
        )}
      </main>
    </div>
  )
}
