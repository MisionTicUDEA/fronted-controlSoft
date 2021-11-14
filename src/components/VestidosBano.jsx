function VestidoBano({imagen,nombreVestido}) {
    return (
      <div className='contenedorImagen'>
        <img src={imagen} alt={nombreVestido} width="100%" height="100%"/>
      </div>
    )
  }

  export default VestidoBano;