import { async } from "@firebase/util";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginInput from "../components/LoginInput";
import CreateItemMenu from "../components/CreateItemMenu";

describe("login button renders", () => {
  test("login button and input elements render", async () => {
    render(<LoginInput></LoginInput>);

    const loginButton = screen.getByRole("button", { name: /login/i });
    const newUserButton = screen.getByRole("button", { name: /New User/i });
    const signUpButton = screen.findByRole("button", { name: /SignUp/i });
    expect(loginButton).toBeInTheDocument;
    await user.click(newUserButton);
    const loginElements = [loginButton];
    expect(signUpButton).toBeInTheDocument;
  });
  test("sign up menu renders when user clicks newUser button", async () => {
    render(<LoginInput></LoginInput>);
    const newUserButton = screen.getByRole("button", { name: /New User/i });
    const signUpButton = screen.findByRole("button", { name: /SignUp/i });
    await user.click(newUserButton);
    expect(signUpButton).toBeInTheDocument;
  });
});
