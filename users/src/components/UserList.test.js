import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "Jane", email: "jane@jane" },
    { name: "Sam", email: "sam@sam" },
  ];
  render(<UserList users={users} />);

  return {
    users,
  };
}

test("Render one row per user", () => {
  // Render the component
  renderComponent();

  // Find all rows in the table
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // Assertion:
  // Make sure that there is one row per user
  expect(rows).toHaveLength(2);
});

test("Render the email and name of each user", () => {
  // Render the component
  const { users } = renderComponent();

  // screen.logTestingPlaygroundURL();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});

/*
// Query Selector Usage
test("Render one row per user", () => {
    // Render the component
    const users = [
      { name: "Jane", email: "jane@jane" },
      { name: "Sam", email: "sam@sam" },
    ];
    const { container } = render(<UserList users={users} />);
  
    // Find all rows in the table
    // eslint-disable-next-line
    const rows = container.querySelectorAll("tbody tr");
  
    // Assertion:
    // Make sure that there is one row per user
    expect(rows).toHaveLength(2);
  });
*/
