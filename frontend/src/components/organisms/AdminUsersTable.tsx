import { DataTable } from "../molecules/DataTable";
import { Badge } from "../atoms/Badge";

interface User {
  id: number;
  full_name: string | null;
  email: string;
  role: string;
}

interface AdminUsersTableProps {
  users: User[];
  title: string;
  description?: string;
}

export function AdminUsersTable({ users, title, description }: AdminUsersTableProps) {
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "full_name",
      label: "Name",
      render: (value: string | null) => value || "—",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (value: string) => (
        <Badge variant={value === "admin" ? "primary" : "secondary"}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <DataTable
          columns={columns}
          data={users}
          emptyMessage="No users found"
        />
      </div>
    </div>
  );
}
