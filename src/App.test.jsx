import { it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Subheader } from "./components/Subheader";
import { getUser } from "./components/User";

vi.mock("./components/User");

const testuser = {
  displayName: "Tester McTestington",
  email: "tester@test.com",
  jobs: {
    0: {
      company: "Test Company 0",
      jobTitle: "Test Title 1",
      appliedOn: "2022-12-01T00:00:00.000Z",
      status: "Applied",
      deadline: "",
    },
    1: {
      company: "Test Company 1",
      jobTitle: "Test Title 1",
      appliedOn: "2022-12-01T00:00:00.000Z",
      status: "Online Assessment",
      deadline: "2022-12-01T00:00:00.000Z",
    },
    2: {
      company: "Test Company 2",
      jobTitle: "Test Title 2",
      appliedOn: "2022-12-01T00:00:00.000Z",
      status: "Online Assessment",
      deadline: "2022-12-01T00:00:00.000Z",
    },
    3: {
      company: "Test Company 3",
      jobTitle: "Test Title 3",
      appliedOn: "2022-12-01T00:00:00.000Z",
      status: "Interview",
      deadline: "2022-12-01T00:00:00.000Z",
    },
  },
};

it("shows all job applications with the online assesment status", async () => {
  getUser.mockReturnValue([testuser]);
  await render(<Subheader jobs={testuser["jobs"]} user={testuser} />, {
    wrapper: BrowserRouter,
  });
  const oa_tab = screen.getByTestId("Online Assessment");
  await fireEvent.click(oa_tab);
  const oa_list = screen.getByTestId("Online Assessment List");
  expect(oa_list.textContent).not.toContain("Test Company 0");
  expect(oa_list.textContent).toContain("Test Company 1");
  expect(oa_list.textContent).toContain("Test Company 2");
  expect(oa_list.textContent).not.toContain("Test Company 4");
});
