import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const Formulario = ({ crearCita }) => {
  const citaVacia = {
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  };
  
  // Crear State Citas
  const [cita, actualizarCita] = useState(citaVacia);

  const [error, actualizarError] = useState(false);

  // Función que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita
  const submitCita = e => {
    e.preventDefault();

    // validar
    const fields = [mascota, propietario, fecha, hora, sintomas];
    const isEmpty = field => field.trim() === '';

    if (fields.some(isEmpty)) {
      actualizarError(true);
      return;
    }
    // eliminar el mensaje previo
    actualizarError(false);

    // asignar ID
    cita.id = uuid();

    // crear la cita
    crearCita(cita);

    // reiniciar el form
    actualizarCita(citaVacia);
  };

  return (
    <>
      {error && (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      )}
      <h2>Crear cita</h2>
      <form onSubmit={submitCita}>
        <label htmlFor="">Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label htmlFor="">Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño/a de la Mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label htmlFor="">Fecha alta</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label htmlFor="">Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label htmlFor="">Síntomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary  ">
          Agregar Cita
        </button>
      </form>
    </>
  );
};

export default Formulario;
