import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Cita from './components/Cita';

function App() {
  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  

  //Citas 
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use effect para realizar operaciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas])

  //Funcion que toma las citas actuales y agregar la nueva
  const crearCita = (cita) => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //Funcion que elimina una cita
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay citas': 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form 
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                cita={cita}
                key={cita.id}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
