# Frontend Mentor - Body Mass Index Calculator solution

This is a solution to the [Body Mass Index Calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/body-mass-index-calculator-brrBkfSz1T). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- Select whether they want to use metric or imperial units
- Enter their height and weight
- See their BMI result, with their weight classification and healthy weight range
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [https://github.com/skhbabez/bmi-calculator](https://github.com/skhbabez/bmi-calculator)
- Live Site URL: [Ahttps://skhbabez.github.io/bmi-calculator/](https://skhbabez.github.io/bmi-calculator/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Storybook](https://storybook.js.org/) - JS library
- [Typescript](https://www.typescriptlang.org/)
- [vitest](https://vitest.dev/) - JS library
- [clsx](https://github.com/lukeed/clsx#readme) - JS library
- [vite](https://vite.dev/)

### What I learned

I wanted to dabble in testing for this project and decided to start with some simple unit tests. I used vitest in the past and wanted to revisit this library first to refresh my knowledge. One thing that was especially difficult was setting up a new vitest configuration for unit tests, since storybook only came woth one for story files.

```ts
describe("calculateBmi", () => {
  test("for 80kg and 1.85m", () => {
    expect(calculateBmi(80, 1.85)).toBeCloseTo(23.4, 1);
  });

  test.each([
    [80, 0],
    [0, 1.85],
    [80, -1],
    [-1, 1.85],
    [0 - 1, -1],
  ])("Expect Exception for %ikg and %im", (weight, height) => {
    expect(() => calculateBmi(weight, height)).toThrowError(
      /Weight and Height have to be greater than zero/
    );
  });
});
```

I realized I did not fully understand componentprops, as it does include children and refs. This forced me to explore some typescript helpers like omit, making my code more conscise in the process.

```tsx
const SelectionButton = ({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type" | "children">) => {
  return (
    <input
      className={clsx(styles.selectionbutton, className)}
      type="radio"
      {...props}
    />
  );
};
```

I struggled initially to synchronize the metric and imperial inputs. I eventually abandoned the idea to use one single state for both and just updated them in parallel. I did use useRef though so i could treat two input fields as one. I might also come back to this to implement some better popovers for the inpt fields. This aslo gave me an opprtunity to practice typescript overloads for my validation.

```tsx
const CalculatorCard = () => {
  const [unit, setUnit] = useState<unitSystem>("metric");
  const [feet, setFeet] = useState<number>();
  const [inches, setInches] = useState<number>();
  const [stone, setStone] = useState<number>();
  const [pound, setPound] = useState<number>();
  const [cm, setCm] = useState<number>();
  const [kilograms, setKilograms] = useState<number>();

const metricHeightChange = (height: number) => {
    if (heightValidation(height)) {
      const { feet, inches } = toImperialHeight(height / 100);
      setFeet(Math.round(feet));
      setInches(Math.round(inches));
      setCm(Math.round(height));
    }
  };
  const metricWeightChange = (weight: number) => {
    if (weightValidation(weight)) {
      const { stone, pound } = toImperialWeight(weight);
      setStone(Math.round(stone));
      setPound(Math.round(pound));
      setKilograms(Math.round(weight));
    }
  };

  const imperialWeightChange = (stone: number, pound: number) => {
    if (weightValidation(stone, pound)) {
      const weight = toMetricWeight(stone, pound);
      setStone(Math.round(stone));
      setPound(Math.round(pound));
      setKilograms(Math.round(weight));
    }
  };

  const imperialHeightChange = (feet: number, inches: number) => {
    if (heightValidation(feet, inches)) {
      const height = toMetricHeight(feet, inches);
      setFeet(Math.round(feet));
      setInches(Math.round(inches));
      setCm(Math.round(height) * 100);
    }
  };
  return (
    <form className={styles.card} noValidate aria-labelledby={formId}>
      {unit === "metric" ? (
        <MetricView
          height={cm}
          weight={kilograms}
          onHeightChange={metricHeightChange}
          onWeightChange={metricWeightChange}
        />
      ) : (
        <ImperialView
          feet={feet}
          inches={inches}
          stone={stone}
          pound={pound}
          onHeightChange={imperialHeightChange}
          onWeightChange={imperialWeightChange}
        />
      )}
  );
};

```

Css wise I am especially proud of my grid implementation. I used the Layout guide on the figma file to calculate out the actual amount of columns i need to align the different cards on desktop exactly.

```css
@media (min-width: 1440px) {
  .limitations {
    position: relative;
    &::before {
      content: url("images/pattern-curved-line-right.svg");
      position: absolute;
      top: 222px;
      left: 161px;
    }
  }
  .description {
    position: absolute;
    text-align: start;
    max-inline-size: 564px;
  }

  .limitationslist {
    justify-content: end;
    grid-template-columns: repeat(10, 67.33px);
    gap: 2rem;
    & li:nth-child(1) {
      grid-column: 6 / 10;
    }
    & li:nth-child(2) {
      grid-column: 3 / 7;
    }
    & li:nth-child(3) {
      grid-column: 7 / 11;
    }
    & li:nth-child(4) {
      grid-column: 1 / 5;
    }
    & li:nth-child(5) {
      grid-column: 5 / 9;
    }
  }
}
```

### Continued development

For the next Project I want to dive deeper into Testing with Storybook. I mostly revisited vitest her to see how it integrates into it. I personally struggled the most keeping track of accessibility, in terms of semantic layouts, due to reacts component based structure. Furthermore, setting a general page margin was quite difficult due to all the different overflowing backgrounds. I will explore some different strategies to better manage this in my next project. While not required, the current implementationm does not feel descriptive enough as the constraints on the fields are not well communicated. Especially from an accessibility standpoint, this I might have to improve. I am also not sure igf these constraints just might be to restrictive.

### Useful resources

- [Baseline alignment](https://stackoverflow.com/questions/69037561/how-to-align-baselines-for-absolutely-positioned-html-element) - Useful trick to get the image moving into the screen right.
- [Typescript utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) - Great overview of Typescript utility types.
- [Border radius overlap explanantions](https://css-tricks.com/what-happens-when-border-radii-overlap/) - This helped me better understand how the 999px trick works
- [BMI Resource](https://en.wikipedia.org/wiki/Body_mass_index) - i used this as reference for the BMI messages
