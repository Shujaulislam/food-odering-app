


import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import AdminLayout from "@/components/Layout/Admin/AdminLayout";
export default function App({ Component, pageProps }) {

  const isAdmin = Component?.name?.startsWith('Admin')
  return isAdmin ? (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  ) : (
  <>
  <Navbar />
     <Component {...pageProps} />
     <Footer/>
    
  </>
     
  );
  ;
}
