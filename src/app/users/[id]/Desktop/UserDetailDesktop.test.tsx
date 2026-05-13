import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useQueryGetUserDetail } from "@/modules/users/contexts/users";
import { useQueryGetAllPosts } from "@/modules/posts/contexts/posts";
import { useQueryGetAllTodos } from "@/modules/todos/contexts/todos";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import { DetailUserContext } from "../page";
import UsersDetailDesktop from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("@/components/MainLayout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">{children}</div>
  ),
}));

jest.mock("@/components/ToastProvider", () => ({
  useToast: jest.fn(),
}));

jest.mock("@/modules/users/contexts/users");
jest.mock("@/modules/posts/contexts/posts");
jest.mock("@/modules/todos/contexts/todos");

const mockUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
};

describe("UsersDetailDesktop Unit Test", () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();
  const mockShowToast = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });

    (useQueryGetUserDetail as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
    (useQueryGetAllPosts as jest.Mock).mockReturnValue({
      data: [{ id: 10, userId: 1, title: "Desktop Post A" }],
    });
    (useQueryGetAllTodos as jest.Mock).mockReturnValue({
      data: [{ id: 20, userId: 1, title: "Desktop Todo A", completed: false }],
    });
  });

  const renderComponent = () =>
    render(
      <DetailUserContext.Provider value={{ setUserDetail: jest.fn() }}>
        <UsersDetailDesktop />
      </DetailUserContext.Provider>,
    );

  it("renders user details and posts correctly on success", async () => {
    mockMutate.mockImplementation((_, { onSuccess }) => onSuccess(mockUser));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
      expect(screen.getByText("Desktop Post A")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Back To List/i));
    expect(mockBack).toHaveBeenCalled();
  });

  it("should call mutate on mount (loading state initiation)", () => {
    renderComponent();
    expect(mockMutate).toHaveBeenCalled();
  });

  it("shows toast and redirects on error", async () => {
    mockMutate.mockImplementation((_, { onError }) => onError());

    renderComponent();

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith("User Not Found!", "error");
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
