import { useState, useEffect } from "react"; // Hooks
import Error from "./Error";

/**
 * Recibimos la función setPacientes porque es la que modifica el arreglo de
 * pacientes, que estaremos modificando en este componente.
 */
function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    // Validación del formulario
    const [error, setError] = useState(false);

    /**
     * useEffect evitará que se este renderizando el componente cada vez que haya
     * un cambio, rendereizando el contenido solo cuando el componente esté listo
     * o haya un cambio.
     * En los corchetes [] indicaremos cual es el elemento que estará escuchando
     * por el cambio.
     * En este caso, ejecutaremos la función cuando 'paciente' cambie.
     */
    useEffect(() => {
        // Verificar si 'paciente' tiene información
        if( Object.keys(paciente).length > 0 ) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    /**
     * Genera un ID único.
     * @returns Id único.
     */
    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return fecha + random;
    }

    /**
     * Se ejecuta cuando se envía el formulario.
     * @param {object} e Evento submit.
     */
    const handleSubmit = e => {
        e.preventDefault();

        /**
         * Validación del formulario.
         * Creamos un arreglo con los valores. Con includes, verificamos si existe un
         * campo vacío. En ese caso, cambia 'error' a true.
         */
        if( [nombre, propietario, email, fecha, sintomas].includes('') ) {
            setError(true);
            return; // Evita que el demas codigo se ejecute
        }

        setError(false); // Si pasa validación eliminamos el error

        /**
         * Construimos un objeto con toda la info del paciente para pasarlo a
         * setPacientes y este se llene como un arreglo de objetos.
         * Asignamos el nuevo elemento al final del arreglo con el spread operador.
         */
        const objetoPaciente = { nombre, propietario, email, fecha, sintomas }

        // Validar si es nuevo registro o se esta editando uno
        if(paciente.id) {
            objetoPaciente.id = paciente.id;

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === objetoPaciente.id ? objetoPaciente : pacienteState);

            setPacientes(pacientesActualizados);

            // Limpiar el objeto de paciente (cambia el texto del botón de 'editar' a 'agregar')
            setPaciente({});
        } else {
            // Si es un nuevo registro
            objetoPaciente.id = generarId();
            setPacientes( [ ...pacientes, objetoPaciente ] );
        }


        // Reiniciar el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento de pacientes</h2>

            <p className="text-lg mt-5 mb-10">
                Añade pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={ handleSubmit }
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                {
                    /**
                     * Si error es true imprime el div. Para no usar el operador ternario
                     * usamos &&.
                     * Al componente Error podemos pasarle incluso código HTML, el cual
                     * quedaría como: <Error><p>Todos los campos son obligatorios</p></Error>
                     */
                    error && <Error>Todos los campos son obligatorios</Error>
                }
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre mascota:</label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        // onChange es un evento, como en JS
                        onChange={ (evento) => setNombre(evento.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre del propietario:</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={ (evento) => setPropietario(evento.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Correo electrónico"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={ email }
                        onChange={ (evento) => setEmail(evento.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta:</label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={ fecha }
                        onChange={ (evento) => setFecha(evento.target.value) }
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas:</label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los síntomas"
                        value={ sintomas }
                        onChange={ (evento) => setSintomas(evento.target.value) }
                    />
                </div>

                <input 
                    type="submit"
                    value={ paciente.id ? "Guardar cambios" : "Agregar paciente" }
                    className="bg-indigo-600 w-full font-bold p-3 text-white rounded-md cursor-pointer hover:bg-indigo-700 transition-all"
                />
            </form>
        </div>
    )
}

export default Formulario;