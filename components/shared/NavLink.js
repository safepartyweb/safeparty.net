'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx'; // Optional but recommended for clean conditional classes

const NavLink = ({ href, label }) => {
  const pathname = usePathname();

  // console.log("href", href)
  // console.log("pathname", pathname)

  let isActive
  if(pathname === href){
    isActive = true
  }

  const pathNameParts = pathname.split('/');
  // console.log("pathNameParts", pathNameParts)
  if(pathNameParts.length == 4){
    if(('/'+ pathNameParts[1] + '/' + pathNameParts[2]) == href){
      isActive = true
    }
  }

  // console.log("test",(pathNameParts[1] + '/' + pathNameParts[2]))

  
  // isActive = pathname === href;
  // const isActive = pathname.startsWith(href);
  // const isActive = pathname === href || pathname === `${href}/`;
  // const isActive = pathname === href || pathname.startsWith(`${href}/`);

  //const isActive = pathname === href || pathname.startsWith(`${href}/`);

const isExactlyMatched = () => {
  // Prevent false positive matches
  const parts = pathname.split('/');
  // console.log("Parts", parts)
  const base = '/' + parts.slice(2, href.split('/').length + 1).join('/');
  return base === href;
};

const finalActive = isActive && isExactlyMatched();

  return (
    <Link
      href={href}
      className={clsx(
        'border-b border-gray-500 py-2 px-2  hover:text-black block',
        isActive
          ? 'active font-semibold text-siteBlack border-b-2 border-blue-600 '
          : 'text-white'
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;
