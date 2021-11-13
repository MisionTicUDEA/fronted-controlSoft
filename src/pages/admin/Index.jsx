import { useDarkMode } from 'context/darkMode';
import React from 'react';
import VestidoBano2  from 'components/VestidoBano2';
import ImagenLogo from 'components/ImagenLogo';


const Admin = ({ children }) => {
  const { darkMode } = useDarkMode();
  return <div>
  <div className={`flex h-full bg-gray-${darkMode ? '900' : '50'}`}>   
<main>

    <div className="flex flex-wrap"> 
        <VestidoBano2  />
        <ImagenLogo  />

        {children}
      </div>
     
    
      
</main>
</div>
</div>   
};

export default Admin;
