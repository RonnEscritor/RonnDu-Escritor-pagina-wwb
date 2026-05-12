export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-12 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-cursive)' }}>RonnDu</p>
            <p className="text-sm text-muted-foreground">
              Narrativa que desafía lo convencional
            </p>
          </div>
          
          <nav className="flex gap-8">
            <a 
              href="#libros" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Libros
            </a>
            <a 
              href="#autor" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Autor
            </a>
            <a 
              href="mailto:contacto@ronndu.com" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contacto
            </a>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} RonnDu. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Los pagos son procesados de forma segura por Stripe.
          </p>
          <a 
            href="/admin/login" 
            className="inline-block mt-2 text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}
