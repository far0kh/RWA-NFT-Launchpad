import Link from "next/link";
import { Icons } from "./Icons";

const Footer = () => {
  return (
    <footer>
      <div className="mb-1 mt-10 flex flex-col items-center">
        {/* <div className="mb-3 flex space-x-4">
          <a target="_blank" rel="noreferrer" href="https://x.com/tezuka_xyz">
            <span className="sr-only">Twitter</span>
            <Icons.twitter className="h-5 w-5" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://www.github.com/tezuka_io">
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-5 w-5" />
          </a>
        </div> */}
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://www.tezuka.xyz/">Tezuka</Link>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer