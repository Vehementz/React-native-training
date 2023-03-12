import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../UserContext";

describe("Homepage", () => {
  it("show a button to create a new blog", () => {
    render(
      <MockedProvider>
        <Home />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    const createBlogButton = screen.getByText(/Commencer mon blog/);
    expect(createBlogButton).toBeInTheDocument();
  });

  it("redirects to the form to create a blog if user is logged", () => {
    const user = {
      id: 1,
      email: "jane@mail.fr",
      password: "supersecret",
      role: "USER",
    };
    render(
      <UserContext.Provider value={user}>
        <MockedProvider>
          <Home />
        </MockedProvider>
      </UserContext.Provider>,
      { wrapper: BrowserRouter }
    );

    const createBlogButton = screen.getByText(/Commencer mon blog/);
    fireEvent.click(createBlogButton);
    expect(document.location.pathname).toEqual("/blog/create");
  });

  it("redirects to the login page if user is not logged", () => {
    const user = null;
    render(
      <UserContext.Provider value={user}>
        <MockedProvider>
          <Home />
        </MockedProvider>
      </UserContext.Provider>,
      { wrapper: BrowserRouter }
    );

    const createBlogButton = screen.getByText(/Commencer mon blog/);
    fireEvent.click(createBlogButton);
    expect(document.location.pathname).toEqual("/login");
  });
});
