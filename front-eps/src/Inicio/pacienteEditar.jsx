import React, { useState } from 'react';
import { API_BASE_URL } from '../config.js';
const EditarPacienteForm = ({dato}) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState("");
  const [numeroDeCedula, setNumeroDeCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
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
    // Construye el objeto de datos del paciente
    const pacienteData = {
      Nombre: nombre,
      Apellido: apellido,
      NumeroDeCedula: numeroDeCedula,
      Telefono: telefono,
      Email: email,
      Edad: edad
    };

    try {
      // Envía la solicitud al servidor
      const response = await fetch(`${ API_BASE_URL }/api/paciente/${dato._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacienteData)
      });

      if (response.ok) {
        // La solicitud fue exitosa
        setEnviado(true);

        setApellido("")
        setEdad("")
        setEmail("")
        setNombre("")
        setTelefono("")
        setNumeroDeCedula("")
        console.log('paciente EDITADO exitosamente');
      } else {
        // La solicitud no fue exitosa
        const errorResponse = await response.json();
        alert(errorResponse.message);
        throw new Error('Error 404: Recurso no  yo pri encontrado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);

    }
  };

  return (
    <div className="container mt-5">
      {enviado ? (
        <>
          <p  className='text-primary'>Paciente Editado correctamente</p>
        </>
      ) : (
        <><h1>Editar Paciente</h1>
        <form id="FormularioPaciente" onSubmit={preconfirmacion}>
                      <div className="mb-3">
                          <label htmlFor="PrimerNombre" className="form-label">
                              Nombre:
                          </label>
                          <input
                              type="text"
                              className="form-control"
                              id="PrimerNombre"
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}
                              required />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="PrimerApellido" className="form-label">
                              Apellido:
                          </label>
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
                          <label htmlFor="email" className="form-label">
                              Correo de contacto:
                          </label>
                          <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="edad" className="form-label">
                              Edad:
                          </label>
                          <input
                              type="text"
                              className="form-control"
                              id="edad"
                              value={edad}
                              onChange={(e) => setEdad(e.target.value)}
                              required />
                      </div>

                      <div className="mb-3">
                          <label htmlFor="Telefono" className="form-label">
                              Telefono:
                          </label>
                          <input
                              type="text"
                              className="form-control"
                              id="Telefono"
                              value={telefono}
                              onChange={(e) => setTelefono(e.target.value)}
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

export default EditarPacienteForm;
