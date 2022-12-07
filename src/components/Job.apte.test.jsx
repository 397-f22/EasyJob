import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Subheader } from "./Subheader";
import { getUser } from "./User";

vi.mock("./User");

const vedantUser = {
  displayName: "Vedant Apte",
  email: "vedantapte2023@u.northwestern.edu",
  jobs: {
    one: {
      appliedOn: "2022-12-05T00:00:00.000Z",
      company: "Amazon",
      deadline: "",
      jobTitle: "sde",
      status: "Applied",
    },
    two: {
      appliedOn: "2022-12-05T00:00:00.000Z",
      company: "Google",
      deadline: "2023-02-24T00:00:00.000Z",
      jobTitle: "swe",
      status: "Offer",
    },
  },
  photoURL:
    "https://lh3.googleusercontent.com/a/ALm5wu3luJM92ZbMKG0S1YP99Q4EMhsFcwITcVFyacO3=s96-c",
  uid: "1",
};

// Vedant Apte Test 2
describe("Tests to see that status appears in appropriate fields only", () => {
  it("Should display the status when we are on the All jobs filter", () => {
    getUser.mockReturnValue([vedantUser]);
    render(
      <div>
        <BrowserRouter>
          <Subheader jobs={vedantUser["jobs"]} user={vedantUser} />
        </BrowserRouter>
      </div>
    );
    act(() => {
      screen.getByTestId("all").click();
      const listOfJobs = screen.getByTestId("All List");
      expect(listOfJobs.textContent).toContain("Applied");
      expect(listOfJobs.textContent).toContain("Offer");
    });
  });
});
