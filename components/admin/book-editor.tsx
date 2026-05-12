'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, ArrowLeft, Trash2 } from 'lucide-react'
import type { Book } from './admin-dashboard'

interface BookEditorProps {
  book: Book | null
  onSave: (book: Book) => void
  onCancel: () => void
  onDelete?: (id: string) => void
}

export function BookEditor({ book, onSave, onCancel, onDelete }: BookEditorProps) {
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: book?.title || '',
    slug: book?.slug || '',
    description: book?.description || '',
    synopsis: book?.synopsis || '',
    price_in_cents: book?.price_in_cents || 999,
    cover_image_url: book?.cover_image_url || '',
    is_published: book?.is_published || false,
    is_coming_soon: book?.is_coming_soon || false,
    sort_order: book?.sort_order || 0,
    digital_file_url: book?.digital_file_url || '',
  })

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
      slug: book ? prev.slug : generateSlug(title)
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      if (book) {
        // Update existing book
        const { data, error: updateError } = await supabase
          .from('books')
          .update({
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            synopsis: formData.synopsis || null,
            price_in_cents: formData.price_in_cents,
            cover_image_url: formData.cover_image_url || null,
            is_published: formData.is_published,
            is_coming_soon: formData.is_coming_soon,
            sort_order: formData.sort_order,
            digital_file_url: formData.digital_file_url || null,
          })
          .eq('id', book.id)
          .select()
          .single()

        if (updateError) throw updateError
        onSave(data)
      } else {
        // Create new book
        const { data, error: insertError } = await supabase
          .from('books')
          .insert({
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            synopsis: formData.synopsis || null,
            price_in_cents: formData.price_in_cents,
            cover_image_url: formData.cover_image_url || null,
            is_published: formData.is_published,
            is_coming_soon: formData.is_coming_soon,
            sort_order: formData.sort_order,
            digital_file_url: formData.digital_file_url || null,
          })
          .select()
          .single()

        if (insertError) throw insertError
        onSave(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el libro')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!book || !onDelete) return
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) return

    setDeleting(true)
    const supabase = createClient()

    try {
      const { error: deleteError } = await supabase
        .from('books')
        .delete()
        .eq('id', book.id)

      if (deleteError) throw deleteError
      onDelete(book.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el libro')
      setDeleting(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        
        {book && onDelete && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="gap-2 text-destructive hover:text-destructive"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Eliminar
          </Button>
        )}
      </div>

      <h2 className="text-xl font-bold text-foreground mb-6">
        {book ? 'Editar libro' : 'Nuevo libro'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Mi nuevo libro"
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="mi-nuevo-libro"
              required
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción breve *</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Una breve descripción del libro"
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="synopsis">Sinopsis</Label>
          <textarea
            id="synopsis"
            value={formData.synopsis}
            onChange={(e) => setFormData(prev => ({ ...prev, synopsis: e.target.value }))}
            placeholder="Sinopsis completa del libro..."
            rows={4}
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price">Precio (en centavos) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price_in_cents}
              onChange={(e) => setFormData(prev => ({ ...prev, price_in_cents: parseInt(e.target.value) || 0 }))}
              placeholder="999"
              required
              min="0"
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Precio actual: ${(formData.price_in_cents / 100).toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Orden de visualización</Label>
            <Input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
              placeholder="0"
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cover_image_url">URL de la portada</Label>
          <Input
            id="cover_image_url"
            type="url"
            value={formData.cover_image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, cover_image_url: e.target.value }))}
            placeholder="https://ejemplo.com/portada.jpg"
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="digital_file_url">URL del archivo digital</Label>
          <Input
            id="digital_file_url"
            type="url"
            value={formData.digital_file_url}
            onChange={(e) => setFormData(prev => ({ ...prev, digital_file_url: e.target.value }))}
            placeholder="https://ejemplo.com/libro.pdf"
            className="bg-background"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                is_published: e.target.checked,
                is_coming_soon: e.target.checked ? false : prev.is_coming_soon
              }))}
              className="w-4 h-4 rounded border-input"
            />
            <span className="text-sm">Publicado</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_coming_soon}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                is_coming_soon: e.target.checked,
                is_published: e.target.checked ? false : prev.is_published
              }))}
              className="w-4 h-4 rounded border-input"
            />
            <span className="text-sm">Próximamente</span>
          </label>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar libro'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
