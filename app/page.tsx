import Decorations from "./_components/decorations";
import Header from "./_components/header";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <>
      <Decorations leaveAfter="hero" />
      <Header />
      <main className="grid">
        <Hero />
        {/* Placeholder for the sections still to come. */}
        <div aria-hidden className="h-[200svh]" />
      </main>
    </>
  );
}
