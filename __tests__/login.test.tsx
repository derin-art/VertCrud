import { render, screen } from "@testing-library/react";
import LoginInput from "../components/LoginInput";

describe("login button renders", () => {
  test("login button and input elements render", () => {
    render(<LoginInput></LoginInput>);

    const loginButton = screen.getByRole("button", { name: /login/i });

    const passwordInput = screen.getByPlaceholderText(/input password/i);

    const loginElements = [loginButton, passwordInput];
    expect(loginButton).toBeInTheDocument;
  });
});
