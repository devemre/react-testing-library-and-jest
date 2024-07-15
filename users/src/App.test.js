import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("Can receive a new user amd show it on a list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  await user.click(nameInput);
  await user.keyboard("Jane");

  await user.click(emailInput);
  await user.keyboard("jane@jane");

  const button = screen.getByRole("button");

  await user.click(button);

  const name = screen.getByRole("cell", { name: "Jane" });
  const email = screen.getByRole("cell", { name: "jane@jane" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
