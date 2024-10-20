import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { WishlistContext } from '../context/Wishlist.context';
import { AuthContext } from '../context/auth.context.jsx';
import service from "../services/config";
import { PiHeartDuotone } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

function ShowWishlist() {
    const { removeWish, wishlist, getWishlist, setWishlist } = useContext(WishlistContext);
    const { user, isLoggedIn } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (isLoggedIn && user) {
                    const response = await service.get("/user/wishlist/vivienda")
                    setWishlist(response.data)
                    //console.log(response.data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }

        };

        fetchWishlist();
    }, [user, isLoggedIn, setWishlist]);


    if (isLoading) {
        return <p>Loading</p>;
    }



    return (
        <div>
            <h1 className='wishlist-title'> Whislist <PiHeartDuotone className='icon-wish'/></h1>
            {wishlist.length === 0 ? (
                <p>wishlist vacía.</p>
            ) : (
                <div className='wish-container'>
                    {wishlist.map((eachVivienda, i) => (
                        <div key={i} className='wish-card'>
                            <h3 className='wish-title'>{eachVivienda.name}</h3>
                            <img src={eachVivienda.image} alt={eachVivienda.city} className='wish-image'></img>
                            <p className='wish-description'>Description:{eachVivienda.description}</p>
                            <p className='wish-price'>{eachVivienda.price} €</p>
                            <button onClick={() => removeWish(eachVivienda._id)} className='icon-delete-wish'><TiDelete /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ShowWishlist