import { Schema,  model } from "mongoose";
const pacienteSchema = new Schema({
    Nombre: {
      type: String,
      required: true
    },
    NumeroDeCedula: {
      type: String,
      required: true
    },
    Apellido: {
      type: String,
      required: true
    }, Email: {
      type: String,
      required: true
    },
    Edad: {
      type: String,
      required: true
    },
    Telefono: {
      type: String,
      required: true
    }

  });
  export default model("Paciente", pacienteSchema);