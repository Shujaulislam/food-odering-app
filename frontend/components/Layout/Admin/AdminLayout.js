// components/AdminLayout.js

import Link from 'next/link';

const AdminLayout = ({ children }) => {
  return (
    <div>
      
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
