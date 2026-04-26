"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { AdminAnalytics } from "@/components/organisms/AdminAnalytics";
import { AdminUsersTable } from "@/components/organisms/AdminUsersTable";
import { RecentCustomers } from "@/components/organisms/RecentCustomers";
import { TabNavigation } from "@/components/molecules/TabNavigation";
import { Spinner } from "@/components/atoms/Spinner";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { Alert } from "@/components/atoms/Alert";
import { useAnalytics, useAllUsers, useCustomers } from "@/lib/hooks/useAdmin";
import { authService } from "@/lib/services/authService";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { data: analytics, isLoading: analyticsLoading, error: analyticsError } = useAnalytics();
  const { data: allUsers, isLoading: usersLoading, error: usersError } = useAllUsers();
  const { data: customers, isLoading: customersLoading, error: customersError } = useCustomers();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    
    if (!currentUser) {
      router.push("/sign-in");
      return;
    }

    if (currentUser.role !== "admin") {
      router.push("/");
      return;
    }

    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    authService.signOut();
    setShowLogoutDialog(false);
    router.push("/sign-in");
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Spinner size="md" />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "All Users", count: allUsers?.length },
    { id: "customers", label: "Customers", count: customers?.length },
  ];

  return (
    <>
      <AdminLayout
        userName={user.full_name || "Admin"}
        userEmail={user.email}
        onLogout={handleLogout}
      >
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Manage your platform and monitor key metrics
            </p>
          </div>

          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "overview" && (
            <div className="space-y-8">
              {analyticsLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="md" />
                </div>
              ) : analyticsError ? (
                <Alert variant="error">
                  Failed to load analytics. Please try signing in again.
                </Alert>
              ) : analytics ? (
                <>
                  <AdminAnalytics data={analytics} />
                  {analytics.recent_customers && analytics.recent_customers.length > 0 && (
                    <RecentCustomers customers={analytics.recent_customers} />
                  )}
                </>
              ) : (
                <Alert variant="error">
                  No analytics data available
                </Alert>
              )}
            </div>
          )}

          {activeTab === "users" && (
            <div>
              {usersLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="md" />
                </div>
              ) : usersError ? (
                <Alert variant="error">
                  Failed to load users. Please try signing in again.
                </Alert>
              ) : allUsers ? (
                <AdminUsersTable
                  users={allUsers}
                  title="All Users"
                  description="Complete list of all registered users"
                />
              ) : (
                <Alert variant="error">
                  No users data available
                </Alert>
              )}
            </div>
          )}

          {activeTab === "customers" && (
            <div>
              {customersLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="md" />
                </div>
              ) : customersError ? (
                <Alert variant="error">
                  Failed to load customers. Please try signing in again.
                </Alert>
              ) : customers ? (
                <AdminUsersTable
                  users={customers}
                  title="Customers"
                  description="All customer accounts"
                />
              ) : (
                <Alert variant="error">
                  No customers data available
                </Alert>
              )}
            </div>
          )}
        </div>
      </AdminLayout>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}
