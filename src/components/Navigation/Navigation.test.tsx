import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Компонент навигации", () => {
    it("Должен отрендерить картинку с логотипом", () => {
      render(<Navigation />);
      const image = screen.getByAltText("Логотип скайпро музыка");

      expect(image).toBeInTheDocument();
    });
  });