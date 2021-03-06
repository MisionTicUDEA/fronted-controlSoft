import Collage_Vestido from '../media/Collage_Vestido.JPG'
import VestidoBano1 from '../components/VestidosBano1';
import { useAuth0 } from '@auth0/auth0-react';

const Que_es_page = () => {
    const { loginWithRedirect } = useAuth0();
    return (
<div> 
        <section>
        <main>
        <div className='flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8'>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
                    <VestidoBano1 
                        nombreVestido='Collage Vestido' 
                        imagen={Collage_Vestido}/>
                </div>           
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
                    <p class="text-center ">
                    <div className="font-bold text-4xl mb-8 p-1">
                        <p>Que es ControlSoft.</p>
                    </div>
                        <p className="text-gray-700 text-base p-8">
                        El sistema automatizado de ventas es un lugar donde un cliente paga por un artículo o un servicio 
                            separado ofrecido por una compañía. Entonces, básicamente, es el sistema que permite a las partes 
                            proceder con la transacción entre un cliente y una compañía. Además, este término pertenece a una 
                            red digitalizada que incluye terminales de pago que cuentan con funciones adicionales como escáner 
                            y terminales de pago.
                        </p>
                        <p>
                        <div>
                            <button
                                    onClick={() => loginWithRedirect()}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Iniciar Sesión
                            </button>
                        </div>
                        </p>
                    </p>
                </div>
            </div>
        </div>
    </main>
        </section>
</div>    
     )
}

export default Que_es_page;