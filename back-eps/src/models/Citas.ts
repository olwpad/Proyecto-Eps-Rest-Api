import { Schema,  model } from "mongoose";

const CitaSchema = new Schema({
    NumeroDeCedula: {
    type: String,
    required: true
  },
  Especialidad: {
    type: String,
    required: true
  },
    cedulaDoctor: {
    type: String,
    required: true
  },
   Hora: {
    type: String,
    required: true
  },
});





export default model("Citas", CitaSchema);
