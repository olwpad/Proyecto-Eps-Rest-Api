import { Request, Response, Router } from "express";
import DoctorModel from "../models/model-doctor";
import PacienteModel from "../models/model-paciente";
import CitasModel from "../models/Citas";
const router: Router = Router();

//DOCTOR
router.post('/doctor', async (req: Request, res: Response) => {
  const { nombre, apellido, especialidad, consultorio, email,numeroDeCedula } = req.body;

  try {
    const Doctor = await DoctorModel.findOne({  Doctorcedula:numeroDeCedula });
    if(Doctor){
      res.status(409).json({ message: 'El paciente ya esta registrado' });
      return;
    }
    const doctorData = new DoctorModel({
      Nombre: nombre,
      Apellido: apellido,
      Especialidad: especialidad,
      Consultorio: consultorio,
      Email: email,
      Doctorcedula:numeroDeCedula
    });
      const savedDoctor = await doctorData.save();
    res.status(200).json({ message: 'Doctor agregado exitosamente' });
    
    
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

//PACIENTE
router.post('/paciente', async (req: Request, res: Response) => {
  const { nombre, NumeroDeCedula, apellido, email, edad, telefono } = req.body;
  try {
    const pacient = await PacienteModel.findOne({NumeroDeCedula:NumeroDeCedula });
    if(pacient){
      res.status(409).json({ message: 'El Paciente ya  esta registrado' });
      return;
    }
    const pacienteData = new PacienteModel({
      Nombre: nombre,
      NumeroDeCedula: NumeroDeCedula,
      Apellido: apellido,
      Email: email,
      Edad: edad,
      Telefono: telefono
    });
    const savedDoctor = await pacienteData.save();
    res.status(200).json({ message: 'Paciente agregado exitosamente' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

//citas
router.post('/citas', async (req: Request, res: Response) => {
  const { NumeroDeCedula, especialidad, hora } = req.body;

  try {
    // Verificar si el paciente está registrado
    const paciente = await PacienteModel.findOne({ NumeroDeCedula :NumeroDeCedula });

    if (!paciente) {
      res.status(404).json({ message: 'No se encontró un paciente con ese número de cédula' });
      return;
    }
    // Buscar un doctor con la especialidad especificada
    const doctor = await DoctorModel.aggregate([
      { $match: { Especialidad: especialidad } },
      { $sample: { size: 1 } }
    ]);

    if (doctor.length === 0) {
      res.status(404).json({ message: 'No se encontró un doctor con esa especialidad' });
      return;
    }

    console.log(doctor[0]);

    // Crear el objeto de datos de la cita
    const citaData = new CitasModel({
      NumeroDeCedula: NumeroDeCedula,
      Especialidad: especialidad,
      cedulaDoctor: doctor[0].Doctorcedula,
      Hora: hora
    });

    // Guardar la cita en la base de datos
    const savedCita = await citaData.save();

    res.status(200).json({ message: 'Cita agregada exitosamente' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

//obtener datos 
router.get('/doctor/:documento', async (req, res) => {
  try {
    const data = await DoctorModel.findOne({Doctorcedula: req.params.documento });
    res.json(data);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/paciente/:documento', async (req, res) => {
  try {
    const data = await PacienteModel.findOne({NumeroDeCedula: req.params.documento });
    res.json(data);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/citas/:documento', async (req, res) => {
  try {
    const data = await CitasModel.findOne({
      $or: [
        { NumeroDeCedula: req.params.documento },
        { cedulaDoctor: req.params.documento }
      ]
    });
    res.json(data);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

//eliminar datos
router.delete('/paciente/:documento', async (req, res) => {
  try {
    const numeroDeCedula = req.params.documento;
    const data = await PacienteModel.findOneAndDelete({ NumeroDeCedula: numeroDeCedula });
    res.send(`Documento eliminado`);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/doctor/:documento', async (req, res) => {
  try {
    const numeroDeCedula = req.params.documento;
    const data = await DoctorModel.findOneAndDelete({ Doctorcedula: numeroDeCedula });
    res.send(`Documento eliminado`);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/citas/:documento', async (req, res) => {
  try {
    const data = await CitasModel.findOneAndDelete({
      $or: [
        { NumeroDeCedula: req.params.documento },
        { cedulaDoctor: req.params.documento }
      ]
    });
    res.json(data);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});


// obtener todos

router.get('/doctor', async(req,res)=>{
  try{
      const data=await DoctorModel.find();
      res.json(data)
  }catch(error:any){
      res.status(500).json({message:error.message})


  }
})

router.get('/citas', async(req,res)=>{
  try{
      const data=await CitasModel.find();
      res.json(data)
  }catch(error:any){
      res.status(500).json({message:error.message})


  }
})
router.get('/paciente', async(req,res)=>{
  try{
      const data=await PacienteModel.find();
      res.json(data)
  }catch(error:any){
      res.status(500).json({message:error.message})


  }
})
//EDITAR
router.put('/paciente/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };
    const result = await PacienteModel.findByIdAndUpdate(id, updateData, options);
    res.send(result);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/doctor/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };
    const result = await DoctorModel.findByIdAndUpdate(id, updateData, options);
    res.send(result);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});
router.put('/citas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };
    const result = await CitasModel.findByIdAndUpdate(id, updateData, options);
    res.send(result);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
