import React, { useState, useEffect } from 'react';

export const AdminCustomers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('crouchets_users');
    if (raw) {
      setUsers(JSON.parse(raw));
    }
  }, []);

  return (
    <div>
      <h1 className="font-playfair text-4xl font-bold text-dark mb-8">Customers directory</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-warm/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-warm/20 border-b border-warm/50">
              <tr className="text-mid uppercase text-xs tracking-widest">
                <th className="py-4 px-6 font-bold">User ID</th>
                <th className="py-4 px-6 font-bold">Name</th>
                <th className="py-4 px-6 font-bold">Email</th>
                <th className="py-4 px-6 font-bold">Registration</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id} className="border-b border-warm/20 hover:bg-warm/5 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-xs text-mid">{user.id}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-dark">{user.name}</td>
                  <td className="py-4 px-6 text-mid">{user.email}</td>
                  <td className="py-4 px-6 text-sm text-mid">System account</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan="4" className="py-12 text-center text-mid">No registered customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
