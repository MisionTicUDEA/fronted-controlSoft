import React, { useEffect } from 'react';
import ImagenLogo from './ImagenLogo';
import { Link } from 'react-router-dom';
import useActiveRoute from 'hooks/useActiveRoute';
import { useAuth0 } from '@auth0/auth0-react';
import PrivateComponent from './PrivateComponent';

const Sidebar = () => {
  const { user, logout } = useAuth0();

  const cerrarSesion = () => {
    //logout({ returnTo: 'http://localhost:3000/admin' });
    logout({ returnTo: 'https://blooming-falls-56847.herokuapp.com/admin' });
    localStorage.setItem('token', null);
  };

  return (
    <nav className='hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-blue-300 p-4 sidebar'>
  
        <p class="text-center ">
          <div className="font-bold text-xl mb-2">
            Administración
          </div>
        </p>
      <div className='my-50'>
        <Ruta icono='fas fa-user' ruta='/admin/perfil' nombre='Perfil' usuario={user} />
        <PrivateComponent roleList={['admin']}>
          <Ruta icono='fas fa-swimmer' ruta='/admin/productos' nombre='Productos' />
        </PrivateComponent>
        <PrivateComponent roleList={['admin', 'vendedor']}>
          <Ruta icono='fas fa-cash-register' ruta='/admin/ventas' nombre='Ventas' />
        </PrivateComponent>
        <PrivateComponent roleList={['admin']}>
          <Ruta icono='fas fa-users' ruta='/admin/usuarios' nombre='Usuarios' />
        </PrivateComponent>
        </div >
    
      <div className='my-5'>
      <Link to='/admin'>
        <ImagenLogo />
      </Link>


      </div>
      <button onClick={() => cerrarSesion()}className="bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">Cerrar Sesión</button>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre, usuario }) => {
  console.log('usuario', usuario);
  const isActive = useActiveRoute(ruta);
  return (
    <Link to={ruta}>
      <button
        className={`p-1 my-2  bg-${
          isActive ? 'indigo' : 'gray'
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        {usuario ? (
          <>
            <img src={usuario.picture} className='h-5 w-5 rounded-full' />
            {usuario.name}
          </>
        ) : (
          <>
            <i className={`${icono} w-10`} />
            {nombre}
          </>
        )}
      </button>
    </Link>
  );
};

export default Sidebar;
