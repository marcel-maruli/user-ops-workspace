import { render, screen, fireEvent, within } from "@testing-library/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Table from "@/components/Table";
import UserList from "./components/userList";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: { lat: "-37.3159", lng: "81.1496" },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: { lat: "-68.6102", lng: "-47.0653" },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
  },
];

const mockPosts = [
  { userId: 1, id: 1, title: "Post 1", body: "body 1" },
  { userId: 1, id: 2, title: "Post 2", body: "body 2" },
];

const mockTodos = [
  { id: 201, userId: 1, title: "Todo 1", completed: true },
  { id: 202, userId: 1, title: "Todo 2", completed: false },
];

describe("UserList Task Alignment Tests", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/users");
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
      toString: () => "",
    });
  });

  it("should calculate and render derived activity signals (Posts, Completed, Pending)", () => {
    render(
      <UserList
        initialUsers={mockUsers}
        initialPosts={mockPosts}
        initialTodos={mockTodos}
      />,
    );

    const userRow = screen.getByText("Leanne Graham").closest("tr");
    if (!userRow) throw new Error("Row not found");

    const postCountElements = within(userRow).getAllByText("2");
    expect(postCountElements).toHaveLength(2);
    expect(within(userRow).getByText("C: 1")).toBeInTheDocument();
    expect(within(userRow).getByText("P: 1")).toBeInTheDocument();
  });

  it("should filter the list based on search input", () => {
    render(
      <UserList
        initialUsers={mockUsers}
        initialPosts={mockPosts}
        initialTodos={mockTodos}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Type a name...");
    fireEvent.change(searchInput, { target: { value: "Clementine" } });

    expect(screen.getByText("Clementine Bauch")).toBeInTheDocument();
    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
  });

  it("should apply alphabetical sorting (Name DESC) when selected", () => {
    render(
      <UserList
        initialUsers={mockUsers}
        initialPosts={mockPosts}
        initialTodos={mockTodos}
      />,
    );

    const sortSelect = screen.getByRole("combobox");
    fireEvent.change(sortSelect, { target: { value: "name-desc" } });

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Leanne Graham");
    expect(rows[2]).toHaveTextContent("Clementine Bauch");
  });

  it("should handle empty states gracefully when no users match search", () => {
    render(
      <UserList
        initialUsers={mockUsers}
        initialPosts={mockPosts}
        initialTodos={mockTodos}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Type a name...");
    fireEvent.change(searchInput, { target: { value: "Unknown User" } });

    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    expect(screen.queryByText("Clementine Bauch")).not.toBeInTheDocument();
  });

  it("should render loading state when isLoading prop is true", () => {
    render(<Table columns={[]} data={[]} isLoading={true} />);

    const loadingElements = screen.getAllByTestId("skeleton");

    expect(loadingElements.length).toBeGreaterThan(0);
    expect(loadingElements[0]).toBeInTheDocument();
  });
  it("should navigate to details on row click", () => {
    render(
      <UserList
        initialUsers={mockUsers}
        initialPosts={mockPosts}
        initialTodos={mockTodos}
      />,
    );

    const userCell = screen.getByText("Leanne Graham");
    fireEvent.click(userCell);

    expect(mockPush).toHaveBeenCalledWith("/users/1");
  });
});
