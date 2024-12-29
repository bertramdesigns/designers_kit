import { render } from "@solidjs/testing-library";
import { describe, test, expect } from "vitest";
import { Test } from "./test";

describe("<Test />", () => {
  test("it will render a div with the text 'Test'", () => {
    const { getByText } = render(() => <Test />);
    expect(getByText("Test")).toBeInTheDocument();
  });
});
