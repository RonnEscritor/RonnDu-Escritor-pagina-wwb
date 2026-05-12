import Image from 'next/image'

export function AuthorSection() {
  return (
    <section id="autor" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Author image */}
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden bg-muted">
              <Image
                src="/images/author.png"
                alt="RonnDu - Autor"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-foreground/10 rounded-lg -z-10" />
          </div>
          
          {/* Author bio */}
          <div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
              Sobre el autor
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ fontFamily: 'var(--font-cursive)' }}>
              RonnDu
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Escritor independiente con una pasión por explorar los límites de la narrativa contemporánea. 
                Mi trabajo se centra en crear historias que desafían las convenciones mientras mantienen 
                una conexión profunda con la experiencia humana.
              </p>
              
              <p>
                Creo en el poder de las palabras para transformar, provocar y conectar. Cada libro que 
                escribo es una invitación a ver el mundo desde una perspectiva diferente, a cuestionar 
                lo establecido y a encontrar belleza en lo inesperado.
              </p>
              
              <p>
                Mi visión como escritor es crear obras que permanezcan con el lector mucho después de 
                cerrar la última página. Historias que generen conversaciones, que inspiren reflexión 
                y que, sobre todo, entretengan y emocionen.
              </p>
            </div>
            
            {/* Social or contact */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Conecta conmigo
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="text-foreground hover:text-foreground/70 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="text-foreground hover:text-foreground/70 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:contacto@ronndu.com" 
                  className="text-foreground hover:text-foreground/70 transition-colors"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
