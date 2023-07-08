import Link from 'next/link';
import React from 'react'
import IconThreads from '@/components/icons/icon-threads';

const Header = () => {
  return (
    <div className="h-header-size flex items-center justify-center shrink-0">
      <Link href={"/"} className="flex group">
        <div
          className="select-none mr-2 group-hover:scale-105 transition-all duration-150 ease-in-out"
          role="button"
          tabIndex={0}
        >
          <IconThreads className="h-6 w-6 fill-white" />
        </div>
        <p className="select-none text-lg font-semibold tracking-tight">
          Insta <strong className="font-bold">Threads</strong> Downloader
        </p>
      </Link>
    </div>
  );
}

export default Header