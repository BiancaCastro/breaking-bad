import { render, screen, act, fireEvent } from "@testing-library/react";
import React from "react";
import Detail from "./Detail";
jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({});
});
afterEach(() => {
  jest.restoreAllMocks();
});
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
let fetchData;
let fetchQuote;
beforeEach(() => {
  fetchData = jest.fn();
  fetchQuote = jest.fn();
});
describe("It should render detail component", () => {
  test("should renders information text when no data comes from api", async () => {
    await act(async () => {
      render(<Detail />);
    });
    const result = screen.getByText(
      "Something has happening, let us check again"
    );
    expect(result).toBeInTheDocument();
  });
  test("should renders card with all character details when we have received data from api and disabled button when no quote", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          char_id: 3,
          name: "Skyler White",
          birthday: "08-11-1970",
          occupation: [
            "House wife",
            "Book Keeper",
            "Car Wash Manager",
            "Taxi Dispatcher",
          ],
          img: "https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg",
          status: "Alive",
          nickname: "Sky",
          appearance: [1, 2, 3, 4, 5],
          portrayed: "Anna Gunn",
          category: "Breaking Bad",
          better_call_saul_appearance: [],
        },
      ]),
    });
    await act(async () => {
      render(<Detail />);
    });
    const resultName = screen.getByText("Skyler White");
    expect(resultName).toBeInTheDocument();
    const noQuote = screen.getByText(
      "Opps! I don't have a quote or I am having problems to retrieve it"
    );
    expect(noQuote).toBeInTheDocument();
    expect(resultName).toBeInTheDocument();
    expect(screen.getByText(/random_quote/i).closest("button")).toBeDisabled();
  });
  test("should render random quote when character has it and button as enable", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          char_id: 3,
          name: "Skyler White",
          birthday: "08-11-1970",
          occupation: [
            "House wife",
            "Book Keeper",
            "Car Wash Manager",
            "Taxi Dispatcher",
          ],
          img: "https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg",
          status: "Alive",
          nickname: "Sky",
          appearance: [1, 2, 3, 4, 5],
          portrayed: "Anna Gunn",
          category: "Breaking Bad",
          better_call_saul_appearance: [],
          quote: "There's no honor among thieves... Except for us of course.",
        },
      ]),
    });
    await act(async () => {
      render(<Detail />);
    });
    const quote = screen.getByText(
      "There's no honor among thieves... Except for us of course."
    );
    expect(quote).toBeInTheDocument();
    const button = screen.getByText(/random_quote/i).closest("button");
    expect(button).not.toBeDisabled();
  });
});
