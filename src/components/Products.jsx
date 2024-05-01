
// // 
// import LoadingIcons from 'react-loading-icons'
import RingLoader from 'react-spinners/RingLoader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts } from '../redux-toolkit/cartSlice'
import { fetchProducts } from '../redux-toolkit/productSlice'
import { STATUSE } from '../redux-toolkit/productSlice'
import { isSelectCart, selectCart } from '../redux-toolkit/selectCartSlice'
import { useNavigate } from 'react-router-dom'


const Products = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // const data = useSelector((state) => state.product.data)
    // const status = useSelector((state) => state.product.data)
    // // or
    const { data, status } = useSelector((state) => state.product)

    const selectisProduct = useSelector((state) => state.filter.isProduct)

    const filteredProduct = useSelector((state) => state.filter.filterData)

    const isSearchProduct = useSelector((state)=>state.filter.isSearch)

    const searchProduct = useSelector((state)=> state.filter.searchQuery)
    // console.log(searchProduct);



    useEffect(() => {

        dispatch(fetchProducts())

    }, [])

    const addToCart = (item) => {
        // dispatch(addProducts(item))
        dispatch(selectCart(item))
        dispatch(isSelectCart(false))
        navigate('/selectCart')

    }

    const filteredProducts = data.filter(item => item.title.toLowerCase().includes(searchProduct.toLowerCase()));

    if (status === STATUSE.LOADING) {
        return <div style={{ display: "flex", height: "50vh", justifyContent: "center", alignItems: "center" }}> <RingLoader color="#00d6ff" /></div>
    }

    if (status === STATUSE.ERROR) {
        return <h1 style={{ color: "red", display: "flex", justifyContent: "center" }}> Oops ... ! Somthing Went Wrong  </h1>
    }



    if (selectisProduct === false) {

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                {
                    data.map((item) => {
                        return (
                            <div className='card' style={{ boxShadow: "20px 15px 17px 0px rgb(115 38 67)" }} key={item.id}>
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <h4>{item.title}</h4>
                                <h3>Price : ${item.price}</h3>
                                <button className='button' onClick={() => addToCart(item)}> Buy Now </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    else if (selectisProduct === true) {

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
                {
                    filteredProduct.map((item) => {
                        return (
                            <div className='card' style={{ boxShadow: "20px 15px 17px 0px rgb(115 38 67)" }} key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <h4>{item.title}</h4>
                                <h3>Price : ${item.price}</h3>
                                <button className='button' onClick={() => addToCart(item)}> Buy Now </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    ///// This is for filter products by Searching. /////
 if (isSearchProduct === true) {

        return (

            filteredProducts.map((item) => (

                <div className='card' style={{ boxShadow: "20px 15px 17px 0px rgb(115 38 67)" }} key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                    <h3>Price: ${item.price}</h3>
                    <button className='button' onClick={() => addToCart(item)}>Buy Now</button>
                </div>

            ))
        )
    }
}


export default Products
