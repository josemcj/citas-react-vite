import Paciente from "./Paciente";

function ListadoPacientes({ pacientes, setPaciente, eliminarPaciente }) {

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            {
                // Cambiar texto si hay o no pacientes
                pacientes && pacientes.length ? (
                    <>
                        <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>

                        <p className="text-lg mt-5 mb-10">
                            Administra tus {''}
                            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                        </p>

                        { 
                            /**
                             * Iteramos el arreglo con map, ya que si lo iteramos en forEach no se
                             * va a mostrar nada.
                             * Siempre que iteremos un arreglo debemos tener un key único. Es una mala
                             * práctica pasar el index del arreglo.
                             */
                            pacientes.map(paciente => (
                                <Paciente
                                    key={ paciente.id }
                                    paciente={ paciente }
                                    setPaciente={ setPaciente } // Sirve para editar un paciente
                                    eliminarPaciente={ eliminarPaciente }
                                />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

                        <p className="text-lg mt-5 mb-10">
                            Comienza añadiendo {''}
                            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                        </p>
                    </>
                )
            }      
        </div>
    )
}

export default ListadoPacientes;