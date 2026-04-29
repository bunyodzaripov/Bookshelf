import Container from "@/components/ui/container";

const steps = [
  {
    number: "01",
    icon: "📚",
    title: "Add your book",
    description:
      "List your read books on the platform with photos and condition details.",
  },
  {
    number: "02",
    icon: "🔄",
    title: "Swap or sell",
    description: "Exchange with another reader or sell at an affordable price.",
  },
  {
    number: "03",
    icon: "🤝",
    title: "Meet & exchange",
    description:
      "Agree on a meeting spot in your city and complete the exchange.",
  },
  {
    number: "04",
    icon: "🌟",
    title: "Join community",
    description:
      "Discuss books, share reviews, and discover new titles with fellow readers.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20" id="how-it-works">
      <Container>
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Start exchanging books in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-border z-0" />
              )}

              <div className="relative z-10 bg-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors">
                <div className="text-xs font-medium text-accent mb-4">
                  {step.number}
                </div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
