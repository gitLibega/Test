"use client";
import Bar from "@/components/Bar/Bar";
import Navigation from "@/components/Navigation/Navigation";
import SideBar from "@/components/SideBar/SideBar";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useState } from "react";
import { trackType } from "@/types";

export default function Home() {
  const [track, setTrack] = useState<trackType | null>(null);

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navigation />
          <CenterBlock setTrack={setTrack}/>
          <SideBar />
        </main>
        {track &&(<Bar track={track}/>)}
        <footer className="footer" />
      </div>
    </div>
  );
}
