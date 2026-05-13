import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQueryGetAllUsers } from "@/modules/users/contexts/users";
import { useQueryGetAllPosts } from "@/modules/posts/contexts/posts";
import { useQueryGetAllTodos } from "@/modules/todos/contexts/todos";
import UsersMobile from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/modules/users/contexts/users");
jest.mock("@/modules/posts/contexts/posts");
jest.mock("@/modules/todos/contexts/todos");

const mockUsers = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" },
];
const mockPosts = [{ userId: 1, id: 10, title: "Post A" }];
const mockTodos = [{ userId: 1, id: 20, title: "Todo A", completed: true }];

describe("UsersMobile Test", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/users");
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
      toString: () => "",
    });

    (useQueryGetAllUsers as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });
    (useQueryGetAllPosts as jest.Mock).mockReturnValue({ data: mockPosts });
    (useQueryGetAllTodos as jest.Mock).mockReturnValue({ data: mockTodos });
  });

  it("should render users and correctly calculate derived signals", () => {
    render(<UsersMobile />);
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();

    expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
  });

  it("should filter users when typing in search input", () => {
    render(<UsersMobile />);
    const input = screen.getByPlaceholderText(/search name/i);

    fireEvent.change(input, { target: { value: "Ervin" } });

    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
  });
  it("should update URL when sorting is changed using test-id", () => {
    render(<UsersMobile />);

    const selectTrigger = screen.getByTestId("select-button");
    fireEvent.click(selectTrigger);

    const optionIdDesc = screen.getByTestId("select-option-id-desc");
    fireEvent.click(optionIdDesc);

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("sort=id-desc"),
    );
  });

  it("should show skeletons when isLoading is true", () => {
    (useQueryGetAllUsers as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { container } = render(<UsersMobile />);
    const skeletons = container.getElementsByClassName("animate-pulse");
    expect(skeletons.length).toBe(5);
  });

  it("should show empty state message when no users found", () => {
    render(<UsersMobile />);
    const input = screen.getByPlaceholderText(/search name/i);

    fireEvent.change(input, { target: { value: "User Tidak Ada" } });

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });
});
