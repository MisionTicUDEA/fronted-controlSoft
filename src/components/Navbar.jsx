import React from 'react';
import TriggerDarkMode from './TriggerDarkMode';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    // <nav className='bg-blue-300'>
    //   <ul className='flex w-full justify-between my-3'>
    //     <li>ControlSoft</li>
    //     <li>Navegacion1</li>
    //     <li>Navegacion2</li>
    //     <li>
    //       <TriggerDarkMode />
    //     </li>
    //     <li className='px-3'>
    //       <button
    //         onClick={() => loginWithRedirect()}
    //         className='bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'
    //       >
    //         Iniciar Sesión
    //       </button>
    //     </li>
    //   </ul>
    // </nav>

<nav className="flex items-center justify-between flex-wrap bg-blue-300 p-2">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
      <Link to= '/index'><span className="font-semibold text-xl tracking-tight">ControlSoft</span></Link>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-mg lg:flex-grow">
      <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      <Link to= '/que_es'>Que es ControlSoft</Link>
      </div>
      <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
      <TriggerDarkMode />
      </a>
    </div>
    <div>
      <button
             onClick={() => loginWithRedirect()}
             className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
        Iniciar Sesión
      </button>
    </div>
  </div>
</nav> 
  );
};

export default Navbar;
