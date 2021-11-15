import { useDarkMode } from 'context/darkMode';
import React from 'react';
import vestidobano from '../media/Vestido_bano1.jpg';
import VestidoBano from '../components/VestidosBano';


const Index = () => {
  const { darkMode } = useDarkMode();
  return (
    <div>
      <div className={`flex h-full bg-gray-${darkMode ? '900' : '50'}`}>   
    <main>
    <div className='flex  flex-col  p-9'>
      <div class="grid grid-cols-1 md:grid-cols-2">
            <p class="text-center ">
              <div className="font-bold text-4xl mb-8 p-6">
                <p>Toma el control y organiza tus ventas</p>
              </div>
                <p className="text-gray-700 text-1xl">
                  Es una marca con un estilo joven y fresco, 
                  solo con la línea de ropa interior para mujer.
                </p>
            </p>   
            <div>
                    <VestidoBano 
                        nombreVestido='Vestido de Baño' 
                        imagen={vestidobano}/>
                        </div>
              
      </div>
    </div>    
    </main>
    </div>
</div>   
  );
};

export default Index;
