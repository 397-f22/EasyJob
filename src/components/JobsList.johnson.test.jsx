import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Subheader } from "./Subheader";
import { getUser } from "./User";

vi.mock("./User");

const mockUser = {
    displayName: "Bruce Wayne",
    email: "brucewayne@gmail.com",
    jobs: {
        0: {
            company: "Wayne Enterprises",
            jobTitle: "CTO",
            appliedOn: "2022-12-07T21:00:00.000Z",
            status: "Their Loss",
            deadline: "2022-12-07T21:00:00.000Z",
        },
        1: {
            company: "Gotham City PD",
            jobTitle: "Lead Detective",
            appliedOn: "2022-12-07T21:00:00.000Z",
            status: "Applied",
            deadline: "2022-12-07T21:00:00.000Z",
        },
        2: {
            company: "Justice League",
            jobTitle: "Co-Detective",
            appliedOn:  "1776-09-20T21:00:00.000Z",
            status: "Offered",
            deadline:  "1776-09-20T21:00:00.000Z",
        },
        3: {
            company: "Central City City Hall",
            jobTitle: "Co-Detective",
            appliedOn:  "1776-09-20T21:00:00.000Z",
            status: "Offered",
            deadline: "1776-09-20T21:00:00.000Z",
        }
    },
};

//Sam Johnson Test #1
describe("'Offered' tab only displays jobs with status 'Offered'", () => {
    it("jobs should have status 'Offered'", async () => {
        getUser.mockReturnValue([mockUser]);
        await render(<Subheader jobs={mockUser["jobs"]} user={mockUser} />, {
            wrapper: BrowserRouter,
        });
        const offeredTab = screen.getByTestId("Offered");
        await fireEvent.click(offeredTab);
        const offeredJobs = screen.getByTestId("Offered List");
        expect(Object.values(offeredJobs)[1].children).toHaveLength(2);
    });
});

//Sam Johnson Test #2 
describe("Jobs in 'Applied' tab should have no deadline date", () => {
    it("jobs should have no deadline date", async () => {
        getUser.mockReturnValue([mockUser]);
        await render(<Subheader jobs={mockUser["jobs"]} user={mockUser} />, {
            wrapper: BrowserRouter,
        });
        const appliedTab = screen.getByTestId("Applied");
        await fireEvent.click(appliedTab);
        const appliedJobs = screen.getByTestId("Applied List");
        expect(appliedJobs.textContent).not.toContain("Due by");
    });
});

describe("Jobs in 'Their Loss' tab should have no deadline date", () => {
    it("jobs should have no deadline date", async () => {
        getUser.mockReturnValue([mockUser]);
        await render(<Subheader jobs={mockUser["jobs"]} user={mockUser} />, {
            wrapper: BrowserRouter,
        });
        const rejectTab = screen.getByTestId("Their Loss");
        await fireEvent.click(rejectTab);
        const rejectJobs = screen.getByTestId("Their Loss List");
        expect(rejectJobs.textContent).not.toContain("Due by");
    });
});