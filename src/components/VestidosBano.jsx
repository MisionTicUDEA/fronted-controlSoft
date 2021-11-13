function VestidoBano({imagen,nombreVestido}) {
    return (
      <div className='contenedorImagen'>
        <img src={imagen} alt={nombreVestido} width="55%" height="55%"/>
      </div>
    )
  }

  export default VestidoBano;