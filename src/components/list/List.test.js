import { render, screen, act } from "@testing-library/react";
import List from "./List";
import { BrowserRouter } from "react-router-dom";
jest.useFakeTimers();

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
let getList;
beforeEach(() => {
  getList = jest.fn();
});
describe("It should render component", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("renders spinner as default with its styles and title text because api has been dispatched but waiting for results", () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveStyle("display: block", "margin: 50% auto");
    const title = screen.getByText("title");
    expect(title).toBeInTheDocument();
  });
  test("renders component and list characters with its information", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          char_id: 2,
          name: "Jesse Pinkman",
          birthday: "09-24-1984",
          occupation: ["Meth Dealer"],
          img: "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441",
          status: "Alive",
          nickname: "Cap n' Cook",
          appearance: [1, 2, 3, 4, 5],
          portrayed: "Aaron Paul",
          category: "Breaking Bad",
          better_call_saul_appearance: [],
        },
        {
          char_id: 9,
          name: "Gustavo Fring",
          birthday: "Unknown",
          occupation: [
            "Los-Pollos co-Founder",
            "Philanthropist",
            "Cartel Leader",
          ],
          img: "https://vignette.wikia.nocookie.net/breakingbad/images/1/1f/BCS_S4_Gustavo_Fring.jpg/revision/latest?cb=20180824195925",
          status: "Deceased",
          nickname: "Gus",
          appearance: [2, 3, 4],
          portrayed: "Giancarlo Esposito",
          category: "Breaking Bad, Better Call Saul",
          better_call_saul_appearance: [3, 4, 5],
        },
      ]),
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <List />
        </BrowserRouter>
      );
    });
    const resultNameGustavo = screen.getByText("Gustavo Fring");
    const resultNameJesse = screen.getByText("Jesse Pinkman");
    const resultCategory = screen.getByText("Breaking Bad");
    expect(resultNameGustavo).toBeInTheDocument;
    expect(resultNameJesse).toBeInTheDocument();
    expect(resultCategory).toBeInTheDocument();
  });
});
