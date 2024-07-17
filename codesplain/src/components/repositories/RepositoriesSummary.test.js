import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("Displays the primary language of the repository", () => {
  const repository = {
    language: "JavaScript",
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };
  render(<RepositoriesSummary repository={repository} />);

  const language = screen.getByText("JavaScript");
  expect(language).toBeInTheDocument();
});

test("Displays information about the repository", () => {
  const repository = {
    language: "JavaScript",
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };
  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});
