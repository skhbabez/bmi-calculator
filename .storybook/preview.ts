import type { Preview } from "@storybook/react-vite";
import "../src/index.css";
const frontendMentorViewports = {
  desktop1440: {
    name: "desktop1440",
    styles: {
      width: "1440px",
      height: "900px",
    },
  },
  desktop1024: {
    name: "desktop1024",
    styles: {
      width: "1024px",
      height: "900px",
    },
  },
  tablet: {
    name: "tablet",
    styles: {
      width: "768px",
      height: "900px",
    },
  },
  mobile375: {
    name: "mobile375",
    styles: {
      width: "375px",
      height: "900px",
    },
  },
  mobile500: {
    name: "mobile500",
    styles: {
      width: "500px",
      height: "900px",
    },
  },
};
const preview: Preview = {
  parameters: {
    viewport: {
      options: {
        ...frontendMentorViewports,
      },
    },
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
