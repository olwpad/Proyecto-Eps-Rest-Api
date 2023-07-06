import { Schema,  model } from "mongoose";

const doctorSchema = new Schema({
  Nombre: {
    type: String,
    required: true
  },
  Apellido: {
    type: String,
    required: true
  },
  Doctorcedula :{
    type: String,
    required: true
  },
  Especialidad: {
    type: String,
    required: true
  },
  Consultorio: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  }
});





export default model("Doctor", doctorSchema);
