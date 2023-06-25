import { render, screen } from "@testing-library/react";
// Components
import Headline from ".";

test("Rendered Headline contains text ARO", () => {
  render(<Headline>ARO</Headline>);
  const headline = screen.getByRole("heading", { level: 1 });
  expect(headline).toHaveTextContent("ARO");
});
