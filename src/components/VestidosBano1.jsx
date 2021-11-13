function VestidoBano1({imagen,nombreVestido}) {
    return (
      <div className='contenedorImagen'>
        <img src={imagen} alt={nombreVestido} width="105%" height="100%"/>
      </div>
    )
  }

  export default VestidoBano1;