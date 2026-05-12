import { BookOpen } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-accent/10 border border-border">
            <BookOpen className="w-8 h-8 text-foreground" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance" style={{ fontFamily: 'var(--font-cursive)' }}>
          RonnDu
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto mb-8 text-balance">
          Narrativa que desafía lo convencional
        </p>
        
        <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Historias que exploran la complejidad humana con una voz auténtica y contemporánea. 
          Cada palabra, un paso hacia lo inesperado.
        </p>
        
        <a 
          href="#libros" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors"
        >
          Explorar mis libros
        </a>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
