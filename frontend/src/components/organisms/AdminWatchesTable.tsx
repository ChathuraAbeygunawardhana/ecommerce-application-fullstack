import { useState } from "react";
import { DataTable } from "../molecules/DataTable";
import { Button } from "../atoms/Button";
import { Modal } from "../atoms/Modal";
import { WatchForm } from "../molecules/WatchForm";
import { ConfirmDialog } from "../molecules/ConfirmDialog";
import type { Watch, WatchCreate } from "@/lib/services/adminService";

interface AdminWatchesTableProps {
  watches: Watch[];
  onCreateWatch: (watch: WatchCreate) => Promise<void>;
  onUpdateWatch: (id: number, watch: WatchCreate) => Promise<void>;
  onDeleteWatch: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export function AdminWatchesTable({
  watches,
  onCreateWatch,
  onUpdateWatch,
  onDeleteWatch,
  isLoading,
}: AdminWatchesTableProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (watch: WatchCreate) => {
    setIsSubmitting(true);
    try {
      await onCreateWatch(watch);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create watch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (watch: Watch) => {
    setSelectedWatch(watch);
    setShowEditModal(true);
  };

  const handleUpdate = async (watch: WatchCreate) => {
    if (!selectedWatch) return;
    setIsSubmitting(true);
    try {
      await onUpdateWatch(selectedWatch.id, watch);
      setShowEditModal(false);
      setSelectedWatch(null);
    } catch (error) {
      console.error("Failed to update watch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (watch: Watch) => {
    setSelectedWatch(watch);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedWatch) return;
    setIsSubmitting(true);
    try {
      await onDeleteWatch(selectedWatch.id);
      setShowDeleteDialog(false);
      setSelectedWatch(null);
    } catch (error) {
      console.error("Failed to delete watch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "make_name",
      label: "Make",
    },
    {
      key: "model_name",
      label: "Model",
    },
    {
      key: "reference",
      label: "Reference",
      render: (value: string | null) => value || "—",
    },
    {
      key: "price_euro",
      label: "Price (EUR)",
      render: (value: number | null) => 
        value ? `€${value.toLocaleString()}` : "—",
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, row: Watch) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            title="Edit watch"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
            className="p-2 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            title="Delete watch"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Watches Management
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Manage your watch catalogue
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Watch
          </Button>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <DataTable
            columns={columns}
            data={watches}
            emptyMessage="No watches found"
          />
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Watch"
        size="xl"
      >
        <WatchForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedWatch(null);
        }}
        title="Edit Watch"
        size="xl"
      >
        <WatchForm
          watch={selectedWatch}
          onSubmit={handleUpdate}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedWatch(null);
          }}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Watch"
        message={`Are you sure you want to delete ${selectedWatch?.make_name} ${selectedWatch?.model_name}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedWatch(null);
        }}
      />
    </>
  );
}
