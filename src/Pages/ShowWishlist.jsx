import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { WishlistContext } from '../context/Wishlist.context';
import { AuthContext } from '../context/auth.context.jsx';
import service from "../services/config";
import { PiHeartDuotone } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";



function ShowWishlist() {
    const params = useParams()
    const { removeWish, wishlist, setWishlist } = useContext(WishlistContext);
    const { user, isLoggedIn } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (isLoggedIn && user) {
                    const response = await service.get("/user/wishlist/vivienda")
                    setWishlist(response.data)
                    
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
        return <div className="spinner-container"><p className="spinner"><ClockLoader/></p></div>;
    }



    return (
        <div>
            <h1 className='wishlist-title'> Whislist <PiHeartDuotone className='icon-wish' /></h1>
            {wishlist.length === 0 ? (
                <p>La wishlist esta vacía.</p>
            ) : (
                <div className='wish-container'>
                    {wishlist.map((eachVivienda, i) => (
                        <div key={i} className='wish-card'>

                            <h3 className='wish-title'>{eachVivienda.name}</h3>
                            <Link to={`/vivienda/${eachVivienda._id}`}>
                                <img src={eachVivienda.image1} alt="image" className='wish-image'></img>
                            </Link>
                            <p className='wish-description'>{eachVivienda.city}</p>
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