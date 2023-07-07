import AgregarDoctorForm from '../formularios/doctor';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AgregarPacienteForm from '../formularios/paciente';
import AgregarCitaForm from '../formularios/Citas';
import Buscador from '../Inicio/inicio';

const Header = () => {
  return (
    <header>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to='/inicio' className="navbar-brand">Inicio</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to='/doctor' className="nav-link">Doctor</Link>
                </li>
                <li className="nav-item">
                  <Link to='/paciente' className="nav-link">Paciente</Link>
                </li>
                <li className="nav-item">
                  <Link to='/cita' className="nav-link">Citas</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='/doctor' element={<AgregarDoctorForm />} />
          <Route path='/paciente' element={<AgregarPacienteForm />} />
          <Route path='/cita' element={<AgregarCitaForm />} />
          <Route path='/inicio' element={<Buscador />} />
          <Route index element={<Buscador />} />
        </Routes>
      </Router>
    </header>
  );
};

export default Header;
