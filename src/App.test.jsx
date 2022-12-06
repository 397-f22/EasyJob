import { it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { getUser } from './components/User';

vi.mock('./components/User');

const mockUser = {    
  "displayName": "Pika Pikachu",
  "email": "pikachu@gmail.com", 
  "jobs": {
    "0": {
      "company": "Amazon",
      "jobTitle": "sde",
      "appliedOn": "2022-11-14T21:00:00.000Z",
      "status": "Applied",
      "deadline": ""
    },   
    "1": {
      "company": "Google",
      "jobTitle": "swe",
      "appliedOn": "2022-11-11T21:00:00.000Z",
      "status": "Interview ",
      "deadline": "2022-11-20T21:00:00.000Z"
    }
  }
}

it('creates mock user', async () => {
  getUser.mockReturnValue([mockUser]);
  await render(<App />);
  // const oaTab = screen.getByTestId("Online Assessment");
  // await fireEvent.click(oaTab);
  // // screen.getByText(/No jobs with this status/);
});