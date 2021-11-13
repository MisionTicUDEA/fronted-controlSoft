import { useDarkMode } from 'context/darkMode';
import React from 'react';
import vestidobano from '../media/Vestido_bano.jpg';
import VestidoBano from '../components/VestidosBano';


const Index = () => {
  const { darkMode } = useDarkMode();
  return (
    <div>
      <div className={`flex h-full bg-gray-${darkMode ? '900' : '50'}`}>   
    <main>
      <div className='flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8'>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
            <p class="text-center ">
              <div className="font-bold text-xl mb-2">
                <p>Toma el control y organiza tus ventas</p>
              </div>
                <p className="text-gray-700 text-base">
                  Es una marca con un estilo joven y fresco, solo con la línea de ropa interior para mujer.
                </p>
            </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <div className="a">
            {/*               <img src={vestidobano} alt='Vestido de Baño' width="50%" height="30%">
                            </img>   */}
                    <VestidoBano 
                        nombreVestido='Vestido de Baño' 
                        imagen={vestidobano}/>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
</div>   
  );
};

export default Index;
