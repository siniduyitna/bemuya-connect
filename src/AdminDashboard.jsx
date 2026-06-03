import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HiLogout, HiTrash, HiPencil, HiSearch, HiX, HiSave } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { db } from './firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const AdminDashboard = ({ registeredUsers, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null); 
  const [editData, setEditData] = useState({}); 
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id, name) => {
    if (window.confirm(`ባለሙያ "${name}"ን ለማጥፋት እርግጠኛ ነዎት?`)) {
      setLoading(true);
      try { await deleteDoc(doc(db, "workers", id)); } 
      catch (err) { alert("ማጥፋት አልተቻለም!"); }
      finally { setLoading(false); }
    }
  };

  const startEdit = (user) => { setEditingUser(user.id); setEditData({ ...user }); };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const userRef = doc(db, "workers", editingUser);
      await updateDoc(userRef, {
        name: editData.name, profession: editData.profession,
        district: editData.district, phone: editData.phone,
        experience: editData.experience
      });
      setEditingUser(null);
      alert("መረጃው በትክክል ተስተካክሏል!");
    } catch (err) { alert("ማስተካከል አልተቻለም!"); }
    finally { setLoading(false); }
  };

  const filteredUsers = registeredUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const districtData = registeredUsers.reduce((acc, user) => {
    const name = user.district || "ሌላ";
    const found = acc.find(item => item.name === name);
    if (found) found.value++; else acc.push({ name, value: 1 });
    return acc;
  }, []);

  return (
    <motion.div className="admin-dashboard-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="admin-container p-4">
        {loading && <div className="text-warning text-center">እባክዎ ይጠብቁ...</div>}
        
        <div className="d-flex justify-content-between align-items-center mb-5 bg-dark p-3 rounded-4 border border-secondary shadow-lg">
          <h2 className="fw-bold text-warning m-0">የአስተዳዳሪ ዳሽቦርድ</h2>
          <button className="btn btn-outline-danger rounded-pill px-4 fw-bold" onClick={onClose}><HiLogout /> ውጣ</button>
        </div>

        {/* ግራፎች */}
        <div className="row mb-4">
          <div className="col-lg-8 mb-3">
            <div className="chart-container shadow-lg p-4 bg-dark rounded-4">
              <h5 className="text-white mb-3">በክፍለ ከተማ የባለሙያዎች ብዛት</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={districtData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" stroke="#fff" /><YAxis stroke="#fff" /><Tooltip /><Bar dataKey="value" fill="#ffc107" /></BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <div className="chart-container shadow-lg p-4 bg-dark rounded-4">
              <h5 className="text-white mb-3">የስርጭት መቶኛ</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart><Pie data={districtData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label>{districtData.map((e, i) => <Cell key={i} fill={i % 2 === 0 ? "#ffc107" : "#0dcaf0"} />)}</Pie><Tooltip /></PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="chart-container shadow-lg p-4">
          <div className="d-flex justify-content-between mb-4">
            <h5 className="fw-bold m-0">የባለሙያዎች ሰንጠረዥ</h5>
            <input type="text" className="form-control w-25 bg-dark border-secondary text-white rounded-pill" placeholder="ፈልግ..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead><tr><th>ስም</th><th>ሙያ</th><th>ክፍለ ከተማ</th><th>ስልክ</th><th>ልምድ</th><th className="text-end">እርምጃ</th></tr></thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {editingUser === user.id ? (
                      <>
                        <td><input className="form-control" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} /></td>
                        <td><input className="form-control" value={editData.profession} onChange={e => setEditData({...editData, profession: e.target.value})} /></td>
                        <td><input className="form-control" value={editData.district} onChange={e => setEditData({...editData, district: e.target.value})} /></td>
                        <td><input className="form-control" value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} /></td>
                        <td><input type="number" className="form-control" value={editData.experience} onChange={e => setEditData({...editData, experience: e.target.value})} /></td>
                        <td className="text-end"><button className="btn btn-success btn-sm me-2" onClick={handleUpdate}><HiSave /></button><button className="btn btn-light btn-sm" onClick={() => setEditingUser(null)}><HiX /></button></td>
                      </>
                    ) : (
                      <>
                        <td>{user.name}</td><td><span className="badge bg-warning text-dark">{user.profession}</span></td><td>{user.district}</td><td>{user.phone}</td><td>{user.experience} ዓመት</td>
                        <td className="text-end"><button className="btn btn-sm btn-outline-info me-2" onClick={() => startEdit(user)}><HiPencil /></button><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user.id, user.name)}><HiTrash /></button></td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;