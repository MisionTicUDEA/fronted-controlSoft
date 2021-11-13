import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerProductos, crearProductos, editarProductos, eliminarProductos } from 'utils/api';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from 'components/PrivateComponent';

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      await obtenerProductos(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setProductos(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.error('Salio un error:', error);
          setLoading(false);
        }
      );
    };
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      fetchProductos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de productos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Producto');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los productos');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de productos
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>

      {mostrarTabla ? (
        <TablaProductos
          loading={loading}
          listaProductos={productos}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <FormularioCreacionProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setProductos={setProductos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ loading, listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  useEffect(() => {
    setProductosFiltrados(
      listaProductos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los productos</h2>
      <div className='hidden md:flex w-full'>
        {loading ? (
          <ReactLoading type='cylon' color='#abc123' height={667} width={375} />
        ) : (
          <table className='tabla'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre del producto</th>
                <th>Tipo de producto</th>
                <th>Talla del producto</th>
                <PrivateComponent roleList={['admin']}>
                  <th>Acciones</th>
                </PrivateComponent>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => {
                return (
                  <FilaProducto
                    key={nanoid()}
                    producto={producto}
                    setEjecutarConsulta={setEjecutarConsulta}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {productosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.name}</span>
              <span>{el.kind}</span>
              <span>{el.size}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    _id: producto._id,
    name: producto.name,
    kind: producto.kind,
    size: producto.size,
  });

  const actualizarProductos = async () => {
    //enviar la info al backend

    await editarProductos(
      producto._id,
      {
        name: infoNuevoProducto.name,
        kind: infoNuevoProducto.kind,
        size: infoNuevoProducto.size,
      },
      (response) => {
        console.log(response.data);
        toast.success('Vehículo modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el producto');
        console.error(error);
      }
    );
  };

  const deleteProduct = async () => {
    await eliminarProductos(
      producto._id,
      (response) => {
        console.log(response.data);
        toast.success('producto eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el producto');
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoProducto._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.name}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, name: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.kind}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, kind: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.size}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, size: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{producto._id.slice(20)}</td>
          <td>{producto.name}</td>
          <td>{producto.kind}</td>
          <td>{producto.size}</td>
        </>
      )}

      <PrivateComponent roleList={['admin']}>
        <td>
          <div className='flex w-full justify-around'>
            {edit ? (
              <>
                <Tooltip title='Confirmar Edición' arrow>
                  <i
                    onClick={() => actualizarProductos()}
                    className='fas fa-check text-green-700 hover:text-green-500'
                  />
                </Tooltip>
                <Tooltip title='Cancelar edición' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title='Editar Vehículo' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
                <Tooltip title='Eliminar Vehículo' arrow>
                  <i
                    onClick={() => setOpenDialog(true)}
                    className='fas fa-trash text-red-700 hover:text-red-500'
                  />
                </Tooltip>
              </>
            )}
          </div>

          <Dialog open={openDialog}>
            <div className='p-8 flex flex-col'>
              <h1 className='text-gray-900 text-2xl font-bold'>
                ¿Está seguro de querer eliminar el producto?
              </h1>
              <div className='flex w-full items-center justify-center my-4'>
                <button
                  onClick={() => deleteProduct()}
                  className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                >
                  Sí
                </button>
                <button
                  onClick={() => setOpenDialog(false)}
                  className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                >
                  No
                </button>
              </div>
            </div>
          </Dialog>
        </td>
      </PrivateComponent>
    </tr>
  );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    await crearProductos(
      {
        name: nuevoProducto.name,
        kind: nuevoProducto.kind,
        size: nuevoProducto.size,
      },
      (response) => {
        console.log(response.data);
        toast.success('Producto agregado con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un producto');
      }
    );

    // const options = {
    //   method: 'POST',
    //   url: 'http://localhost:5000/productos/nuevo/',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: { name: nuevoProducto.name, kind: nuevoProducto.kind, size: nuevoProducto.size },
    // };

    // await axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     toast.success('Vehículo agregado con éxito');
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //     toast.error('Error creando un producto');
    //   });

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del producto
          <input
            name='name'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Vestidos Summer'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='tipo'>
          Tipo del producto
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='kind'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Soleador</option>
            <option>Dos piezas</option>
            <option>Enterizos</option>
            <option>Suit Completos</option>
          </select>
        </label>
        <label className='flex flex-col' htmlFor='talla'>
          Talla del producto
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='kind'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una talla
            </option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </label>

        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export default Productos;
