import Container from "@/components/ui/container";

const stats = [
  { number: "2,400+", label: "Active books" },
  { number: "850+", label: "Readers" },
  { number: "1,200+", label: "Exchanges" },
  { number: "12+", label: "Cities" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-border py-12">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-foreground mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
