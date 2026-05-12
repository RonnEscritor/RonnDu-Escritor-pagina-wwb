'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Book } from '@/lib/products'
import Checkout from '@/components/checkout'

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  
  const formattedPrice = book.available 
    ? `$${(book.priceInCents / 100).toFixed(2)}` 
    : 'Próximamente'

  return (
    <>
      <article className="group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
        {/* Book cover */}
        <div className="relative aspect-[2/3] bg-muted overflow-hidden">
          <Image
            src={book.coverImage}
            alt={`Portada de ${book.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {!book.available && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Próximamente</span>
            </div>
          )}
        </div>
        
        {/* Book info */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {book.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {book.synopsis}
          </p>
          
          <div className="flex items-center justify-between">
            <span className={`text-lg font-bold ${book.available ? 'text-foreground' : 'text-muted-foreground'}`}>
              {formattedPrice}
            </span>
            
            {book.available && (
              <Button 
                onClick={() => setShowCheckout(true)}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Comprar ahora
              </Button>
            )}
          </div>
        </div>
      </article>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-card border border-border rounded-lg p-6">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-semibold mb-4">Comprar: {book.title}</h2>
            <Checkout bookId={book.id} />
          </div>
        </div>
      )}
    </>
  )
}
