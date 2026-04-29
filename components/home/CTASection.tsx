import Link from "next/link";
import Container from "@/components/ui/container";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <Container>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">
            Start today — it`s free
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8">
            Thousands of readers are waiting for you
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/register"
              className="bg-accent text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-accent/90 transition-colors text-center"
            >
              Get started ↗
            </Link>
            <Link
              href="/catalog"
              className="border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-full text-sm hover:border-primary-foreground/60 transition-colors text-center"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
