import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Subheader } from "./Subheader";
import { getUser } from "./User";

vi.mock("./User");

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

describe("No jobs with status 'Online Assessment'", () => {
    it("should return 'No jobs with this status'", async () => {
        getUser.mockReturnValue([mockUser]);
        await render(<Subheader jobs={mockUser["jobs"]} user={mockUser} />, {
            wrapper: BrowserRouter,
        });
        const oaTab = screen.getByTestId("Online Assessment");
        await fireEvent.click(oaTab);
        const oaList = screen.getByTestId("Online Assessment List");
        expect(oaList.textContent).toBe("No jobs with this status");
    });
});

describe("'Their Loss' tab only displays jobs with status 'Their Loss'", () => {
    it("jobs should have status 'Their Loss'", async () => {
        getUser.mockReturnValue([mockUser]);
        await render(<Subheader jobs={mockUser["jobs"]} user={mockUser} />, {
            wrapper: BrowserRouter,
        });
        const tlTab = screen.getByTestId("Their Loss");
        await fireEvent.click(tlTab);
        const tlList = screen.getByTestId("Their Loss List");
        expect(Object.values(tlList)[1].children).toHaveLength(2);
    });
});
