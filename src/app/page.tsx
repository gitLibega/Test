import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar"
import Navigation from "@/components/Navigation/Navigation";
import SideBar from "@/components/SideBar/SideBar";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navigation/>
          <CenterBlock/>
         <SideBar/>
        </main>
        <Bar></Bar>
        <footer className="footer" />
      </div>
    </div>
  );
}
