import { HeroSection } from '@/components/hero-section'
import { BooksGallery } from '@/components/books-gallery'
import { AuthorSection } from '@/components/author-section'
import { Footer } from '@/components/footer'

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <BooksGallery />
      <AuthorSection />
      <Footer />
    </main>
  )
}
