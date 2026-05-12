'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, BookOpen } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const supabase = createClient()
    
    if (isSignUp) {
      // Sign up flow
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
            `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      setSuccess('Cuenta creada. Revisa tu correo para confirmar tu cuenta. Luego contacta al administrador para obtener permisos.')
      setLoading(false)
      return
    }

    // Login flow
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.')
      setLoading(false)
      return
    }

    // Check if user is admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('id')
      .single()

    if (!adminData) {
      await supabase.auth.signOut()
      setError('No tienes permisos de administrador. Contacta al propietario del sitio.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-accent/10 border border-border">
              <BookOpen className="w-6 h-6 text-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-cursive)' }}>
            RonnDu
          </h1>
          <p className="text-muted-foreground">Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ronndu.com"
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
              className="bg-background"
            />
            {isSignUp && (
              <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
              <p className="text-sm text-green-500">{success}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background hover:bg-foreground/90"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isSignUp ? 'Creando cuenta...' : 'Iniciando sesión...'}
              </>
            ) : (
              isSignUp ? 'Crear cuenta' : 'Iniciar sesión'
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
                setSuccess(null)
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <a href="/" className="hover:text-foreground transition-colors">
            Volver al sitio
          </a>
        </p>
      </div>
    </div>
  )
}
