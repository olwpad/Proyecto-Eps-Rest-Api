import React, { useState } from 'react';
import { API_BASE_URL } from '../config.js';
const EditarrCitaForm = ({dato}) => {
  const [numeroDeCedula, setnumeroDeCedula] = useState('');
  const [especialidad, setEspecialidad] = useState('Medicina general');
  const [hora, setHora] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);


  
  const preconfirmacion = (event) => {
    event.preventDefault();
    setConfirmacionVisible(true);
  };

  const confirmarEnvio = () => {
    setConfirmacionVisible(false);
    TratamientoFormulario();
  };

  const cancelarEnvio = () => {
    setConfirmacionVisible(false);
  };

  const TratamientoFormulario = async () => {


    // Construye el objeto de datos de la cita
    const citasData = {
      NumeroDeCedula: numeroDeCedula,
      Especialidad: especialidad,
      Hora: hora,
    };

    try {
      // Envía la solicitud al servidor
      const response = await fetch(`${ API_BASE_URL }/api/citas/${dato._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(citasData),
      });

      if (response.ok) {
        setEnviado(true);
        // La solicitud fue exitosa
        setHora("")
        setnumeroDeCedula("")
        console.log('cita editada exitosamente');
      } else {
        // La solicitud no fue exitosa
        const errorResponse = await response.json();
        alert(errorResponse.message)
        throw new Error('Error 404: Recurso no encontrado');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      {enviado ? (
        <>
          <p className='text'>Cita Creada correctamente</p>
        </>
      ) : (
        <><h1>Citas</h1><form id="FormularioCita" onSubmit={preconfirmacion}>
                      <div className="mb-3">
                          <label htmlFor="numeroDeCedula" className="form-label">
                              Número de documento:
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              id="numeroDeCedula"
                              value={numeroDeCedula}
                              onChange={(e) => setnumeroDeCedula(e.target.value)}
                              required />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="especialidad" className="form-label">
                              Especialidad:
                          </label>
                          <select
                              className="form-select"
                              id="especialidad"
                              value={especialidad}
                              onChange={(e) => setEspecialidad(e.target.value)}
                          >
                              <option value="Medicina general">Medicina general</option>
                              <option value="Cardiología">Cardiología</option>
                              <option value="Medicina interna">Medicina interna</option>
                              <option value="Dermatología">Dermatología</option>
                              <option value="Rehabilitación física">Rehabilitación física</option>
                              <option value="Psicología">Psicología</option>
                              <option value="Odontología">Odontología</option>
                              <option value="Radiología">Radiología</option>
                          </select>
                      </div>

                      <div className="mb-3">
                          <label htmlFor="fecha" className="form-label">
                              Fecha:
                          </label>
                          <input
                              type="date"
                              className="form-control"
                              id="fecha"
                              value={hora}
                              onChange={(e) => setHora(e.target.value)}
                              required />
                      </div>

                      {confirmacionVisible && (
                          <div className="mb-3">
                              <p>¿Está seguro de enviar los datos?</p>
                              <button className="btn btn-primary m-1" onClick={confirmarEnvio}>
                                  Confirmar
                              </button>
                              <button className="btn btn-secondary" onClick={cancelarEnvio}>
                                  Cancelar
                              </button>
                          </div>
                      )}

                      {!confirmacionVisible && (
                          <button type="submit" className="btn btn-primary">
                              Editar Paciente
                          </button>
                      )}
                  </form></>
       )}
    </div>
  );
};

export default EditarrCitaForm;
