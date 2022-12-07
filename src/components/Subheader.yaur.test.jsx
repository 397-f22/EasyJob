import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Subheader } from "./Subheader";
import { getUser } from "./User";
import { removeJob } from "../utilities/firebase";

// According to Campuswire, "To see if your code handles messages from Firebase about values removed depends on how you do this.
// If all you do is listen for snapshots and display updated data, there is nothing to test beyond code you should already have to
// test that if data is X then Y is displayed." Hence, to test for deletion, all I could do was check for the correct display of data,
// and test with a mock and use the spying feature to make sure the removeJob function was called once

vi.mock("./User");
vi.mock("../utilities/firebase");

const mockUser1 = {
  displayName: "Pika Pikachu",
  email: "pikachu@gmail.com",
  jobs: {
    0: {
      company: "The Pokemon Company",
      jobTitle: "CTO",
      appliedOn: "2022-11-14T21:00:00.000Z",
      status: "Offered",
      deadline: "",
    },
    1: {
      company: "Niantic",
      jobTitle: "CEO",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Applied",
      deadline: "",
    },
  },
};

const mockUser2 = {
  displayName: "Pika Pikachu",
  email: "pikachu@gmail.com",
  jobs: {
    1: {
      company: "Niantic",
      jobTitle: "CEO",
      appliedOn: "2022-11-11T21:00:00.000Z",
      status: "Applied",
      deadline: "",
    },
  },
};

describe("Delete job", () => {
  it("should call removeJob function once", async () => {
    getUser.mockReturnValue([mockUser1]);
    await render(<Subheader jobs={mockUser1["jobs"]} user={mockUser1} />, {
      wrapper: BrowserRouter,
    });

    // check data is correctly displayed
    expect(await screen.getByTestId("Applied List").textContent).toContain(
      "Niantic"
    );
    expect(await screen.getByTestId("Online Assessment List").textContent).toBe(
      "No jobs with this status"
    );
    expect(await screen.getByTestId("Interview List").textContent).toBe(
      "No jobs with this status"
    );
    expect(await screen.getByTestId("Offered List").textContent).toContain(
      "The Pokemon Company"
    );
    expect(await screen.getByTestId("Their Loss List").textContent).toBe(
      "No jobs with this status"
    );

    // check calls correct Firebase function, correct number of times
    const deleteButton = screen.getByTestId("delete-Offered-0");
    await fireEvent.click(deleteButton);

    expect(removeJob).toHaveBeenCalledTimes(1);
  });

  it("should not be in any filtered job lists"),
    async () => {
      getUser.mockReturnValue([mockUser2]);
      await render(<Subheader jobs={mockUser2["jobs"]} user={mockUser2} />, {
        wrapper: BrowserRouter,
      });

      // check data is correctly displayed
      expect(await screen.getByTestId("Applied List").textContent).toContain(
        "Niantic"
      );
      expect(
        await screen.getByTestId("Online Assessment List").textContent
      ).toBe("No jobs with this status");
      expect(await screen.getByTestId("Interview List").textContent).toBe(
        "No jobs with this status"
      );
      expect(
        await screen.getByTestId("Offered List").textContent
      ).not.toContain("The Pokemon Company");
      expect(await screen.getByTestId("Their Loss List").textContent).toBe(
        "No jobs with this status"
      );
    };
});
