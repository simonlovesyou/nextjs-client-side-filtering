import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => (
  <main
    className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  >
    <nav className="w-full max-w-lg">
      <ul>
        <li className="flex px-8 justify-between w-full">
          <Link className="flex" href="/jewelery">
            jewelery
          </Link>
          <Link className="flex" href="/electronics">
            Electronics
          </Link>
          <Link className="flex" href="/mens">
            Men&apos;s Clothing
          </Link>
          <Link className="flex" href="/womens">
            Womens&apos;s Clothing
          </Link>
        </li>
      </ul>
    </nav>
    <div className="grid grid-cols-[200px_1fr]">{children}</div>
  </main>
);

export default Layout;
