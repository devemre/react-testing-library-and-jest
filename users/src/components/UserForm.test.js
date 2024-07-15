import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("It shows two inputs and a button", () => {
  // Render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion:
  // Make sure the component is doing what we expect
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("It calls onUserAdd when the form is submitted", async () => {
  const mock = jest.fn();
  // Render the component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate typing into the first input
  await user.click(nameInput);
  await user.keyboard("Jane");

  // Simulate typing into the second input
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  await user.click(button);

  // Assertion:
  // Make sure onUserAdd was called with the right arguments
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "Jane", email: "jane@jane.com" });
});

test("Empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("Jane");
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");

  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
