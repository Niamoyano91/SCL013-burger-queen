import React from 'react'
import { firebase } from '../firebase/firebase'
import mesa from '../img/mesa.png'

const TableButton = () => {
  const [mesas, setMesas] = React.useState([])
  const [client, setClient] = React.useState('')
  const [modoEdicionMesas, setModoEdicionMesas] = React.useState(false)
  const [idMesa, setIdMesa] = React.useState('')

  React.useEffect(() => {



    const obtenerMesas = async () => {

      try {

        const db = firebase.firestore()
        //trae todos los documentos de tareas//
        const data = await db.collection('mesas').get()
        console.log(data.docs)
        //con (doc => ({ id: doc.id,...doc.data() accedemos a la informacion que esta en la data deja la informacion dentro de un objetoo//
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(arrayData)
        setMesas(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerMesas()
  }, [])

  

  const inputClient = async (e) => {
    // evita que se ejecute el comando get//
    e.preventDefault()
    // validacion para que no se ingrese un campo vacio//
    if (!client.trim()) {
      console.log("Esta vacio")
      return
    }
    try {
      const db = firebase.firestore()
      const nuevaTarea = {
        name: client,
        fecha: Date.now()
      }
      //agregar a la data de firebase//
      const data = await db.collection('mesas').add(nuevaTarea)
      setMesas([
        ...mesas,
        { ...nuevaTarea, id: data.id }
      ])
      setClient('')

    } catch (error) {
      console.log(error)
    }
    console.log(client)

  }

  

  const activarEdicionMesas = (item) => {
    setModoEdicionMesas(true)
    setClient('')
    setIdMesa(item.id)
  }

  
  const editarMesas = async (e) => {
    e.preventDefault()
    if (!client.trim()) {
      console.log('vacio')
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('mesas').doc(idMesa).update({
        //donde esta el name en tarea
        nameClient: client,
        fecha: Date.now()

      })
      const arrayEdidato = mesas.map(item => (
        item.id === idMesa ? { name: item.name, nameClient: mesas, fecha: Date.now() } : item
      ))
      setMesas(arrayEdidato)
      setModoEdicionMesas(false)
      setClient('')
      setIdMesa('')

    } catch (error) {
      console.log(error)

    }
  }


  return (
    <main id="tableContainer">
      <div id="clientTitle">
        <h1>Seleccione mesa de cliente:</h1>
      </div>
      <div id="tableButtons">
        {
          mesas.map(item => (
            //imprimo en pantalla los datos que tengo en firebase en esta caso los nombres de tareas//
            //item.id este es el id del elemento
            <button
              type="button"
              className="btnTable"
              onClick={() => activarEdicionMesas(item)}>
              <p className="labelTable" labelTable key={item.id}>
                {item.name}</p>
                <img src={mesa} alt="mesa" className="imgTable"></img>
            </button>
          ))
        }
      </div>

      <div className="formulario">
        <h3>Cliente
      </h3>
        <form onSubmit={modoEdicionMesas ? editarMesas : inputClient}>
          <input
            type="text"
            placeholder="nombre cliente"
            onChange={e => setClient(e.target.value)}
            value={client}
          />
          <button
            type="submit"
          >
            {
              modoEdicionMesas ? 'Editar' : 'Cliente'
            }
          </button>
        </form>
      </div>
    </main>
  );
}

export default TableButton