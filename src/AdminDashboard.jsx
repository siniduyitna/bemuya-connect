import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HiUserGroup, HiOutlineOfficeBuilding, HiTrendingUp } from 'react-icons/hi';

const AdminDashboard = ({ registeredUsers }) => {
  // ስታቲስቲክስ ዳታ ማዘጋጀት
  const districtData = registeredUsers.reduce((acc, user) => {
    const found = acc.find(item => item.name === user.district);
    if (found) { found.value++; } 
    else { acc.push({ name: user.district || "ያልተጠቀሰ", value: 1 }); }
    return acc;
  }, []);

  const COLORS = ['#FFBB28', '#0088FE', '#00C49F', '#FF8042', '#8884d8'];

  return (
    <div className="p-4" style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <h2 className="mb-4 fw-bold text-warning">የአስተዳዳሪ ዳሽቦርድ</h2>

      {/* የስታቲስቲክስ ካርዶች */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-dark border border-secondary d-flex align-items-center gap-3">
            <div className="p-3 bg-warning rounded-3 text-dark fs-2"><HiUserGroup /></div>
            <div>
              <p className="m-0 text-white-50">ጠቅላላ ባለሙያዎች</p>
              <h3 className="m-0 fw-bold">{registeredUsers.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-dark border border-secondary d-flex align-items-center gap-3">
            <div className="p-3 bg-primary rounded-3 text-white fs-2"><HiOutlineOfficeBuilding /></div>
            <div>
              <p className="m-0 text-white-50">ንቁ ክፍለ ከተሞች</p>
              <h3 className="m-0 fw-bold">{districtData.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-dark border border-secondary d-flex align-items-center gap-3">
            <div className="p-3 bg-success rounded-3 text-white fs-2"><HiTrendingUp /></div>
            <div>
              <p className="m-0 text-white-50">አዲስ ምዝገባ (ዛሬ)</p>
              <h3 className="m-0 fw-bold">+{registeredUsers.length > 0 ? 1 : 0}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        {/* የባር ግራፍ (Bar Chart) */}
        <div className="col-lg-8 mb-4">
          <div className="p-4 rounded-4 bg-dark border border-secondary h-100">
            <h5 className="mb-4">የባለሙያዎች ስርጭት በክፍለ ከተማ</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={districtData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
                  <Bar dataKey="value" fill="#FFBB28" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ክብ ግራፍ (Pie Chart) */}
        <div className="col-lg-4 mb-4">
          <div className="p-4 rounded-4 bg-dark border border-secondary h-100 text-center">
            <h5 className="mb-4 text-start">የሙያ ክፍፍል</h5>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={districtData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {districtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="small text-white-50 mt-2">በመረጃው መሰረት አብዛኛው ባለሙያ ከየካ ክፍለ ከተማ ነው</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;