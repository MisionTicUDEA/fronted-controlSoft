import Collage_Vestido from '../media/Collage_Vestido.JPG'
import VestidoBano1 from '../components/VestidosBano1';

const Que_es_page = () => {
    return (
<div> 
        <section>
        <main>
        <div className="grid-container">
            <div className="grid-item">
                <div className="a">
                        <VestidoBano1 
                        nombreVestido='Collage Vestido' 
                        imagen={Collage_Vestido}/>
                </div>  
            </div>
            <div className="grid-item">
                <div className="a">
                    <h1>Que es ControlSoft.</h1>
                        <p><h5>El sistema automatizado de ventas es un lugar donde un cliente paga por un artículo o un servicio 
                            separado ofrecido por una compañía. Entonces, básicamente, es el sistema que permite a las partes 
                            proceder con la transacción entre un cliente y una compañía. Además, este término pertenece a una 
                            red digitalizada que incluye terminales de pago que cuentan con funciones adicionales como escáner 
                            y terminales de pago</h5>
                    </p>
                    <button className="button"><span>Iniciar Sesión </span></button> 
                </div>
            </div>
        </div>
    </main>
        </section>
</div>    
     )
}

export default Que_es_page;