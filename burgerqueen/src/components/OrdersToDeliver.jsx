import React, { useState, useEffect } from 'react'
import { firebase } from '../firebase/firebase'
import { Link } from "react-router-dom";
import '../components/componentsCss/OrdersToDeliver.css'
import '../components/componentsCss/Kitchen.css'
import tiket from '../img/tiket.png'

const OrdersToDeliver = () => {

    const [arrayOrderDeliver, setArrayOrderDeliver] = useState([])


    const getDeliver = () => {
        const db = firebase.firestore()

        db.collection('Entregas').orderBy('fecha', 'desc').onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })

            setArrayOrderDeliver(docs)
        })

    }

    useEffect(() => {
        getUpDate()
    }, [])

<<<<<<< HEAD
    const activateArrayOrderDeliver = (item) => {
        setArrayIdOrderDeliver(item.id)
    }

    const deleteOrderDelivery = (id) => {
        let indexOrderDelivery = arrayOrderDeliver.map(item => item.id).indexOf(idArrayOrderDeliver)

        const db = firebase.firestore()
        db.collection('Entregas').doc(idArrayOrderDeliver).update({
            fecha: '',
            id: '',
            name: '',
            nameClient: '',
            nameWaiter: '',
            order: []
        })
    }



    return (
        <main className="menuContainerDeliver">
            <section className="buttonsContainer">
                <section className="containerNewOrder">
                    <Link to="/orden">
                        <button className="btnNewOrder">Nuevo Pedido</button>
                    </Link>
                </section>

                <section className="containerDeliverOrder">
                <Link to="/entregas">
                    <button className="btnDeliverOrder">Pedidos a entregar</button>
                </Link>
                </section>
            </section>
            <div className="containerProductsDeliver">
<<<<<<< HEAD

                {
=======
            
            
            {
>>>>>>> parent of f832b7d... vista ordenes listas operativa
                    arrayOrderDeliver.map((item, index) => (
                        <section key={index} className="orderDeliver">
                            <div className="orderTitle">
                                <div className="containerTittleOrden">
<<<<<<< HEAD
                                    <div>
                                        <p className="nameTable">{item.id}</p>
                                    </div>
=======
                                    <div key={index}>
                                        <p className="nameTable">{item.name}</p>
                                    </div>        
>>>>>>> parent of f832b7d... vista ordenes listas operativa
                                </div>

                                <div className="containerClientDateAndHour">
                                    <div>
                                        <p className="dateAndHour">Fecha: {item.fecha}</p>
                                        <p className="dateWaiter">Mesero:
                                        {item.nameWaiter}</p>
                                        <p className="dateClient">Ciente: 
                                        {item.nameClient}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="scrollProduct">
                                <div className="containerOrderProduct">
                                    <div className="divProduct">
<<<<<<< HEAD
                                        {item.order.map((ele, a) =>
                                            <p key={a} className="productOrder">{ele}</p>)}
=======
>>>>>>> parent of f832b7d... vista ordenes listas operativa

                                            <p className="productOrder">{item.orderProduct}</p>

                                        
                                    </div>
                                </div>
                            </div>

                            <div className="deliverButton">
<<<<<<< HEAD
                                <button className="deliverReady" onClick={() => activateArrayOrderDeliver(item)}>Entregado</button>
                                <button type="submit" key={item.id} className="btnListoDeliver" onClick={() => deleteOrderDelivery()}>
                                    <img className="btnKitchenReady" src={tiket} alt="" />
                                </button>
=======
                                <button  className="deliverReady" onClick={()=> deleteOrder()}>Entregado</button>
>>>>>>> parent of f832b7d... vista ordenes listas operativa
                            </div>
                        </section>
                    ))
                }
                </div>
        </main>
    )
}

export default OrdersToDeliver
