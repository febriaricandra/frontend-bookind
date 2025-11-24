import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import api from '@/lib/apiClient';

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '' });
  const [membershipType, setMembershipType] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user?.role === 'ADMIN') fetchUsers();
  }, [user, page]);

  async function fetchUsers() {
    setLoading(true);
    const res = await api.get(`/users?page=${page}&limit=${limit}`);
    console.log("fetched users", res.data);
    setUsers(res.data.users || []);
    setLoading(false);
  }

  async function fetchUserDetail(id: string) {
    setLoading(true);
    const res = await api.get(`/users/${id}`);
    console.log("fetched user detail", res.data);
    const userData = res.data || {};
    setSelectedUser({
      ...userData,
      membershipType: userData.membershipType || '',
      membershipActive: userData.membershipActive ?? false,
    });
    setEditData({ name: userData.name || '', email: userData.email || '' });
    setMembershipType(userData.membershipType || '');
    setLoading(false);
    setModalOpen(true);
  }

  async function updateUser(id: string) {
    setLoading(true);
    await api.put(`/users/${id}`, editData);
    fetchUserDetail(id);
    setLoading(false);
  }

  async function updateMembership(id: string) {
    setLoading(true);
    await api.post(`/users/${id}/membership`, { type: membershipType });
    fetchUserDetail(id);
    setLoading(false);
  }

  if (user?.role !== 'ADMIN') {
    return <div className="p-8 text-center text-lg text-red-600">Akses hanya untuk admin.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div className="mb-4">Loading...</div>}
          <div>
            <div className="mb-4 font-semibold">Daftar User</div>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-3 py-2 text-left">Nama</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b">
                      <td className="px-3 py-2">{u.name}</td>
                      <td className="px-3 py-2">{u.email}</td>
                      <td className="px-3 py-2 text-center">
                        <Button size="sm" onClick={() => fetchUserDetail(u.id)}>Detail</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
              <Button size="sm" onClick={() => setPage(page + 1)}>Next</Button>
            </div>
          </div>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="bg-white border border-gray-200 shadow-xl">
              <DialogHeader>
                <DialogTitle>Detail User</DialogTitle>
              </DialogHeader>
              {loading ? (
                <div className="py-8 text-center">Loading...</div>
              ) : selectedUser ? (
                <div>
                  <div className="mb-2 font-semibold">Informasi User</div>
                  <div className="mb-2">Nama: <span className="font-medium">{selectedUser.name}</span></div>
                  <div className="mb-2">Email: <span className="font-medium">{selectedUser.email}</span></div>
                  <div className="mb-2">Alamat: <span className="font-medium">{selectedUser.address || '-'}</span></div>
                  <div className="mb-2">No. HP: <span className="font-medium">{selectedUser.phoneNumber || '-'}</span></div>
                  <div className="mb-2">Membership Aktif: <span className="font-medium">{selectedUser.membershipActive ? 'Ya' : 'Tidak'}</span></div>
                  <div className="mb-2">Tipe Membership: <span className="font-medium">{selectedUser.membershipType || '-'}</span></div>
                  <div className="mb-2">Kadaluarsa: <span className="font-medium">{selectedUser.membershipExpiresAt ? new Date(selectedUser.membershipExpiresAt).toLocaleDateString() : '-'}</span></div>
                  <div className="mb-4 font-semibold">Aktifkan Membership</div>
                  <div className="mb-2 flex gap-2 items-center">
                    <select
                      value={membershipType}
                      onChange={e => setMembershipType(e.target.value)}
                      className="bg-white text-black border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">Pilih Durasi</option>
                      <option value="1bulan">1 Bulan</option>
                      <option value="3bulan">3 Bulan</option>
                      <option value="6bulan">6 Bulan</option>
                    </select>
                    <Button size="sm" onClick={() => updateMembership(selectedUser.id)}>Aktifkan Membership</Button>
                  </div>
                  <Button size="sm" variant="outline" className="mt-4" onClick={() => setModalOpen(false)}>Tutup</Button>
                </div>
              ) : null}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
