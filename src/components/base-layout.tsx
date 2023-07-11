/* import Sidebar from "./Sidebar";


import Navbar from './navbar'
import Footer from './footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

const BaseLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main-content">{children}</main>;
    </div>
  );
};

export default BaseLayout; */

import Nav from "./nav";

 
export default function Layout({ children } : any) {
  return (
    <>
      <Nav/>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}