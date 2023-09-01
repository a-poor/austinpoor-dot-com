import Navbar from '$/components/Navbar';
import { ActivePage } from "$/lib/dtypes";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 backdrop-blur">
        <Navbar 
          activePage={ActivePage.About}
        />
      </header>
      <main className="">
      {new Array(100).fill(0).map((_, i) => (
        <p key={i}>Hello, World!</p>
      ))}
      </main>
      <footer className=""></footer>
    </>
  )
}
