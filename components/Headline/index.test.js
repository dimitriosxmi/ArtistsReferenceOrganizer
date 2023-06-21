import Headline from ".";
import { render, screen } from "@testing-library/react";

test("Rendered Headline contains text ARO", () => {
  render(<Headline>ARO</Headline>);
  const headline = screen.getByRole("heading", { level: 1 });
  expect(headline).toHaveTextContent("ARO");
});
