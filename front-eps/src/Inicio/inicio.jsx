import React, { useState,useEffect } from 'react';
import { API_BASE_URL } from '../config.js';
import EditarPacienteForm from './pacienteEditar.jsx';
import EditarrCitaForm from './citasEditar.jsx';
import EditarDoctorForm from './doctorEditar.jsx';

const Buscador = () => {
  const [busqueda, setBusqueda] = useState('');// Estado: valor de búsqueda
  const [persona, setPersona] = useState('citas');// Estado: tipo de rol seleccionado
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);// Estado: si se muestra la confirmación de eliminación
  const [resultados, setResultados] = useState(null);// Estado: resultados de búsqueda
  const [eliminar, setEliminar] = useState(false);// Estado: si se va a eliminar un registro
  const [enviado, setEnviado] = useState(false);// Estado: si se ha enviado correctamente una eliminación
  const [mostrartodo, setMostrartodo] = useState(false);// Estado: si se deben mostrar todos los registros 
  const [Editar, setEditar] = useState(false);// Estado: si se debe editar registro


  useEffect(() => {
    if (Editar) {
      setConfirmacionVisible(false);
    }
  }, [Editar]);

  const BuscarTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/${persona}`);
      const mostrar = await response.json();

      if (response.ok) {
        console.log(mostrar);
        if (mostrar == null) {
          alert('No se encontraron resultados');
        } else {
          setResultados(mostrar);
          setMostrartodo(true);
          setBusqueda("")
        }
      } else {
        console.error('Error al obtener los resultados');
      }
    } catch (error) {
      alert('Error en la solicitud: ' + error);
    }
  };
  

  const confirmacionEliminar = (event) => {
    event.preventDefault();
    setEliminar(true);
  };

  const confirmarEnvio = () => {
    setConfirmacionVisible(false);
    manejarEliminar();
  };

  const cancelarEnvio = () => {
    setConfirmacionVisible(false);
  };

  const manejarEliminar = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/${persona}/${busqueda}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Eliminación exitosa
        setEnviado(true);
        // Realizar alguna acción adicional si es necesario
      } else {
        // Si la eliminación no fue exitosa, lanzar un error personalizado
        throw new Error('Error al eliminar el elemento');
      }
    } catch (error) {
      // Manejar el error de eliminación
      console.error('Error en la solicitud: ' + error);
      alert('Ocurrió un error al eliminar el elemento');
    }
  };

  const manejarChange = (event) => {
    setBusqueda(event.target.value);
  };

  const manejarSubmit = async (event) => {
    event.preventDefault();
    setEliminar(false);
    setMostrartodo(false)
    setResultados(null)
    setEditar(false)
    setEnviado(false)
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/${persona}/${busqueda}`);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        if (data == null) {
          alert('Ingresa datos válidos');
        } else {
          setResultados(data);
          setConfirmacionVisible(true);
        }
      } else {
        console.error('Error al obtener el resultado de búsqueda');
      }
    } catch (error) {
      alert('Error en la solicitud: ' + error);
    }
  };

  return (
    <div className="container  mt-5">
      <h1 className="display-4 text-center mt-5 mb-3">Buscador Clínico</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={manejarSubmit} className="d-flex ">
          <div className="input-group mb-3 m-1">
            <div className="input-group-prepend">
              <label htmlFor="persona" className="input-group-text">
                Rol:
              </label>
            </div>
            <select
              className="form-select"
              id="persona"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
            >
              <option value="citas">Citas</option>
              <option value="doctor">Doctor</option>
              <option value="paciente">Paciente</option>
            </select>
          </div>

          <div className="input-group mb-3 m-1 flex-grow-1">
            <input
              type="number"
              value={busqueda}
              required
              onChange={manejarChange}
              className="form-control"
              placeholder="N.documento"
            />
          </div>

          <div className="m-1">
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </div>
        </form>

        <div className="m-1">
          <button type="button" className="btn btn-secondary" onClick={BuscarTodos}>
            Buscar Todos
          </button>
        </div>
      </div>

      {mostrartodo ? (
        <div className='mt-1'>
          <h2 className="mt-5 mb-3">Resultados:</h2>
          <ul className="list-group">
            {resultados.map((resultado, index) => (
              <li key={index} className="list-group-item">
                {Object.entries(resultado).map(([clave, valor]) => (
                  <div key={clave}>
                    <strong>{clave}:</strong> {valor}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          {enviado ? (
            <>
              <p className='text-primary'> Se  elimino correctamente</p>
            </>
          ) : (
            <div className="mt-5">
              {confirmacionVisible && resultados && (
                <>
                  <h2 className="mt-5 mb-3">Resultados:</h2>
                  <ul className="list-group">
                    {Object.entries(resultados).map(([clave, valor]) => (
                      <li key={clave} className="list-group-item">
                        <strong>{clave}:</strong> {valor}
                      </li>
                    ))}
                  </ul>
                  <button onClick={confirmacionEliminar} className="btn btn-danger m-1 ">
                    Eliminar
                  </button>
                  <button onClick={() => setEditar(true)} className="btn btn-primary m-2">
                    Editar
                  </button>
                  {eliminar && (
                    <div className="mb-3">
                      <p>¿Está seguro de eliminar esto?</p>
                      <button className="btn btn-primary m-1" onClick={confirmarEnvio}>
                        Confirmar
                      </button>
                      <button className="btn btn-secondary" onClick={cancelarEnvio}>
                        Cancelar
                      </button>
                    </div>
                  )}
                </>
              )}

              {Editar && (
                <>
                  {persona === 'paciente' ? (
                    <EditarPacienteForm dato={resultados} />
                  ) : persona === 'citas' ? (
                    <EditarrCitaForm dato={resultados} />
                  ) : persona === 'doctor' ? (
                    <EditarDoctorForm dato={resultados}  />
                  ) : null}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Buscador;

