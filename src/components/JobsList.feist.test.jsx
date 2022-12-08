import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Subheader } from "./Subheader";
import { getUser } from "./User";

vi.mock("./User");

//mock user from JobList.yaur.test.jsx
const mockUser = {
  displayName: "Pika Pikachu",
  email: "pikachu@gmail.com",
  jobs: {
    0: {
      company: "Amazon",
      jobTitle: "sde",
      appliedOn: "2022-11-14T21:00:00.000Z",
      status: "Applied",
      deadline: "",
    },
    1: {
      company: "Google",
      jobTitle: "swe",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Interview",
      deadline: "2022-11-20T21:00:00.000Z",
    },
    2: {
      company: "Netflix",
      jobTitle: "pm",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Offered",
      deadline: "2022-11-20T21:00:00.000Z",
    },
    3: {
      company: "Apple",
      jobTitle: "swe",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Interview",
      deadline: "2022-11-20T21:00:00.000Z",
    },
    4: {
      company: "Bloomberg",
      jobTitle: "swe",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Interview",
      deadline: "2022-11-20T21:00:00.000Z",
    },
  },
};

describe("'Interview' tab displays all jobs with status 'Interview'", () => {
  it("All jobs with status 'Interview' should be displayed", async () => {
    getUser.mockReturnValue([mockUser]);
    await render(<Subheader jobs={mockUser["jobs"]} user={mockUser} />, {
      wrapper: BrowserRouter,
    });

    await fireEvent.click(screen.getByTestId("Interview"));
    const interviewList = screen.getByTestId("Interview List");
    expect(Object.values(interviewList)[1].children).toHaveLength(3);
    expect(interviewList.textContent).toContain("Google");
    expect(interviewList.textContent).toContain("Apple");
    expect(interviewList.textContent).toContain("Bloomberg");
  });
});
