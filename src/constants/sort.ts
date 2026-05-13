
export const SORT_GROUPS = [
  {
    label: "Alphabetical",
    options: [
      { value: "name-asc", label: "Name (A-Z)" },
      { value: "name-desc", label: "Name (Z-A)" },
    ],
  },
  {
    label: "Sequence",
    options: [
      { value: "id-asc", label: "ID (Low to High)" },
      { value: "id-desc", label: "ID (High to Low)" },
    ],
  },
  {
    label: "Task Status",
    options: [
      { value: "pendingTodos-asc", label: "Pending (Least First)" },
      { value: "pendingTodos-desc", label: "Pending (Most First)" },
      { value: "completedTodos-asc", label: "Completed (Least First)" },
      { value: "completedTodos-desc", label: "Completed (Most First)" },
    ],
  },
];