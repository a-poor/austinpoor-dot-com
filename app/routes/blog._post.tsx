import { Outlet } from "react-router";

export default function Page() {
  return (
    <>
      <article className="mx-auto prose dark:prose-invert lg:prose-xl">
        <Outlet />
      </article>
    </>
  );
}
