import Navbar from '$/components/Navbar';
import AustinsHead from '$/components/AustinsHead';
import { ActivePage } from "$/lib/dtypes";


export default function Page() {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 backdrop-blur z-10">
        <Navbar 
          activePage={ActivePage.Home}
        />
      </header>
      <main className="">
        <AustinsHead />
        {new Array(100).fill(0).map((_, i) => (
          <p key={i}>Hello, World!</p>
        ))}
      </main>
      <footer className=""></footer>
    </>
  )
}
