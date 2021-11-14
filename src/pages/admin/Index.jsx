import { useDarkMode } from 'context/darkMode';
import React from 'react';
import VestidoBano2  from 'components/VestidoBano2';
import VestidoBano3  from 'components/VestidoBano3';
import VestidoBano4 from 'components/VestidoBano4';


const Admin = ({ children }) => {
  const { darkMode } = useDarkMode();
  return <div>
  <div className={`flex h-full bg-gray-${darkMode ? '900' : '50'}`}>   
    <main>
    <div className='flex  flex-col  p-2'>
        <div className="font-bold text-3xl mb-8">
          ControlSoft
        </div>
      </div>
      <div className='flex  flex-col  p-2'>
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div>
      <VestidoBano2  />
      </div>
      <div>
      <VestidoBano3  />
      </div>
      <div>
      <VestidoBano4  />
      </div>
      </div>
      </div>

        {children}      
    </main>
  </div>
</div>   
};

export default Admin;
