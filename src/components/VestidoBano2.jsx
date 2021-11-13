function VestidoBano2({imagen,nombreVestido}) {
    return (
      <div className='contenedorImagen'>
        <img src={imagen} alt={nombreVestido} width="60%" height="80%"/>
      </div>
    )
  }

  export default VestidoBano2;