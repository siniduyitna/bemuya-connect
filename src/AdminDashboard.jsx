import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { HiUserGroup, HiOutlineOfficeBuilding, HiTrendingUp, HiLogout, HiTrash, HiPencil, HiCheckCircle, HiSearch, HiX, HiSave } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const AdminDashboard = ({ registeredUsers, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null); 
  const [editData, setEditData] = useState({}); 

  // --- 1. ማጥፊያ (Delete) ---
  const handleDelete = async (id, name) => {
    if (window.confirm(`ባለሙያ "${name}"ን ለማጥፋት እርግጠኛ ነዎት?`)) {
      try {
        await deleteDoc(doc(db, "workers", id));
      } catch (err) { alert("ማጥፋት አልተቻለም!"); }
    }
  };

  // --- 2. ማስተካከያ መጀመር (Start Edit) ---
  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditData({ ...user });
  };

  // --- 3. ማስተካከያውን ማስቀመጥ (Save Update) ---
  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "workers", editingUser);
      await updateDoc(userRef, {
        name: editData.name,
        profession: editData.profession,
        district: editData.district,
        phone: editData.phone,
        experience: editData.experience
      });
      setEditingUser(null);
      alert("መረጃው በትክክል ተስተካክሏል!");
    } catch (err) { alert("ማስተካከል አልተቻለም!"); }
  };

  const filteredUsers = registeredUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ዳታ ለግራፍ ቀደም ብዬ የሰራሁት)
  const districtData = registeredUsers.reduce((acc, user) => {
    const name = user.district || "ሌላ";
    const found = acc.find(item => item.name === name);
    if (found) found.value++; else acc.push({ name, value: 1 });
    return acc;
  }, []);

  return (
    <motion.div className="admin-dashboard-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="admin-container p-4">
        
        {/* Header & Stats*/}
        <div className="d-flex justify-content-between align-items-center mb-5 bg-dark p-3 rounded-4 border border-secondary shadow-lg">
          <h2 className="fw-bold text-warning m-0">የአስተዳዳሪ ዳሽቦርድ</h2>
          <button className="btn btn-outline-danger rounded-pill px-4 fw-bold" onClick={onClose}><HiLogout /> ውጣ</button>
        </div>

        {/* Table with Inline Edit */}
        <div className="chart-container shadow-lg p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-3">
            <h5 className="fw-bold m-0">የባለሙያዎች መቆጣጠሪያ ሰንጠረዥ</h5>
            <div className="position-relative">
              <HiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50" />
              <input type="text" className="form-control bg-dark border-secondary text-white ps-5 rounded-pill" placeholder="ፈልግ..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle custom-table">
              <thead>
                <tr>
                  <th>ስም</th>
                  <th>ሙያ</th>
                  <th>ክፍለ ከተማ</th>
                  <th>ስልክ</th>
                  <th>ልምድ</th>
                  <th className="text-end">እርምጃ</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {editingUser === user.id ? (
                      // --- ኤዲት ሞድ (Edit Mode Inputs) ---
                      <>
                        <td><input type="text" className="form-control form-control-sm bg-secondary border-0 text-white" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} /></td>
                        <td><input type="text" className="form-control form-control-sm bg-secondary border-0 text-white" value={editData.profession} onChange={e => setEditData({...editData, profession: e.target.value})} /></td>
                        <td><input type="text" className="form-control form-control-sm bg-secondary border-0 text-white" value={editData.district} onChange={e => setEditData({...editData, district: e.target.value})} /></td>
                        <td><input type="text" className="form-control form-control-sm bg-secondary border-0 text-white" value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} /></td>
                        <td><input type="number" className="form-control form-control-sm bg-secondary border-0 text-white" value={editData.experience} onChange={e => setEditData({...editData, experience: e.target.value})} /></td>
                        <td className="text-end">
                          <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}><HiSave /></button>
                          <button className="btn btn-light btn-sm" onClick={() => setEditingUser(null)}><HiX /></button>
                        </td>
                      </>
                    ) : (
                      // --- መደበኛ እይታ (Normal View) ---
                      <>
                        <td>{user.name}</td>
                        <td><span className="badge bg-warning bg-opacity-10 text-warning">{user.profession}</span></td>
                        <td>{user.district}</td>
                        <td className="text-white-50 small">{user.phone}</td>
                        <td>{user.experience} ዓመት</td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-info border-0 me-2" onClick={() => startEdit(user)}><HiPencil /></button>
                          <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(user.id, user.name)}><HiTrash /></button>
                        </td>
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