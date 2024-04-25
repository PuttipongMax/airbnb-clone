import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout(){
 return (
  <div className="py-4 mx-auto px-4 sm:px-[4%] flex flex-col min-h-screen">
    <Header />
    <Outlet />
  </div>
 )
}