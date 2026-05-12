'use server'

import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function startCheckoutSession(bookId: string) {
  const supabase = await createClient()
  
  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', bookId)
    .single()
  
  if (error || !book) {
    throw new Error(`Libro con id "${bookId}" no encontrado`)
  }
  
  if (!book.is_published) {
    throw new Error(`El libro "${book.title}" no está disponible actualmente`)
  }

  // Crear sesión de Checkout de Stripe
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: book.title,
            description: book.synopsis || book.description,
          },
          unit_amount: book.price_in_cents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    metadata: {
      book_id: book.id,
      book_slug: book.slug,
    },
  })

  return session.client_secret
}
