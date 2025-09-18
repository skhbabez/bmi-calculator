import Hero from "./layouts/Hero/Hero";
import Results from "./layouts/Results/Results";
import Tips from "./layouts/Tips/Tips";

function App() {
  return (
    <main>
      <Hero />
      <section>
        <Results />
        <Tips />
      </section>
    </main>
  );
}

export default App;
