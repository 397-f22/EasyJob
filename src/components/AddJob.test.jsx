import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Subheader } from "./Subheader";
import { addJob } from "../utilities/firebase";
import { getUser } from "./User";

vi.mock("./User");
vi.mock("../utilities/firebase.js");

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
      status: "Interview ",
      deadline: "2022-11-20T21:00:00.000Z",
    },
    2: {
      company: "Netflix",
      jobTitle: "pm",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Offered ",
      deadline: "2022-11-20T21:00:00.000Z",
    },
    3: {
      company: "Apple",
      jobTitle: "swe",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Their Loss",
      deadline: "2022-11-20T21:00:00.000Z",
    },
    4: {
      company: "Bloomberg",
      jobTitle: "swe",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Their Loss",
      deadline: "2022-11-20T21:00:00.000Z",
    },
  },
};

describe("Adding a job", () => {
  it("should call 'addJob' when the form is submitted   ", async () => {
    getUser.mockReturnValue([mockUser]);
    render(<Subheader jobs={mockUser["jobs"]} user={mockUser} />, {
      wrapper: BrowserRouter,
    });
    // const ajTab = screen.getByTestId("add");
    const ajTab = screen.getByTestId("addJobButton");
    fireEvent.click(ajTab);
    const submitButton = screen.getByTestId("addJobSubmit");
    // console.log(submitButton);
    fireEvent.click(submitButton);
    expect(addJob).toHaveBeenCalledTimes(1);
  });
});
