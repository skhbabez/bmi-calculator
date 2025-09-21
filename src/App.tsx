import Hero from "./layouts/Hero/Hero";
import Limitations from "./layouts/Limitations/Limitations";
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
      <Limitations />
    </main>
  );
}

export default App;
