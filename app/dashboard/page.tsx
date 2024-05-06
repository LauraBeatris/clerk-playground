import { headers } from "next/headers";
import Link from "next/link";

export default function Page() {
  const headersList = headers();

  const hello = headersList.get("hello-world");

  return (
    <section className="h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-xl text-gray-800">Protected page</h1>

      <p>Header value: {hello}</p>

      <Link className="underline text-purple-500" href="/">
        Back to home
      </Link>
    </section>
  );
}
