'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Edit, Eye, EyeOff, Clock } from 'lucide-react'
import type { Book } from './admin-dashboard'

interface BookListProps {
  books: Book[]
  onEditBook: (book: Book) => void
}

export function BookList({ books, onEditBook }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border rounded-lg">
        <p className="text-muted-foreground mb-4">No tienes libros todavía</p>
        <p className="text-sm text-muted-foreground/70">
          Haz clic en &quot;Agregar libro&quot; para comenzar
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-foreground/20 transition-colors"
        >
          {/* Cover thumbnail */}
          <div className="relative w-16 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
            {book.cover_image_url ? (
              <Image
                src={book.cover_image_url}
                alt={book.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                Sin portada
              </div>
            )}
          </div>

          {/* Book info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{book.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{book.description}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm font-medium text-foreground">
                ${(book.price_in_cents / 100).toFixed(2)}
              </span>
              <div className="flex items-center gap-1">
                {book.is_published ? (
                  <span className="inline-flex items-center gap-1 text-xs text-green-500">
                    <Eye className="w-3 h-3" />
                    Publicado
                  </span>
                ) : book.is_coming_soon ? (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                    <Clock className="w-3 h-3" />
                    Próximamente
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <EyeOff className="w-3 h-3" />
                    Borrador
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditBook(book)}
            className="gap-2 flex-shrink-0"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Button>
        </div>
      ))}
    </div>
  )
}
