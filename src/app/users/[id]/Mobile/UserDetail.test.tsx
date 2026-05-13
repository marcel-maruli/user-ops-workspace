import { render, screen, waitFor } from "@testing-library/react";
import { useQueryGetUserDetail } from "@/modules/users/contexts/users";
import { useQueryGetAllPosts } from "@/modules/posts/contexts/posts";
import { useQueryGetAllTodos } from "@/modules/todos/contexts/todos";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import UserDetailMobile from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
  usePathname: jest.fn(),
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
  company: { name: "Renos.id", catchPhrase: "Fast & Furious" },
};

describe("UserDetailMobile Task Alignment", () => {
  const mockPush = jest.fn();
  const mockShowToast = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useToast as jest.Mock).mockReturnValue({ showToast: mockShowToast });
    (useQueryGetUserDetail as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
    (useQueryGetAllPosts as jest.Mock).mockReturnValue({
      data: [{ userId: 1, title: "Post 1", id: 1 }],
    });
    (useQueryGetAllTodos as jest.Mock).mockReturnValue({
      data: [{ userId: 1, title: "Todo 1", completed: true, id: 1 }],
    });
    (usePathname as jest.Mock).mockReturnValue("/users/1");
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("should show skeleton while loading data", () => {
    render(<UserDetailMobile />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toBeInTheDocument();
  });

  it("should render user details correctly after success mutate", async () => {
    mockMutate.mockImplementation((_, { onSuccess }) => onSuccess(mockUser));

    render(<UserDetailMobile />);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
      expect(screen.getByText("@Bret")).toBeInTheDocument();
      expect(screen.getByText("Renos.id")).toBeInTheDocument();
    });

    expect(screen.getByText("Post 1")).toBeInTheDocument();
  });

  it("should show toast and redirect to home on error", async () => {
    mockMutate.mockImplementation((_, { onError }) => onError());

    render(<UserDetailMobile />);

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith("User Not Found!", "error");
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
