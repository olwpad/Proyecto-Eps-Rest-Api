import React, { useState } from 'react';
import { API_BASE_URL } from '../config.js';
const EditarDoctorForm = ({dato}) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('Medicina general');
  const [consultorio, setConsultorio] = useState('');
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [numeroDeCedula, setNumeroDeCedula] = useState('');

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

  const TratamientoFormulario = async (event) => {
    

    // Construye el objeto de datos del doctor
    const doctorData = {
      Nombre: nombre,
      Apellido: apellido,
      Especialidad: especialidad,
      Consultorio: consultorio,
      Email: email,
      NumeroDeCedula:numeroDeCedula
    };

    try {
      // Envía la solicitud al servidor
      const response = await fetch(`${API_BASE_URL}/api/doctor/${dato._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctorData)
      });

      if (response.ok) {
        // La solicitud fue exitosa
        setEnviado(true);
        console.log('Doctor editado exitosamente');
        console.log(response)
        setApellido("")
        setEmail("")
        setNombre("")
        setNumeroDeCedula("")
        setConsultorio("")
      } else {
        // La solicitud no fue exitosa
        const errorResponse = await response.json();
        alert(errorResponse.message);
        throw new Error('Error 404: Recurso no encontrado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="container mt-5">
      {enviado ? (
          <p class="text-primary ">Doctor Editado correctamente</p>

      ) : (
        <><h1>Editar Doctor</h1>
        <form id="FormularioDoctor" onSubmit={preconfirmacion}>
                      <div className="mb-3">
                          <label htmlFor="PrimerNombre" className="form-label">Nombre:</label>
                          <input
                              type="text"
                              className="form-control"
                              id="PrimerNombre"
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}
                              required />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="PrimerApellido" className="form-label">Apellido:</label>
                          <input
                              type="text"
                              className="form-control"
                              id="PrimerApellido"
                              value={apellido}
                              onChange={(e) => setApellido(e.target.value)}
                              required />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="numeroDeCedula" className="form-label">
                              Numero de cedula:
                          </label>
                          <input
                              type="number"
                              className="form-control"
                              id="numeroDeCedula"
                              value={numeroDeCedula}
                              onChange={(e) => setNumeroDeCedula(e.target.value)}
                              required />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="Especialiadad" className="form-label">Especialidad:</label>
                          <select
                              className="form-select"
                              id="Especialiadad"
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
                          <label htmlFor="consultorio" className="form-label">Consultorio:</label>
                          <input
                              type="text"
                              className="form-control"
                              id="consultorio"
                              value={consultorio}
                              onChange={(e) => setConsultorio(e.target.value)}
                              required />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="email" className="form-label">Correo de contacto:</label>
                          <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
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
                              Editar doctor
                          </button>
                      )}
                  </form></>
        )}
    </div>
  );
};

export default EditarDoctorForm;
