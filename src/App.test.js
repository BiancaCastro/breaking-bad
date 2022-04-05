import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: key => key }),
}));
test('renders component and its title of Breaking Bad', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const title= screen.getByText("Breaking Bad");
expect(title).toBeInTheDocument()
});
