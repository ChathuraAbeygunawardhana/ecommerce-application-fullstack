import { DataTable } from "../molecules/DataTable";

interface Customer {
  id: number;
  full_name: string | null;
  email: string;
  is_active: boolean;
}

interface RecentCustomersProps {
  customers: Customer[];
}

export function RecentCustomers({ customers }: RecentCustomersProps) {
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
      key: "is_active",
      label: "Status",
      render: (value: boolean) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Recent Customers
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Latest customer registrations
        </p>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <DataTable
          columns={columns}
          data={customers}
          emptyMessage="No recent customers"
        />
      </div>
    </div>
  );
}
