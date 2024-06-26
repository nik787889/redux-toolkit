
/////////////////////////
import React, { useEffect, useId, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addProducts, updateProducts } from '../redux-toolkit/cartSlice';
import { FcAbout } from 'react-icons/fc'
import { MdCancel } from "react-icons/md";
import { isSelectCart } from '../redux-toolkit/selectCartSlice';

function SelectCart({route}) {
    const {state} = useLocation()
    // console.log(state);
    const dispatch = useDispatch()
    const selectCart = useSelector(state => state.selectCart.cartItem)
    const selectUpdateCart = useSelector(state => state.selectCart.isSelectCart)
    const selectQuntity = useSelector(state => state.selectCart.cartItem)
    const selectCartProducts = useSelector(state => state.cart)

    let cartProduct = selectCartProducts.filter(item => item.id === selectCart.id)
    const productInCart = cartProduct[0] || []


    const [qty, setQty] = useState(1)
    const [updateQty, setUpdateQty] = useState(selectQuntity.quntity)

    const navigate = useNavigate()

    const [cart, setCart] = useState(selectCart)
    const id = useId()


    const goToCart = () => {
        dispatch(addProducts({ cart: cart, quntity: qty, isProductInCart: true }))
        dispatch(isSelectCart(true))
        setCart(cart)
        navigate('/')
    }

    const updateCart = (item) => {

        let a = [...selectCartProducts]
        a.splice(state.index, 1, {...cart, quntity: updateQty})

        dispatch(updateProducts(a))
        // dispatch(updateProducts(item))
        // dispatch(addProducts({ cart: cart, quntity: updateQty, isProductInCart: true }))
        setCart(cart)
        navigate('/cart')
    }

    const Inc = () => setQty(qty + 1)

    const Dec = () => { if (qty > 1) setQty(qty - 1) }

    const IncQuntity = () => setUpdateQty(updateQty + 1)

    const DecQuntity = () => { if (updateQty > 1) setUpdateQty(updateQty - 1) }

    // useEffect(() => {
    //     setCart(selectCart)
    // }, [])

    if (selectUpdateCart == false) {

        return (

            <div style={{ display: "flex", justifyContent: "center", alignItems:"center", width: "100%" }}>
                <div className='card ' key={cart.id} style={{ display: "block", width: "45rem", marginTop:"3rem" }}  >

                    <div style={{ display: "flex", float: "right", height: "25px", width: "25px", borderRadius: "25px", alignItems: "center" }}>
                        <Link to="/"> <MdCancel style={{ height: "35px", width: "35px", color: "red" }} /> </Link>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", padding: "10px", gap: "2rem" }}>
                        <img src={cart.image} alt="" style={{ width: "15rem", height: "15rem", margin: "0px", padding: "2rem", borderRadius: "40px", boxShadow: " inset 1px 1px 20px 7px rgb(115 38 67)" }} />
                        <div>
                            <h3>About <span><FcAbout /></span> </h3>
                            <h5 style={{ fontWeight: "300", fontSize:"20px" }}> "{cart.description}"</h5>
                        </div>
                    </div>

                    <h5>{cart.title}</h5>

                    <div style={{ fontSize: "1rem", fontWeight: "900", color:"#a2f8a2" }}>Price: ${cart.price}</div>

                    {productInCart.isProductInCart ?
                        <> <h5 style={{ color: "yellow" }}>This Product is Already in Your Cart</h5>
                            <Link className='button' to='/cart'> Go to Cart </Link>
                        </> :
                        <>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <buttton onClick={Dec}> <HiMinusCircle style={{ width: "40px", height: "40px" }} color='red' /> </buttton>
                                <div style={{ fontSize: "1.5rem", padding: "20px", fontWeight: "900"}}>{qty}</div>
                                <buttton onClick={Inc}> <HiPlusCircle style={{ width: "40px", height: "40px", color: "green" }} /> </buttton>
                            </div>
                            <button className='button' onClick={() => goToCart()}> Add To Cart </button>
                        </>

                    }

                    {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <buttton onClick={Dec}> <HiMinusCircle style={{ width: "70px", height: "70px" }} color='red' /> </buttton>
                        <div style={{ fontSize: "3rem", padding: "20px", fontWeight: "900" }}>{qty}</div>
                        <buttton onClick={Inc}> <HiPlusCircle style={{ width: "70px", height: "70px", color: "green" }} /> </buttton>
                    </div>
                    <button className='button' onClick={() => goToCart()}> Add To Cart </button> */}
                    {/* {!isItemInCart ?  <button className='button' onClick={() => goToCart()}> Add To Cart </button> : null} */}

                </div>
            </div>
        )
    }

    else if (selectUpdateCart == true) {

        return (

            <div style={{ display: "flex", justifyContent: "center", alignItems:"center", width: "100%" }}>
                <div className='card ' key={cart.id} style={{ display: "block", width: "45rem", marginTop:"3rem" }}  >

                    <div style={{ display: "flex", float: "right", height: "25px", width: "25px", borderRadius: "25px", alignItems: "center"}}>
                        <Link to="/cart"> <MdCancel style={{ height: "35px", width: "35px", color: "red" }} /> </Link>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", padding: "10px", gap: "2rem" }}>
                        <img src={cart.image} alt="" style={{ width: "15rem", height: "15rem", margin: "0px", padding: "2rem", borderRadius: "40px", boxShadow: " inset 1px 1px 20px 7px rgb(115 38 67)" }} />
                        <div>
                            <h3>About <span><FcAbout /></span> </h3>
                            <h5 style={{ fontWeight: "300", fontSize:"20px" }}> "{cart.description}"</h5>
                        </div>
                    </div>

                    <h5>{cart.title}</h5>

                    <div style={{ fontSize: "1rem", fontWeight: "900", color:"#a2f8a2" }}>Price: ${cart.price}</div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <buttton onClick={DecQuntity}> <HiMinusCircle style={{ width: "40px", height: "40px", color:'red' }} /> </buttton>
                        <div style={{  fontSize: "1.5rem", padding: "20px", fontWeight: "900" }}>{updateQty}</div>
                        <buttton onClick={IncQuntity}> <HiPlusCircle style={{ width: "40px", height: "40px" , color: "green" }} /> </buttton>
                    </div>

                    <button className='button' style={{ backgroundColor: "green" }} onClick={() => updateCart(selectQuntity.id)}> Update </button>

                </div>
            </div>
        )
    }


}

export default SelectCart