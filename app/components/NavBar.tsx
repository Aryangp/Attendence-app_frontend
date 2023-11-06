// components/Navbar.js
import Image from 'next/image';
import Link from 'next/link';
import SignInAndOut from './signInAndOut';
import RegisterButton from './registerButton';

const Navbar = () => {
  return (
    <nav className=" bg-gray-900  p-4  text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold" href="/">
           Attendence App
        </Link>
        <ul className="flex space-x-8 ">
          <li className=' py-3'>
            <Link className="hover:text-blue-400" href="/about">
              About
            </Link>
          </li>
          <li>
          <Link className="hover:text-blue-400 my-0" href="/about">
          <Image src="/qr-code-1.png" alt="My Image" width={50} height={50} />
            </Link>
          </li>
          <li className=' py-3'>
            <RegisterButton/>
          </li>
          <li className=' py-3'>
          <SignInAndOut/>
         </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
