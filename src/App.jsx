import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, Nombre: "John", Apellido: "Smith", cedula: 111111 },
  { id: 2, Nombre: "Jane", Apellido: "Doe", cedula: 222222 },
  { id: 3, Nombre: "Michael", Apellido: "Johnson", cedula: 333333 },
  { id: 4, Nombre: "Emily", Apellido: "Brown", cedula: 444444 },
  { id: 5, Nombre: "Daniel", Apellido: "Davis", cedula: 555555 },
  { id: 6, Nombre: "Olivia", Apellido: "Miller", cedula: 666666 },
];


class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      Nombre: "",
      Apellido: "",
      cedula: "", 
    },
  };
  

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].Nombre = dato.Nombre;
        arreglo[contador].Apellido = dato.Apellido; 
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Estás Seguro que deseas Eliminar el elemento " + dato.id
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    const { Nombre } = this.state.form;
    
    if (this.validarNombreRepetido(Nombre)) {
      alert("El nombre ya existe. Por favor, ingrese otro nombre.");
      return;
    }

    const { Apellido } = this.state.form;
  if (this.validarApellidoRepetido(Apellido)) {
    alert("El apellido ya existe. Por favor, ingrese otro apellido.");
    return;
  }

  
    const valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    const lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };
  


  validarNombreRepetido = (nombre) => {
    const nombresExistentes = this.state.data.map((dato) => dato.Nombre);
    return nombresExistentes.includes(nombre);
  };

  validarApellidoRepetido = (apellido) => {
    const apellidosExistentes = this.state.data.map((dato) => dato.Apellido);
    return apellidosExistentes.includes(apellido);
  };
  
  

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
      <h1>Formulario</h1>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear
          </Button>
          <br />
          <br />
          <Table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Cédula</th> {/* Add the new column header */}
    </tr>
  </thead>

  <tbody>
    {this.state.data.map((dato) => (
      <tr key={dato.id}>
        <td>{dato.id}</td>
        <td>{dato.Nombre}</td>
        <td>{dato.Apellido}</td>
        <td>{dato.cedula}</td> {/* Add the new column value */}
        <td>
          <Button
            color="warning"
            onClick={() => this.mostrarModalActualizar(dato)}
          >
            Editar
          </Button>{" "}
          <Button color="danger" onClick={() => this.eliminar(dato)}>
            Eliminar
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Formulario</h3>
            </div>
          </ModalHeader>

          <ModalBody>
  <FormGroup>
    <label>ID:</label>
    <input
      className="form-control"
      readOnly
      type="text"
      value={this.state.form.id}
    />
  </FormGroup>

  <FormGroup>
    <label>Nombre:</label>
    <input
      className="form-control"
      name="Nombre"
      type="text"
      onChange={this.handleChange}
      value={this.state.form.Nombre}
    />
  </FormGroup>

  <FormGroup>
    <label>Apellido:</label>
    <input
      className="form-control"
      name="Apellido"
      type="text"
      onChange={this.handleChange}
      value={this.state.form.Apellido}
    />
  </FormGroup>

  <FormGroup>
    <label>Cédula:</label> {/* Add the input field for the "cedula" property */}
    <input
      className="form-control"
      name="cedula"
      type="number"
      onChange={this.handleChange}
      value={this.state.form.cedula}
    />
  </FormGroup>
</ModalBody>


          <ModalFooter>
            <Button color="warning" onClick={() => this.editar(this.state.form)}>
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Usuario</h3>
            </div>
          </ModalHeader>

          <ModalBody>
  <FormGroup>
    <label>ID:</label>
    <input
      className="form-control"
      readOnly
      type="text"
      value={this.state.form.id}
    />
  </FormGroup>

  <FormGroup>
    <label>Nombre:</label>
    <input
      className="form-control"
      name="Nombre"
      type="text"
      onChange={this.handleChange}
      value={this.state.form.Nombre}
    />
  </FormGroup>

  <FormGroup>
    <label>Apellido:</label>
    <input
      className="form-control"
      name="Apellido"
      type="text"
      onChange={this.handleChange}
      value={this.state.form.Apellido}
    />
  </FormGroup>

  <FormGroup>
    <label>Cédula:</label> {/* Add the input field for the "cedula" property */}
    <input
      className="form-control"
      name="cedula"
      type="number"
      onChange={this.handleChange}
      value={this.state.form.cedula}
    />
  </FormGroup>
</ModalBody>


          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
