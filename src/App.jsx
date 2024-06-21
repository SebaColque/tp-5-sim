/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
// import equal from 'fast-deep-equal';
// import _ from 'lodash';


// OBJETOS PERMANENTES {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
class Surtidor {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónCombustible
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionCombustible(nuevoFinAtención) {
    this.finAtenciónCombustible = nuevoFinAtención;
  }
}

class Lavadero {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónLavadero
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionLavadero(nuevoFinAtención) {
    this.finAtenciónLavadero = nuevoFinAtención;
  }
}

class MantenimientoRapido {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónMantenimiento
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionMantenimiento(nuevoFinAtención) {
    this.finAtenciónMantenimiento = nuevoFinAtención;
  }
}

class Cajero {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónCajero
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionCajero(nuevoFinAtención) {
    this.finAtenciónCajero = nuevoFinAtención;
  }
}

class Kiosco {
  static colaComun = [];

  constructor() {
    this.estado = 'Libre';
    this.finAtenciónKiosco
  }
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarFinAtencionKiosco(nuevoFinAtención) {
    this.finAtenciónKiosco = nuevoFinAtención;
  }
}

// CLIENTE - OBJETO TEMPORAL {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
class Cliente {

  static contadorClientes = 0;

  constructor() {
    Cliente.contadorClientes++;
    this.estado = '';
    this.horaLlegada = null;
    this.posicionLlegada = null;
    this.servidorEnElQueEsta = null;
    this.horaFinAtencion = null;
    this.clienteId = Cliente.contadorClientes;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
  cambiarHoraLlegada(nuevoHoraLlegada) {
    this.horaLlegada = nuevoHoraLlegada;
  }
  cambiarPosicionLlegada(nuevaPosicionLlegada) {
    this.posicionLlegada = nuevaPosicionLlegada;
  }
  cambiarServidorEnElQueEsta(nuevoServidorEnElQueEsta) {
    this.servidorEnElQueEsta = nuevoServidorEnElQueEsta;
  }
  cambiarHoraFinAtencion(nuevaHoraFinAtencion) {
    this.horaFinAtencion = nuevaHoraFinAtencion;
  }
  cambiarClienteId(nuevoClienteId) {
    this.clienteId = nuevoClienteId;
  }

  static obtenerContadorClientes() {
    return Cliente.contadorClientes;
  }
}


function App() {
  // PARAMETRIZABLES {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [valoresFormulario, setValoresFormulario] = useState({
    lineasASimular: 2,
    lineaAVisualizar: 1,
    tasaAtencionSurtidor: 20,
    tasaAtencionLavadero: 10,
    tasaAtencionMantenimiento: 5,
    tasaAtencionCajero: 15,
    tasaAtencionKiosco: 30,
    tasaLlegadaCombustible: 30,
    tasaLlegadaLavadero: 15,
    tasaLlegadaMantenimiento: 10,
    tasaLlegadaCajero: 40
  });

  const [tiempoDeAtencion, setTiempoDeAtencion] = useState({
    combustible: 1 / valoresFormulario.tasaAtencionSurtidor,
    lavadero: 1 / valoresFormulario.tasaAtencionLavadero,
    mantenimiento: 1 / valoresFormulario.tasaAtencionMantenimiento,
    caja: 1 / valoresFormulario.tasaAtencionCajero,
    kiosco: 1 / valoresFormulario.tasaAtencionKiosco
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValoresFormulario({
      ...valoresFormulario,
      [name]: value
    });
  };

  const [mostrarTablas, setMostrarTablas] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    setTiempoDeAtencion({
      combustible: 1 / valoresFormulario.tasaAtencionSurtidor,
      lavadero: 1 / valoresFormulario.tasaAtencionLavadero,
      mantenimiento: 1 / valoresFormulario.tasaAtencionMantenimiento,
      caja: 1 / valoresFormulario.tasaAtencionCajero,
      kiosco: 1 / valoresFormulario.tasaAtencionKiosco
    })

    generarTabla();
    setMostrarTablas(true);
  };

  

  // SURTIDOR {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [surtidores, setSurtidores] = useState([
    new Surtidor(),
    new Surtidor(),
    new Surtidor(),
    new Surtidor()
  ]);


  // LAVADEROS {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [lavaderos, setLavaderos] = useState([
    new Lavadero(),
    new Lavadero()
  ]);


  // MANTENIMIENTO {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [mantenimientos, setMantenimientos] = useState([
    new MantenimientoRapido(),
    new MantenimientoRapido()
  ]);


  // CAJERO {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [cajeros, setCajeros] = useState([
    new Cajero(),
    new Cajero()
  ]);


  // KIOSCO {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [kioscos, setKioscos] = useState([
    new Kiosco(),
  ]);



  // CLIENTE {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [clientes, setClientes] = useState([]);


  // SIMULACIÓN {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}
  const [tablaDeSimulacion, setTablaDeSimulacion] = useState([])
  const [clientesDelSistema, setClientesDelSistema] = useState([])


  const encontrarProxHoraImportante = (obj) => {
    let proxNombre = null;
    let proxReloj = Infinity;
  
    for (const [nombre, valor] of Object.entries(obj)) {
      if (valor && valor < proxReloj) {
        proxReloj = valor;
        proxNombre = nombre;
      }
    }
  
    return { proxNombre, proxReloj };
  };


  let cantidadClientesIngresaronCombustible = 0
  let cantidadClientesIngresaronLavadero = 0
  let cantidadClientesIngresaronMantenimiento = 0
  let cantidadClientesIngresaronCaja = 0
  let cantidadClientesIngresaronKiosco = 0

  let clientesDelSistemaT = []

  const agregarClienteAServicio = (listaServicio, nombreClase, clase, setLista, horaFinAtencion, horaActual, finAtencionString) => {
      // console.log(Cliente.obtenerContadorClientes())

    let servicioLibreIndex = -1;

    for (let i = 0; i < listaServicio.length; i++) {
      if (listaServicio[i].estado === 'Libre') {
        servicioLibreIndex = i;
        break;
      }
    }
    
    const nuevoCliente = new Cliente();

    if (servicioLibreIndex !== -1) {
      listaServicio[servicioLibreIndex].cambiarEstado('Ocupado');
      nuevoCliente.cambiarEstado(`Cliente ${nuevoCliente.clienteId}-SA${nombreClase}-${servicioLibreIndex + 1}`);
      nuevoCliente.cambiarHoraFinAtencion(horaFinAtencion);
      nuevoCliente.cambiarServidorEnElQueEsta(servicioLibreIndex)
    } else {
      nuevoCliente.cambiarEstado(`Cliente ${nuevoCliente.clienteId}-EA${nombreClase}`);
    }

    nuevoCliente.cambiarPosicionLlegada(clase.colaComun.length);
    nuevoCliente.cambiarHoraLlegada(horaActual);

    clase.colaComun.push(nuevoCliente);
    // setClientes([...clientes, nuevoCliente]);
    // clientesDelSistemaT.push({...nuevoCliente})


    // !!!!!!
    // clientesDelSistemaT = clientesDelSistemaT.filter(cl => cl.estado !== '')
    // console.log(clientesDelSistemaT)
    // clientesDelSistemaT.push(nuevoCliente)



    // setClientesDelSistema([...clientesDelSistema, nuevoCliente])
    setLista([...listaServicio]);

    if(nombreClase == 'Surtidor'){
      cantidadClientesIngresaronCombustible += 1
    } else if(nombreClase == 'Kiosco'){
      cantidadClientesIngresaronKiosco += 1
    } else if(nombreClase == 'Lavadero'){
      cantidadClientesIngresaronLavadero += 1
    } else if(nombreClase == 'Mantenimiento'){
      cantidadClientesIngresaronMantenimiento += 1
    } else if(nombreClase == 'Caja'){
      cantidadClientesIngresaronCaja += 1
    }

    return [servicioLibreIndex, nuevoCliente]
  };

  
  let tiempoAcEsperaCombustible = 0 
  let tiempoAcEsperaLavadero = 0 
  let tiempoAcEsperaMantenimiento = 0 
  let tiempoAcEsperaCaja = 0 
  let tiempoAcEsperaKiosco = 0 

  let acClientesAtendidosCombustible = 0
  let acClientesAtendidosLavadero = 0
  let acClientesAtendidosMantenimiento = 0
  let acClientesAtendidosCaja = 0
  let acClientesAtendidosKiosco = 0


  function compararObjetos(objeto1, objeto2) {
    // Comprobar si ambos objetos son nulos
    if (objeto1 === null && objeto2 === null) {
      return true;
    }
  
    // Comprobar si solo uno de los objetos es nulo
    if (objeto1 === null || objeto2 === null) {
      return false;
    }
  
    // Comprobar si los tipos de los objetos son diferentes
    if (typeof objeto1 !== typeof objeto2) {
      return false;
    }
  
    // Si son objetos simples, comparar valores primitivos
    if (typeof objeto1 === 'string' || typeof objeto1 === 'number' || typeof objeto1 === 'boolean') {
      return objeto1 === objeto2;
    }
  
    // Si son arrays, comparar recursivamente cada elemento
    if (Array.isArray(objeto1) && Array.isArray(objeto2)) {
      if (objeto1.length !== objeto2.length) {
        return false;
      }
  
      for (let i = 0; i < objeto1.length; i++) {
        if (!compararObjetos(objeto1[i], objeto2[i])) {
          return false;
        }
      }
  
      return true;
    }
  }


  const finAtencionServicio = (clase, nombreServicio, indiceServicio, reloj, servicios, tasaAtencionServicio) => {
    let horaFin 

    const indiceClienteEliminadoServicio = clase.colaComun.findIndex(cliente => cliente.horaFinAtencion === reloj);

    if(indiceClienteEliminadoServicio < 0) {
      return horaFin
    }

    const intercambiar = clase.colaComun.length > servicios.length
    const clienteEliminado = clase.colaComun.splice(indiceClienteEliminadoServicio, 1)[0];

    // const clientesMap = new Map(clientesDelSistemaT.map(cliente => [cliente.horaLlegada, cliente]));
    // const clienteEnElSistema = clientesDelSistemaT.map(c => c).find(cl => compararObjetos(clienteEliminado, cl))
    // const clienteEnElSistema = Array.from(clientesMap.values()).find(cl => compararObjetos(clienteEliminado, cl));
    // const clienteEnElSistema = Array.from(clientesMap.values()).find(cl => equal(clienteEliminado, cl));
    // const clienteEnElSistema = Array.from(clientesMap.values()).find(cl => _.isEqual(clienteEliminado, cl));
    // const clienteEnElSistema = clientesMap.get(clienteEliminado.horaLlegada);
    
    // clientesDelSistemaT = clientesDelSistemaT.filter(cl => cl.estado !== '')

    // const clienteEnElSistema = clientesDelSistemaT.find(c => c.horaLlegada == clienteEliminado.horaLlegada)
    // const clienteEnElSistema = clientesDelSistemaT.findIndex(c => c.horaLlegada == clienteEliminado.horaLlegada)
    // const clienteEnElSistema = clientesDelSistemaT.map(c => c).findIndex(cl => compararObjetos(clienteEliminado, cl))
    // console.log(clientesDelSistemaT.map(c=>c))
    // console.log(clientesDelSistemaT)

    // if(clienteEnElSistema){
    //   clientesDelSistemaT.splice(clienteEnElSistema, 1)
    //   // clienteEnElSistema = null
    //   // clienteEnElSistema['estado'] = ''
    //   // clienteEnElSistema['horaLlegada'] = ''
    // }

    clienteEliminado.cambiarEstado('')
    clienteEliminado.cambiarHoraLlegada('')
    clienteEliminado.cambiarPosicionLlegada('')
    clienteEliminado.cambiarServidorEnElQueEsta('')
    clienteEliminado.cambiarHoraFinAtencion('')

    if(nombreServicio == 'Kiosco'){
      acClientesAtendidosKiosco += 1
    } else if(nombreServicio == 'Surtidor'){
      acClientesAtendidosCombustible += 1
    } else if(nombreServicio == 'Lavadero'){
      acClientesAtendidosLavadero += 1
    } else if(nombreServicio == 'Mantenimiento'){
      acClientesAtendidosMantenimiento += 1
    } else if(nombreServicio == 'Caja'){
      acClientesAtendidosCaja += 1
    }
  
    if (intercambiar) {
        const siguienteCliente = clase.colaComun.find(cliente => !cliente.horaFinAtencion)
        
        // const clientesMap = new Map(clientesDelSistemaT.map(cliente => [cliente.horaLlegada, cliente]));

        // const clienteEnElSistema = clientesDelSistemaT.map(c => c).find(cl => compararObjetos(clienteEliminado, cl))
        // const clienteEnElSistema = Array.from(clientesMap.values()).find(cl => compararObjetos(clienteEliminado, cl));
        // const clienteEnElSistema = Array.from(clientesMap.values()).find(cl => equal(clienteEliminado, cl));
        // const clienteEnElSistema = Array.from(clientesMap.values()).find(cl => _.isEqual(clienteEliminado, cl));
        // const clienteEnElSistema = clientesMap.get(clienteEliminado.horaLlegada);

        // const clienteEnElSistema2 = clientesDelSistemaT.find(c => c.horaLlegada == siguienteCliente.horaLlegada)


        servicios[indiceServicio-1].cambiarEstado('Ocupado');
        siguienteCliente.cambiarEstado(`Cliente ${siguienteCliente.clienteId}-SA${nombreServicio}-${indiceServicio}`)
        siguienteCliente.cambiarServidorEnElQueEsta(indiceServicio-1)
        horaFin = parseFloat((parseFloat(reloj) + parseFloat(1/tasaAtencionServicio)))
          // if(clienteEnElSistema2){
          //   clienteEnElSistema2['estado'] = `Cliente ${clienteEnElSistema2.clienteId}-SA${nombreServicio}-${indiceServicio}`
          //   clienteEnElSistema2['servidorEnElQueEsta'] = indiceServicio-1
          //   clienteEnElSistema2['horaFinAtencion'] = horaFin
          // }
        siguienteCliente.cambiarHoraFinAtencion(horaFin) 


        if(nombreServicio == 'Kiosco'){
          tiempoAcEsperaKiosco += reloj - siguienteCliente.horaLlegada
        } else if(nombreServicio == 'Surtidor'){
          tiempoAcEsperaCombustible += reloj - siguienteCliente.horaLlegada
        } else if(nombreServicio == 'Lavadero'){
          tiempoAcEsperaLavadero += reloj - siguienteCliente.horaLlegada
        } else if(nombreServicio == 'Mantenimiento'){
          tiempoAcEsperaMantenimiento += reloj - siguienteCliente.horaLlegada
        } else if(nombreServicio == 'Caja'){
          tiempoAcEsperaCaja += reloj - siguienteCliente.horaLlegada
        }

        } else{
          servicios[indiceServicio-1].cambiarEstado('Libre')
        }
        
    return horaFin;
  };
  

  let acTiempoOcupacionCombustible = 0
  let acTiempoOcupacionLavadero = 0
  let acTiempoOcupacionMantenimiento = 0
  let acTiempoOcupacionCaja = 0
  let acTiempoOcupacionKiosco = 0

  let cantidadClientes = 0


  // TP 5 NUEVO 
  let proximoCorteEnergia = 0
  const t = 5
  function calcularProximoCorte(t, reloj) {
    const random = Math.random();
    
    let nuevoTiempo;
    
    if (random < 0.2) {
      nuevoTiempo = 4 * t;
    } else if (random < 0.8) {
      nuevoTiempo = 6 * t;
    } else {
      nuevoTiempo = 8 * t;
    }
    
    // console.log(random, t, reloj)

    return (reloj + nuevoTiempo) / 60;
  }

  function tiempoEnfriamentoLLaveTermica(reloj, paso) {
    let c = reloj * 60;
    let t = 0;
    const resultados = [{ t, c }];

    const f = (t, c) => 0.025 * t - 0.5 * c - 12.85;

    while (c >= 0) {
      const k1 = paso * f(t, c);
      const k2 = paso * f(t + paso / 2, c + k1 / 2);
      const k3 = paso * f(t + paso / 2, c + k2 / 2);
      const k4 = paso * f(t + paso, c + k3);

      c += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      t += paso;

      resultados.push({ t, c });
    }

    return t * 30 / 60 / 60
  }

  function suspenderServicio(tiempoDeEnfriamiento){
    kioscos[0].cambiarEstado('Suspendido')


    const indiceClienteASuspender = Kiosco.colaComun.findIndex(cliente => cliente.estado.includes('SAKiosco'));
    
    if(indiceClienteASuspender < 0) {
      return
    }

    const clienteASuspender = Kiosco.colaComun.find(cliente => cliente.estado.includes('SAKiosco'));

    clienteASuspender.cambiarEstado(`Cliente ${clienteASuspender.clienteId}-EAKioscoSuspendido`)
    clienteASuspender.cambiarHoraFinAtencion(clienteASuspender.horaFinAtencion + tiempoDeEnfriamiento)

  }

  function reanudarServicio(){
    const indiceClienteAReanudar = Kiosco.colaComun.findIndex(cliente => cliente.estado.includes('EAKioscoSuspendido'));
    
    if(indiceClienteAReanudar < 0) {
      kioscos[0].cambiarEstado('Libre')
      return
    }

    const clienteAReanudar = Kiosco.colaComun.find(cliente => cliente.estado.includes('EAKioscoSuspendido'));

    clienteAReanudar.cambiarEstado(`Cliente ${clienteAReanudar.clienteId}-SAKiosco-1`)
    // clienteASuspender.cambiarHoraFinAtencion(horaFinEnfriamiento)

    kioscos[0].cambiarEstado('Ocupado')
  }
  

  const generarTabla = () => {
    const tabla = [];

    let evento = 'Inicialización'
    let reloj = 0

    const horasImportantes = {
      llegadaClienteCombustible: 0,
      llegadaClienteLavadero: 0,
      llegadaClienteMantenimiento: 0,
      llegadaClienteCaja: 0,
  
      llegadaClienteKiosco: null,
  
      finAtencionKiosco1: null,
      finAtencionCombustible1: null,
      finAtencionCombustible2: null,
      finAtencionCombustible3: null,
      finAtencionCombustible4: null,
      finAtencionLavadero1: null,
      finAtencionLavadero2: null,
      finAtencionMantenimiento1: null,
      finAtencionMantenimiento2: null,
      finAtencionCaja1: null,
      finAtencionCaja2: null,

      corteEnergia: null,
      finEnfriamientoLlave: null,
    }

      let estadosSurtidoresAnterior = []
      let estadosSLavaderoAnterior = []
      let estadosMantenimientoAnterior = []
      let estadosCajaAnterior = []
      let estadosKioscoAnterior = []
      let relojAnterior = 0

      let clientesSistemas = []
    
    for(var i = 0; i < valoresFormulario.lineasASimular; i++){
      let llegadaClienteCombustibleRND
      let llegadaClienteCombustibleTiempoEntreLlegadas

      let llegadaClienteLavaderoRND
      let llegadaClienteLavaderoTiempoEntreLlegadas

      let llegadaClienteMantenimientoRND
      let llegadaClienteMantenimientoTiempoEntreLlegadas

      let llegadaClienteCajaRND
      let llegadaClienteCajaTiempoEntreLlegadas

      let rndVaKiosco


      // console.log(i)
      
      
      if(i == 0){

        evento = 'Inicialización'
        reloj = 0

        llegadaClienteCombustibleRND = parseFloat(Math.random())
        llegadaClienteCombustibleTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaCombustible * Math.log(1-llegadaClienteCombustibleRND)
        horasImportantes.llegadaClienteCombustible = reloj + llegadaClienteCombustibleTiempoEntreLlegadas

        llegadaClienteLavaderoRND = parseFloat(Math.random())
        llegadaClienteLavaderoTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaLavadero * Math.log(1-llegadaClienteLavaderoRND)
        horasImportantes.llegadaClienteLavadero = reloj + llegadaClienteLavaderoTiempoEntreLlegadas

        llegadaClienteMantenimientoRND = parseFloat(Math.random())
        llegadaClienteMantenimientoTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaMantenimiento * Math.log(1-llegadaClienteMantenimientoRND)
        horasImportantes.llegadaClienteMantenimiento = reloj + llegadaClienteMantenimientoTiempoEntreLlegadas

        llegadaClienteCajaRND = parseFloat(Math.random())
        llegadaClienteCajaTiempoEntreLlegadas = -1/valoresFormulario.tasaLlegadaCajero * Math.log(1-llegadaClienteCajaRND)
        horasImportantes.llegadaClienteCaja = reloj + llegadaClienteCajaTiempoEntreLlegadas

        const estadosSurtidores = surtidores.map((surtidor) => surtidor.estado);

        proximoCorteEnergia = calcularProximoCorte(t, reloj)
        horasImportantes.corteEnergia = proximoCorteEnergia

        tabla.push({
          evento: evento,
          reloj: 0,
  
          rndLlegadaCombustible: parseFloat(llegadaClienteCombustibleRND.toFixed(4)),
          tiempoEntreLlegadasCombustible: parseFloat(llegadaClienteCombustibleTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaCombustible: parseFloat(reloj) + parseFloat(llegadaClienteCombustibleTiempoEntreLlegadas.toFixed(4)),

          rndLlegadaLavadero: parseFloat(llegadaClienteLavaderoRND.toFixed(4)),
          tiempoEntreLlegadasLavadero: parseFloat(llegadaClienteLavaderoTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaLavadero: parseFloat(reloj) + parseFloat(llegadaClienteLavaderoTiempoEntreLlegadas.toFixed(4)),
  
          rndLlegadaMantenimiento: parseFloat(llegadaClienteMantenimientoRND.toFixed(4)),
          tiempoEntreLlegadasMantenimiento: parseFloat(llegadaClienteMantenimientoTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaMantenimiento: parseFloat(reloj) + parseFloat(llegadaClienteMantenimientoTiempoEntreLlegadas.toFixed(4)),

          rndLlegadaCaja: parseFloat(llegadaClienteCajaRND.toFixed(4)),
          tiempoEntreLlegadasCaja: parseFloat(llegadaClienteCajaTiempoEntreLlegadas.toFixed(4)),
          proximaLlegadaCaja: parseFloat(reloj) + parseFloat(llegadaClienteCajaTiempoEntreLlegadas.toFixed(4)),
          
          rndVaKiosco: '',
          vaKiosco: '',
          finAtencionKiosco1: '',

          finAtencionCombustible1: '',
          finAtencionCombustible2: '',
          finAtencionCombustible3: '',
          finAtencionCombustible4: '',

          finAtencionLavadero1: '',
          finAtencionLavadero2: '',

          finAtencionMantenimiento1: '',
          finAtencionMantenimiento2: '',

          finAtencionCaja1: '',
          finAtencionCaja2: '',

          corteEnergia: parseFloat(proximoCorteEnergia).toFixed(4),
          finEnfriamientoLlave: '',

          surtidor1: estadosSurtidores[0],
          surtidor2: estadosSurtidores[1],
          surtidor3: estadosSurtidores[2],
          surtidor4: estadosSurtidores[3],
          colaCombustible: Surtidor.colaComun.length,

          lavadero1: lavaderos[0].estado,
          lavadero2: lavaderos[1].estado,
          colaLavadero: Lavadero.colaComun.length,

          mantenimiento1: mantenimientos[0].estado,
          mantenimiento2: mantenimientos[1].estado,
          colaMantenimiento: MantenimientoRapido.colaComun.length,

          caja1: cajeros[0].estado,
          caja2: cajeros[1].estado,
          colaCaja: Cajero.colaComun.length,

          kiosco1: kioscos[0].estado,
          colaKiosco: Kiosco.colaComun.length,


          servicioMasRapido: '',
          
          acTiempoEsperaCombustible: 0,
          acTiempoEsperaLavadero: 0,
          acTiempoEsperaMantenimiento: 0,
          acTiempoEsperaCaja: 0,
          acTiempoEsperaKiosco: 0,

          acClientesIngresanCombustible: 0,
          acClientesIngresanLavadero: 0,
          acClientesIngresanMantenimiento: 0,
          acClientesIngresanCaja: 0,
          acClientesIngresanKiosco: 0,

          tiempoPromedioPermanenciaColaCombustible: 0,
          tiempoPromedioPermanenciaColaLavadero: 0,
          tiempoPromedioPermanenciaColaMantenimiento: 0,
          tiempoPromedioPermanenciaColaCaja: 0,
          tiempoPromedioPermanenciaColaKiosco: 0,

          acTiempoOcupacionCombustible: 0,
          porcentajeOcupacionCombustible: 0,
          acTiempoOcupacionLavadero: 0,
          porcentajeOcupacionLavadero: 0,
          acTiempoOcupacionMantenimiento: 0,
          porcentajeOcupacionMantenimiento: 0,
          acTiempoOcupacionCaja: 0,
          porcentajeOcupacionCaja: 0,
          acTiempoOcupacionKiosco: 0,
          porcentajeOcupacionKiosco: 0,

          acClientesAtendidosCombustible: 0,
          acClientesAtendidosLavadero: 0,
          acClientesAtendidosMantenimiento: 0,
          acClientesAtendidosCaja: 0,
          acClientesAtendidosKiosco: 0,

          servicioConMasCola: '',

          clientesSistema: []
        })
      } else{

        // console.log(i % 1000 == 0 ? i : '')
        // if(i % 1000 == 0){
        //   // console.log(cods)
        //   clientesDelSistemaT.splice(0, 500);
        //   // console.log(clientesDelSistemaT)
        // }

        const proximoEvento = encontrarProxHoraImportante(horasImportantes);

        evento = proximoEvento.proxNombre
        reloj = proximoEvento.proxReloj

        if (evento == 'llegadaClienteCombustible'){

          llegadaClienteCombustibleRND = parseFloat(Math.random())
          llegadaClienteCombustibleTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaCombustible * Math.log(1-llegadaClienteCombustibleRND)))
          horasImportantes.llegadaClienteCombustible = parseFloat(reloj) + llegadaClienteCombustibleTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionSurtidor)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(surtidores, 'Surtidor', Surtidor, setSurtidores, horaFinAtencion, reloj, 'finAtencionCombustible', horasImportantes)
            clientesSistemas.push(nuevoCliente)

            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionCombustible${indiceServicioLibre+1}`] = horaFinAtencion
            }

          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            clientesSistemas.push(nuevoCliente)

            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }
          

        } else if(evento == 'llegadaClienteLavadero'){
          llegadaClienteLavaderoRND = parseFloat(Math.random())
          llegadaClienteLavaderoTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaLavadero * Math.log(1-llegadaClienteLavaderoRND)))
          horasImportantes.llegadaClienteLavadero = parseFloat(reloj) + llegadaClienteLavaderoTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionLavadero)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(lavaderos, 'Lavadero', Lavadero, setLavaderos, horaFinAtencion, reloj)
            clientesSistemas.push(nuevoCliente)
            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionLavadero${indiceServicioLibre+1}`] = horaFinAtencion
            }
            
          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            clientesSistemas.push(nuevoCliente)

            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }

        } else if(evento == 'llegadaClienteMantenimiento'){
          llegadaClienteMantenimientoRND = parseFloat(Math.random())
          llegadaClienteMantenimientoTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaMantenimiento * Math.log(1-llegadaClienteMantenimientoRND)))
          horasImportantes.llegadaClienteMantenimiento = parseFloat(reloj) + llegadaClienteMantenimientoTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionMantenimiento)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(mantenimientos, 'Mantenimiento', MantenimientoRapido, setMantenimientos, horaFinAtencion, reloj)
            clientesSistemas.push(nuevoCliente)

            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionMantenimiento${indiceServicioLibre+1}`] = horaFinAtencion
            }
          
          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            clientesSistemas.push(nuevoCliente)

            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }

        } else if(evento == 'llegadaClienteCaja'){
          llegadaClienteCajaRND = parseFloat(Math.random())
          llegadaClienteCajaTiempoEntreLlegadas = parseFloat((-1/valoresFormulario.tasaLlegadaCajero * Math.log(1-llegadaClienteCajaRND)))
          horasImportantes.llegadaClienteCaja = parseFloat(reloj) + llegadaClienteCajaTiempoEntreLlegadas
          
          rndVaKiosco = Math.random()
          if(rndVaKiosco >= 0.25){

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionCajero)
            // const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(cajeros, 'Cajero', Cajero, setCajeros, horaFinAtencion, reloj)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(cajeros, 'Caja', Cajero, setCajeros, horaFinAtencion, reloj)
            clientesSistemas.push(nuevoCliente)

            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionCaja${indiceServicioLibre+1}`] = horaFinAtencion
            }
            
          } else{

            const horaFinAtencion = parseFloat(reloj) + parseFloat(1/valoresFormulario.tasaAtencionKiosco)
            const [indiceServicioLibre, nuevoCliente] = agregarClienteAServicio(kioscos, 'Kiosco', Kiosco, setKioscos, horaFinAtencion, reloj)
            clientesSistemas.push(nuevoCliente)

            if(indiceServicioLibre >= 0){
              horasImportantes[`finAtencionKiosco${indiceServicioLibre+1}`] = horaFinAtencion
            }

          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionKiosco'){
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Kiosco, 'Kiosco', indiceFinalTexto, reloj, kioscos, valoresFormulario.tasaAtencionKiosco)
          

          horasImportantes[`finAtencionKiosco${indiceFinalTexto}`] = null
          if(horaFin){
            horasImportantes[`finAtencionKiosco${indiceFinalTexto}`] = horaFin
          }

        } else if(evento.substring(0,evento.length-1) == 'finAtencionCombustible'){
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Surtidor, 'Surtidor', indiceFinalTexto, reloj, surtidores, valoresFormulario.tasaAtencionSurtidor)

          if(horaFin){
            horasImportantes[`finAtencionCombustible${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionCombustible${indiceFinalTexto}`] = null
          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionLavadero'){
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Lavadero, 'Lavadero', indiceFinalTexto, reloj, lavaderos, valoresFormulario.tasaAtencionLavadero)

          if(horaFin){
            horasImportantes[`finAtencionLavadero${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionLavadero${indiceFinalTexto}`] = null
          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionMantenimiento'){
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(MantenimientoRapido, 'Mantenimiento', indiceFinalTexto, reloj, mantenimientos, valoresFormulario.tasaAtencionMantenimiento)

          if(horaFin){
            horasImportantes[`finAtencionMantenimiento${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionMantenimiento${indiceFinalTexto}`] = null
          }
        } else if(evento.substring(0,evento.length-1) == 'finAtencionCaja'){
          const indiceFinalTexto = evento.substring(evento.length-1,evento.length)
          const horaFin = finAtencionServicio(Cajero, 'Caja', indiceFinalTexto, reloj, cajeros, valoresFormulario.tasaAtencionCajero)

          if(horaFin){
            horasImportantes[`finAtencionCaja${indiceFinalTexto}`] = horaFin
          }else{
            horasImportantes[`finAtencionCaja${indiceFinalTexto}`] = null
          }
        } else if(evento == 'corteEnergia'){

          // console.log(reloj)
          let tiempoDeEnfriamiento = tiempoEnfriamentoLLaveTermica(reloj, 0.00001)
          horasImportantes.finEnfriamientoLlave = reloj + tiempoDeEnfriamiento
          horasImportantes.corteEnergia = null
          suspenderServicio(tiempoDeEnfriamiento)
          horasImportantes.finAtencionKiosco1 = horasImportantes.finAtencionKiosco1 ? horasImportantes.finAtencionKiosco1 + tiempoDeEnfriamiento : null
        
        } else if(evento == 'finEnfriamientoLlave'){
          horasImportantes.finEnfriamientoLlave = null

          proximoCorteEnergia = calcularProximoCorte(t, reloj)
          horasImportantes.corteEnergia = reloj + proximoCorteEnergia

          reanudarServicio()
        }



        const estadosSurtidores = surtidores.map((surtidor) => surtidor.estado);
        const horaFinSurtidores = [horasImportantes.finAtencionCombustible1,
          horasImportantes.finAtencionCombustible2,
          horasImportantes.finAtencionCombustible3,
          horasImportantes.finAtencionCombustible4,
        ]


        const estadosLavaderos = lavaderos.map((lavadero) => lavadero.estado);
        const horaFinLavaderos = [horasImportantes.finAtencionLavadero1,
          horasImportantes.finAtencionLavadero2
        ]

        const estadosMantenimiento = mantenimientos.map((mantenimiento) => mantenimiento.estado);
        const horaFinMantenimiento = [horasImportantes.finAtencionMantenimiento1,
          horasImportantes.finAtencionMantenimiento2
        ]


        const estadosCaja = cajeros.map((caja) => caja.estado);
        const horaFinCaja = [horasImportantes.finAtencionCaja1,
          horasImportantes.finAtencionCaja2
        ]


        const estadosKiosco = kioscos.map((kisoco) => kisoco.estado);
        const horaFinKiosco = [horasImportantes.finAtencionKiosco1]


        const cantClinesEnColaPorServicio = {
          'Surtidor': Surtidor.colaComun.length < 4 ? 0 : Surtidor.colaComun.length - 4,
          'Lavadero': Lavadero.colaComun.length < 2 ? 0 : Lavadero.colaComun.length - 2,
          'Mantenimiento': MantenimientoRapido.colaComun.length < 2 ? 0 : MantenimientoRapido.colaComun.length - 2,
          'Caja': Cajero.colaComun.length < 2 ? 0 : Cajero.colaComun.length - 2,
          'Kiosco': Kiosco.colaComun.length < 1 ? 0 : Kiosco.colaComun.length - 1,
        }
        const minCola = Math.min(...Object.values(cantClinesEnColaPorServicio));

        const serviciosConMenorCola = Object.keys(cantClinesEnColaPorServicio)
          .filter(servicio => cantClinesEnColaPorServicio[servicio] === minCola);

        const resultadoMenorCola = serviciosConMenorCola.join('-');
        
        acTiempoOcupacionCombustible += estadosSurtidoresAnterior.some(estado => estado == 'Ocupado') ? reloj -  relojAnterior: 0
        acTiempoOcupacionLavadero += estadosSLavaderoAnterior.some(estado => estado == 'Ocupado') ? reloj -  relojAnterior: 0
        acTiempoOcupacionMantenimiento += estadosMantenimientoAnterior.some(estado => estado == 'Ocupado') ? reloj -  relojAnterior: 0
        acTiempoOcupacionCaja += estadosCajaAnterior.some(estado => estado == 'Ocupado') ? reloj -  relojAnterior: 0
        acTiempoOcupacionKiosco += estadosKioscoAnterior.some(estado => estado == 'Ocupado') ? reloj -  relojAnterior: 0


        const maxCola = Math.max(...Object.values(cantClinesEnColaPorServicio));

        const serviciosConMayorCola = Object.keys(cantClinesEnColaPorServicio)
          .filter(servicio => cantClinesEnColaPorServicio[servicio] === maxCola);
        const resultadoMayorCola = serviciosConMayorCola.join('-');

        // console.log(reloj)
        // console.log(clientesDelSistemaT.map(c=>c))
        // clientesDelSistemaT = clientesDelSistemaT.filter(cl => cl.estado !== '')
        // console.log(clientesDelSistemaT.map(c=>c))

        const clS = [...Surtidor.colaComun].concat([...Lavadero.colaComun]).concat([...MantenimientoRapido.colaComun]).concat([...Cajero.colaComun]).concat([...Kiosco.colaComun])
        // cantidadClientes = clS.filter(c=>c.estado).length
        // console.log(clS)

        tabla.push({
          evento: evento,
          reloj: parseFloat(reloj).toFixed(4),
  
          rndLlegadaCombustible: evento=='llegadaClienteCombustible' ? parseFloat(llegadaClienteCombustibleRND.toFixed(4)) : '',
          tiempoEntreLlegadasCombustible: evento=='llegadaClienteCombustible' ? parseFloat(llegadaClienteCombustibleTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaCombustible: parseFloat(horasImportantes.llegadaClienteCombustible.toFixed(4)),

          rndLlegadaLavadero: evento=='llegadaClienteLavadero' ? parseFloat(llegadaClienteLavaderoRND.toFixed(4)): '',
          tiempoEntreLlegadasLavadero: evento=='llegadaClienteLavadero' ? parseFloat(llegadaClienteLavaderoTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaLavadero: parseFloat(horasImportantes.llegadaClienteLavadero.toFixed(4)),

          rndLlegadaMantenimiento: evento=='llegadaClienteMantenimiento' ? parseFloat(llegadaClienteMantenimientoRND.toFixed(4)): '',
          tiempoEntreLlegadasMantenimiento: evento=='llegadaClienteMantenimiento' ? parseFloat(llegadaClienteMantenimientoTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaMantenimiento: parseFloat(horasImportantes.llegadaClienteMantenimiento.toFixed(4)),

          rndLlegadaCaja: evento=='llegadaClienteCaja' ? parseFloat(llegadaClienteCajaRND.toFixed(4)): '',
          tiempoEntreLlegadasCaja: evento=='llegadaClienteCaja' ? parseFloat(llegadaClienteCajaTiempoEntreLlegadas.toFixed(4)) : '',
          proximaLlegadaCaja: parseFloat(horasImportantes.llegadaClienteCaja.toFixed(4)),
  
          rndVaKiosco: evento.substring(0,7)=='llegada' 
                        ? rndVaKiosco ? parseFloat(rndVaKiosco).toFixed(4) : ''
                        : '',
          vaKiosco: evento.substring(0,7)=='llegada'  
                        ? rndVaKiosco >= 0.25 ? 'No' : 'Sí'
                        : '',
          finAtencionKiosco1: horaFinKiosco[0] ? parseFloat(horaFinKiosco[0]).toFixed(4) : '',

          finAtencionCombustible1: horaFinSurtidores[0] ? parseFloat(horaFinSurtidores[0]).toFixed(4) : '',
          finAtencionCombustible2: horaFinSurtidores[1] ? parseFloat(horaFinSurtidores[1]).toFixed(4) : '',
          finAtencionCombustible3: horaFinSurtidores[2] ? parseFloat(horaFinSurtidores[2]).toFixed(4) : '',
          finAtencionCombustible4: horaFinSurtidores[3] ? parseFloat(horaFinSurtidores[3]).toFixed(4) : '',

          finAtencionLavadero1: horaFinLavaderos[0] ? parseFloat(horaFinLavaderos[0]).toFixed(4) : '',
          finAtencionLavadero2: horaFinLavaderos[1] ? parseFloat(horaFinLavaderos[1]).toFixed(4) : '',

          finAtencionMantenimiento1: horaFinMantenimiento[0] ? parseFloat(horaFinMantenimiento[0]).toFixed(4) : '',
          finAtencionMantenimiento2: horaFinMantenimiento[1] ? parseFloat(horaFinMantenimiento[1]).toFixed(4) : '',

          finAtencionCaja1: horaFinCaja[0] ? parseFloat(horaFinCaja[0]).toFixed(4) : '',
          finAtencionCaja2: horaFinCaja[1] ? parseFloat(horaFinCaja[1]).toFixed(4) : '',

          corteEnergia: horasImportantes.corteEnergia ? parseFloat(horasImportantes.corteEnergia).toFixed(4) : '',
          finEnfriamientoLlave: horasImportantes.finEnfriamientoLlave ? parseFloat(horasImportantes.finEnfriamientoLlave).toFixed(4) : '',

          surtidor1: estadosSurtidores[0],
          surtidor2: estadosSurtidores[1],
          surtidor3: estadosSurtidores[2],
          surtidor4: estadosSurtidores[3],
          colaCombustible: Surtidor.colaComun.length < 4 ? 0 : Surtidor.colaComun.length - 4,

          lavadero1: estadosLavaderos[0],
          lavadero2: estadosLavaderos[1],
          colaLavadero: Lavadero.colaComun.length < 2 ? 0 : Lavadero.colaComun.length - 2,

          mantenimiento1: estadosMantenimiento[0],
          mantenimiento2: estadosMantenimiento[1],
          colaMantenimiento: MantenimientoRapido.colaComun.length < 2 ? 0 : MantenimientoRapido.colaComun.length - 2,

          caja1: estadosCaja[0],
          caja2: estadosCaja[1],
          colaCaja: Cajero.colaComun.length < 2 ? 0 : Cajero.colaComun.length - 2,

          kiosco1: estadosKiosco[0],
          colaKiosco: Kiosco.colaComun.length < 1 ? 0 : Kiosco.colaComun.length - 1,

          servicioMasRapido: resultadoMenorCola,
          
          acTiempoEsperaCombustible: parseFloat(tiempoAcEsperaCombustible).toFixed(4),
          acTiempoEsperaLavadero: parseFloat(tiempoAcEsperaLavadero).toFixed(4),
          acTiempoEsperaMantenimiento: parseFloat(tiempoAcEsperaMantenimiento).toFixed(4),
          acTiempoEsperaCaja: parseFloat(tiempoAcEsperaCaja).toFixed(4),
          acTiempoEsperaKiosco: parseFloat(tiempoAcEsperaKiosco).toFixed(4),

          acClientesIngresanCombustible: cantidadClientesIngresaronCombustible,
          acClientesIngresanLavadero: cantidadClientesIngresaronLavadero,
          acClientesIngresanMantenimiento: cantidadClientesIngresaronMantenimiento,
          acClientesIngresanCaja: cantidadClientesIngresaronCaja,
          acClientesIngresanKiosco: cantidadClientesIngresaronKiosco,

          tiempoPromedioPermanenciaColaCombustible: cantidadClientesIngresaronCombustible == 0 ? 0 : parseFloat(parseFloat(tiempoAcEsperaCombustible).toFixed(4) / cantidadClientesIngresaronCombustible).toFixed(4),
          tiempoPromedioPermanenciaColaLavadero: cantidadClientesIngresaronLavadero == 0 ? 0 : parseFloat(parseFloat(tiempoAcEsperaLavadero).toFixed(4) / cantidadClientesIngresaronLavadero).toFixed(4),
          tiempoPromedioPermanenciaColaMantenimiento: cantidadClientesIngresaronMantenimiento == 0 ? 0 : parseFloat(parseFloat(tiempoAcEsperaMantenimiento).toFixed(4) / cantidadClientesIngresaronMantenimiento).toFixed(4),
          tiempoPromedioPermanenciaColaCaja: cantidadClientesIngresaronCaja == 0 ? 0 : parseFloat(parseFloat(tiempoAcEsperaCaja).toFixed(4) / cantidadClientesIngresaronCaja).toFixed(4),
          tiempoPromedioPermanenciaColaKiosco: cantidadClientesIngresaronKiosco == 0 ? 0 : parseFloat(parseFloat(tiempoAcEsperaKiosco).toFixed(4) / cantidadClientesIngresaronKiosco).toFixed(4),

          acTiempoOcupacionCombustible: parseFloat(acTiempoOcupacionCombustible).toFixed(4),
          porcentajeOcupacionCombustible: `${parseFloat((acTiempoOcupacionCombustible / reloj) * 100).toFixed(4)} %`,
          acTiempoOcupacionLavadero: parseFloat(acTiempoOcupacionLavadero).toFixed(4),
          porcentajeOcupacionLavadero: `${parseFloat((acTiempoOcupacionLavadero / reloj) * 100).toFixed(4)} %`,
          acTiempoOcupacionMantenimiento: parseFloat(acTiempoOcupacionMantenimiento).toFixed(4),
          porcentajeOcupacionMantenimiento: `${parseFloat((acTiempoOcupacionMantenimiento / reloj) * 100).toFixed(4)} %`,
          acTiempoOcupacionCaja: parseFloat(acTiempoOcupacionCaja).toFixed(4),
          porcentajeOcupacionCaja: `${parseFloat((acTiempoOcupacionCaja / reloj) * 100).toFixed(4)} %`,
          acTiempoOcupacionKiosco: parseFloat(acTiempoOcupacionKiosco).toFixed(4),
          porcentajeOcupacionKiosco: `${parseFloat((acTiempoOcupacionKiosco / reloj) * 100).toFixed(4)} %`,

          acClientesAtendidosCombustible: acClientesAtendidosCombustible,
          acClientesAtendidosLavadero: acClientesAtendidosLavadero,
          acClientesAtendidosMantenimiento: acClientesAtendidosMantenimiento,
          acClientesAtendidosCaja: acClientesAtendidosCaja,
          acClientesAtendidosKiosco: acClientesAtendidosKiosco,

          servicioConMasCola: resultadoMayorCola,

          // clientesSistema: JSON.parse(JSON.stringify(clientesDelSistemaT))
          clientesSistema: JSON.parse(JSON.stringify(clS))
          // clientesSistema: clientesDelSistemaT.map(c => c)
        })
      }

      estadosSurtidoresAnterior = surtidores.map((x) => x.estado);
      estadosSLavaderoAnterior = lavaderos.map((x) => x.estado);
      estadosMantenimientoAnterior = mantenimientos.map((x) => x.estado);
      estadosCajaAnterior = cajeros.map((x) => x.estado);
      estadosKioscoAnterior = kioscos.map((x) => x.estado);
      relojAnterior = reloj;


    }

    setTablaDeSimulacion(tabla)
  }


  const encontrarMenorValor = (fila) => {
    const valores = [
      parseFloat(fila.proximaLlegadaCombustible),
      parseFloat(fila.proximaLlegadaLavadero),
      parseFloat(fila.proximaLlegadaMantenimiento),
      parseFloat(fila.proximaLlegadaCaja),
      parseFloat(fila.finAtencionKiosco1),
      parseFloat(fila.finAtencionCombustible1),
      parseFloat(fila.finAtencionCombustible2),
      parseFloat(fila.finAtencionCombustible3),
      parseFloat(fila.finAtencionCombustible4),
      parseFloat(fila.finAtencionLavadero1),
      parseFloat(fila.finAtencionLavadero2),
      parseFloat(fila.finAtencionMantenimiento1),
      parseFloat(fila.finAtencionMantenimiento2),
      parseFloat(fila.finAtencionCaja1),
      parseFloat(fila.finAtencionCaja2),
      parseFloat(fila.corteEnergia),
      parseFloat(fila.finEnfriamientoLlave),
    ];
    
    const valoresFiltrados = valores.filter(valor => !isNaN(valor));

    const menorValor = Math.min(...valoresFiltrados);
    return menorValor;
  };

  return (
    <>
    {/* PARAMETRIZABLES  {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}}*/}
      <form onSubmit={handleSubmit}>
        <label>
          Cantidad de líneas a simular:
          <input type="number" name="lineasASimular" value={valoresFormulario.lineasASimular} onChange={handleChange} />
        </label>
        <br />
        <label>
          A partir de qué línea visualizar:
          <input type="number" name="lineaAVisualizar" value={valoresFormulario.lineaAVisualizar} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por surtidor:
          <input type="number" name="tasaAtencionSurtidor" value={valoresFormulario.tasaAtencionSurtidor} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por lavadero:
          <input type="number" name="tasaAtencionLavadero" value={valoresFormulario.tasaAtencionLavadero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de vehículos a atender por hora por mantenimiento:
          <input type="number" name="tasaAtencionMantenimiento" value={valoresFormulario.tasaAtencionMantenimiento} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de personas a atender por hora por cajero:
          <input type="number" name="tasaAtencionCajero" value={valoresFormulario.tasaAtencionCajero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Tasa de personas a atender por hora por kiosco:
          <input type="number" name="tasaAtencionKiosco" value={valoresFormulario.tasaAtencionKiosco} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de vehículos que llegan a cargar combustible por hora:
          <input type="number" name="tasaLlegadaCombustible" value={valoresFormulario.tasaLlegadaCombustible} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de vehículos que llegan a lavar el vehículo por hora:
          <input type="number" name="tasaLlegadaLavadero" value={valoresFormulario.tasaLlegadaLavadero} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de vehículos que llegan a mantenimiento por hora:
          <input type="number" name="tasaLlegadaMantenimiento" value={valoresFormulario.tasaLlegadaMantenimiento} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad de personas que llegan a caja por hora:
          <input type="number" name="tasaLlegadaCajero" value={valoresFormulario.tasaLlegadaCajero} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Simular</button>
      </form>


      {/* TABLA {}{}{{}{}{}}{{}{}}{}{}{}{{}{}{}}{{}}{{}{}}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{{}}{}{{}}{{}}{}{{}}{}{}{{}{}}{{}{}}{}{}{{}} */}
      {mostrarTablas &&
        <div>
          <h1>Simulación</h1>
          <table>
            <thead>
              <tr className='se'>
                <th colSpan="30"></th>
                <th colSpan="5" className='surtidor-p'>SURTIDOR</th>
                <th colSpan="3" className='lavadero-p'>LAVADERO</th>
                <th colSpan="3" className='mantenimiento-p'>MANTENIMIENTO</th>
                <th colSpan="3" className='cajero-p'>CAJERO</th>
                <th colSpan="2" className='kiosco-p'>KIOSCO</th>
                
                <th></th>

                <th colSpan="5"></th>
                <th colSpan="5"></th>
                <th colSpan="5"></th>
                <th colSpan="10"></th>
                <th colSpan="5"></th>
                <th colSpan="1"></th>

                <th colSpan="1000" className='clientes'></th>
              </tr>
              <tr>
                <th colSpan="3"></th>

                <th colSpan="3" className='ll-c-c'>llegada_cliente_combustible</th>
                <th colSpan="3" className='ll-c-l'>llegada_cliente_lavadero</th>
                <th colSpan="3" className='ll-c-m'>llegada_cliente_mantenimiento</th>
                <th colSpan="3" className='ll-c-ca'>llegada_cliente_caja</th>
                <th colSpan="3" className='ll-c-k'>llegada_cliente_kiosco</th>

                <th colSpan="4" className='f-a-c'>fin_atención_combustible</th>
                <th colSpan="2" className='f-a-l'>fin_atención_lavado</th>
                <th colSpan="2" className='f-a-m'>fin_atención_mantenimiento</th>
                <th colSpan="2" className='f-a-ca'>fin_atención_caja</th>

                <th></th>
                <th></th>

                <th>Estado</th>
                <th>Estado</th>
                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th>Estado</th>

                <th></th>

                <th>Estado</th>
                <th></th>

                <th>Punto 2</th>

                <th colSpan="5">AC tiempo espera</th>
                <th colSpan="5">AC clientes que ingresan</th>
                <th colSpan="5">Tiempo promedio de permanencia en cola</th>
                <th colSpan="10">AC tiempo ocupación</th>
                <th colSpan="5">Cantidad de clientes atendidos</th>
                <th colSpan="1"></th>

                <th colSpan="1000" className='clientes'>CLIENTES</th>

              </tr>
              <tr>
                <th>Fila</th>
                <th>Evento</th>
                <th>Reloj (hs)</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Tiempo entre llegadas</th>
                <th className='prox-llegada'>Próxima llegada</th>

                <th className='rnd'>RND</th>
                <th className='tiempo-entre'>Va al Kiosco</th>
                <th className='prox-llegada'>Tiempo fin de uso</th>

                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>

                <th>1</th>
                <th>2</th>

                <th>1</th>
                <th>2</th>

                <th>1</th>
                <th>2</th>

                <th style={{backgroundColor: "red"}}>Proximo Corte</th>
                <th style={{backgroundColor: "red"}}>Hora fin enfriemiento llave</th>

                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>Cola</th>

                <th>1</th>
                <th>2</th>
                <th>Cola</th>

                <th>1</th>
                <th>2</th>
                <th>Cola</th>

                <th>1</th>
                <th>2</th>
                <th>Cola</th>

                <th></th>
                <th>Cola</th>

                <th>Servicio más rapido</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Combustible</th>
                <th>% ocupación</th>
                <th>Lavadero</th>
                <th>% ocupación</th>
                <th>Mantenimiento</th>
                <th>% ocupación</th>
                <th>Caja</th>
                <th>% ocupación</th>
                <th>Kiosco</th>
                <th>% ocupación</th>

                <th>Combustible</th>
                <th>Lavadero</th>
                <th>Mantenimiento</th>
                <th>Caja</th>
                <th>Kiosco</th>

                <th>Servicio mas lento (con mas cola)</th>


                <th>Estado</th>
                <th>Hora Llegada</th>


                {/* {Array.from({ length: cantidadClientes }, (_, index) => (
                  <>
                    <th key={index}>Estado</th>
                    <th key={index}>Hora Llegada</th>
                  </>
                ))} */}

                <>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                
                <th>Estado</th>
                <th>Hora Llegada</th>
                </>
              </tr>
            </thead>
            <tbody>
              {tablaDeSimulacion.map((fila, index) => {
                
                const menorValor = encontrarMenorValor(fila);
                const startIndex = valoresFormulario.lineaAVisualizar - 1;
                const endIndex = startIndex + 300;

                if ((index >= startIndex && index < endIndex) || (index === tablaDeSimulacion.length - 1)) {

                  return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{fila.evento}</td>
                    <td>{fila.reloj}</td>

                    <td>{fila.rndLlegadaCombustible}</td>
                    <td>{fila.tiempoEntreLlegadasCombustible}</td>
                    <td className={fila.proximaLlegadaCombustible === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaCombustible}</td>

                    <td>{fila.rndLlegadaLavadero}</td>
                    <td>{fila.tiempoEntreLlegadasLavadero}</td>
                    <td className={fila.proximaLlegadaLavadero === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaLavadero}</td>

                    <td>{fila.rndLlegadaMantenimiento}</td>
                    <td>{fila.tiempoEntreLlegadasMantenimiento}</td>
                    <td className={fila.proximaLlegadaMantenimiento === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaMantenimiento}</td>

                    <td>{fila.rndLlegadaCaja}</td>
                    <td>{fila.tiempoEntreLlegadasCaja}</td>
                    <td className={fila.proximaLlegadaCaja === menorValor ? 'menorValor' : ''}>{fila.proximaLlegadaCaja}</td>

                    <td>{fila.rndVaKiosco}</td>
                    <td>{fila.vaKiosco}</td>
                    <td className={fila.finAtencionKiosco1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionKiosco1}</td>

                    <td className={fila.finAtencionCombustible1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible1}</td>
                    <td className={fila.finAtencionCombustible2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible2}</td>
                    <td className={fila.finAtencionCombustible3 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible3}</td>
                    <td className={fila.finAtencionCombustible4 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCombustible4}</td>

                    <td className={fila.finAtencionLavadero1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionLavadero1}</td>
                    <td className={fila.finAtencionLavadero2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionLavadero2}</td>

                    <td className={fila.finAtencionMantenimiento1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionMantenimiento1}</td>
                    <td className={fila.finAtencionMantenimiento2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionMantenimiento2}</td>

                    <td className={fila.finAtencionCaja1 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCaja1}</td>
                    <td className={fila.finAtencionCaja2 === menorValor ? 'menorValor' : ''}>{fila.finAtencionCaja2}</td>

                    <td>{fila.corteEnergia}</td>
                    <td>{fila.finEnfriamientoLlave}</td>

                    <td>{fila.surtidor1}</td>
                    <td>{fila.surtidor2}</td>
                    <td>{fila.surtidor3}</td>
                    <td>{fila.surtidor4}</td>
                    <td>{fila.colaCombustible}</td>

                    <td>{fila.lavadero1}</td>
                    <td>{fila.lavadero2}</td>
                    <td>{fila.colaLavadero}</td>

                    <td>{fila.mantenimiento1}</td>
                    <td>{fila.mantenimiento2}</td>
                    <td>{fila.colaMantenimiento}</td>

                    <td>{fila.caja1}</td>
                    <td>{fila.caja2}</td>
                    <td>{fila.colaCaja}</td>

                    <td>{fila.kiosco1}</td>
                    <td>{fila.colaKiosco}</td>


                    <td>{fila.servicioMasRapido}</td>

                    <td>{fila.acTiempoEsperaCombustible}</td>
                    <td>{fila.acTiempoEsperaLavadero}</td>
                    <td>{fila.acTiempoEsperaMantenimiento}</td>
                    <td>{fila.acTiempoEsperaCaja}</td>
                    <td>{fila.acTiempoEsperaKiosco}</td>

                    <td>{fila.acClientesIngresanCombustible}</td>
                    <td>{fila.acClientesIngresanLavadero}</td>
                    <td>{fila.acClientesIngresanMantenimiento}</td>
                    <td>{fila.acClientesIngresanCaja}</td>
                    <td>{fila.acClientesIngresanKiosco}</td>

                    <td>{fila.tiempoPromedioPermanenciaColaCombustible}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaLavadero}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaMantenimiento}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaCaja}</td>
                    <td>{fila.tiempoPromedioPermanenciaColaKiosco}</td>

                    <td>{fila.acTiempoOcupacionCombustible}</td>
                    <td>{fila.porcentajeOcupacionCombustible}</td>
                    <td>{fila.acTiempoOcupacionLavadero}</td>
                    <td>{fila.porcentajeOcupacionLavadero}</td>
                    <td>{fila.acTiempoOcupacionMantenimiento}</td>
                    <td>{fila.porcentajeOcupacionMantenimiento}</td>
                    <td>{fila.acTiempoOcupacionCaja}</td>
                    <td>{fila.porcentajeOcupacionCaja}</td>
                    <td>{fila.acTiempoOcupacionKiosco}</td>
                    <td>{fila.porcentajeOcupacionKiosco}</td>

                    <td>{fila.acClientesAtendidosCombustible}</td>
                    <td>{fila.acClientesAtendidosLavadero}</td>
                    <td>{fila.acClientesAtendidosMantenimiento}</td>
                    <td>{fila.acClientesAtendidosCaja}</td>
                    <td>{fila.acClientesAtendidosKiosco}</td>

                    <td>{fila.servicioConMasCola}</td>
                    
                    {fila.clientesSistema.map((cliente, indexCliente) => {
                      return(
                        <>
                          <td>{cliente.estado}</td>
                          <td>{cliente.horaLlegada ? parseFloat(cliente.horaLlegada).toFixed(4) : ''}</td>
                        </>
                      )
                      })}
                  </tr> 
                )}
              })}
            </tbody>
          </table>
        </div>
      }

    </>
  )
}

export default App
