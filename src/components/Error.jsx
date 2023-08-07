import { useState, useEffect } from 'react';

/**
 * children es otra forma de recibir parámetros. En donde llamamos al componente
 * lo usamos como <Error>Contenido<Error/>
 */
function Error({ children }) {
    return ( 
        <div className="bg-red-600 rounded-md p-3 mb-5">
            <p className="text-white text-center font-bold">{ children }</p>
        </div>
    );
}

export default Error;