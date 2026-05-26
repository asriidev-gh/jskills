"use client";

import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react";
import packagesData from "@/data/packages.json";
import type { TrainingPackage } from "@/types/clinic";

interface Registrant {
  _id: string;
  name: string;
  age: string;
  contact: string;
  email: string;
  skillLevel: string;
  position: string;
  packageName: string;
  packagePriceLabel: string;
  payment: string;
  notes: string;
  createdAt: string | null;
}

type SortField =
  | "name"
  | "email"
  | "age"
  | "packageName"
  | "skillLevel"
  | "position"
  | "payment"
  | "createdAt";

const packages = packagesData as TrainingPackage[];

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function RegistrantsPage() {
  const [users, setUsers] = useState<Registrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [packageId, setPackageId] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [payment, setPayment] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: "20",
      sortBy,
      sortDir,
    });
    if (name.trim()) params.set("name", name.trim());
    if (email.trim()) params.set("email", email.trim());
    if (contact.trim()) params.set("contact", contact.trim());
    if (packageId) params.set("packageId", packageId);
    if (skillLevel) params.set("skillLevel", skillLevel);
    if (payment) params.set("payment", payment);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);
    return params.toString();
  }, [page, sortBy, sortDir, name, email, contact, packageId, skillLevel, payment, dateFrom, dateTo]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/registrants?${buildQuery()}`);
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      setUsers(json.users);
      setTotalPages(json.totalPages);
      setTotal(json.total);
      setDeleteEnabled(Boolean(json.deleteEnabled));
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [buildQuery]);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    void load();
  };

  const handleDelete = async (user: Registrant) => {
    const result = await Swal.fire({
      title: "Delete registrant?",
      html: `Remove <strong>${user.name}</strong> from the database? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setDeletingId(user._id);
    try {
      const res = await fetch(`/api/dashboard/registrants/${user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1500,
        showConfirmButton: false,
      });
      void load();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const clearFilters = () => {
    setName("");
    setEmail("");
    setContact("");
    setPackageId("");
    setSkillLevel("");
    setPayment("");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  const SortTh = ({ field, label }: { field: SortField; label: string }) => (
    <th className="px-3 py-3 text-left">
      <button
        type="button"
        onClick={() => toggleSort(field)}
        className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-orange-700"
      >
        {label}
        {sortBy === field ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
      </button>
    </th>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-black uppercase text-gray-900">
          Registrants
        </h1>
        <p className="mt-1 text-sm text-gray-500">{total} enrollment(s) total</p>
        {deleteEnabled && (
          <p className="mt-1 text-xs font-medium text-amber-700">
            Local dev only — delete is enabled for testing
          </p>
        )}
      </div>

      <form
        onSubmit={applyFilters}
        className="grid gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
      >
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        />
        <input
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        />
        <select
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        >
          <option value="">All packages</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        >
          <option value="">All skill levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advance">Advance</option>
        </select>
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        >
          <option value="">All payments</option>
          <option value="gcash">GCash</option>
          <option value="bpi">BPI</option>
          <option value="cash">Cash</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
        />
        <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
          <button
            type="submit"
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
          </div>
        ) : users.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">No registrants found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <SortTh field="name" label="Name" />
                  <SortTh field="age" label="Age" />
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                    Contact
                  </th>
                  <SortTh field="email" label="Email" />
                  <SortTh field="packageName" label="Package" />
                  <SortTh field="skillLevel" label="Skill" />
                  <SortTh field="position" label="Position" />
                  <SortTh field="payment" label="Payment" />
                  <SortTh field="createdAt" label="Submitted" />
                  {deleteEnabled && (
                    <th className="px-3 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/80">
                    <td className="px-3 py-3 font-medium text-gray-900">{user.name}</td>
                    <td className="px-3 py-3 text-gray-600">{user.age}</td>
                    <td className="px-3 py-3 text-gray-600">{user.contact}</td>
                    <td className="px-3 py-3 text-gray-600">{user.email}</td>
                    <td className="px-3 py-3 text-gray-600">
                      <div>{user.packageName}</div>
                      <div className="text-xs text-orange-700">{user.packagePriceLabel}</div>
                    </td>
                    <td className="px-3 py-3 text-gray-600">{user.skillLevel}</td>
                    <td className="px-3 py-3 text-gray-600">{user.position}</td>
                    <td className="px-3 py-3 text-gray-600">{user.payment}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    {deleteEnabled && (
                      <td className="px-3 py-3 text-right">
                        <button
                          type="button"
                          disabled={deletingId === user._id}
                          onClick={() => void handleDelete(user)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
                          aria-label={`Delete ${user.name}`}
                        >
                          {deletingId === user._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
