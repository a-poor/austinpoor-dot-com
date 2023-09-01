import Navbar from '$/components/Navbar';
import AustinHead from '$/components/AustinHead';
import { ActivePage } from "$/lib/dtypes";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 backdrop-blur z-10">
        <Navbar 
          activePage={ActivePage.Home}
        />
      </header>
      <main className="">
        <AustinHead />
        {new Array(100).fill(0).map((_, i) => (
          <p key={i}>Hello, World!</p>
        ))}
      </main>
      <footer className=""></footer>
    </>
  )
}
