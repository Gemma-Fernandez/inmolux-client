import { createContext, useState, useEffect, useContext } from "react"
import service from "../services/config";
import { AuthContext } from "./auth.context";

const WishlistContext = createContext()

function WishlistWrapper({ children }) {
    const { user } = useContext(AuthContext)
    const [wishlist, setWishlist] = useState([])
    

    useEffect(() => {
        if (user) {
            getWishlist()
        }
    }, [user])
    //GET "user/profile/"
    const getWishlist = async () => {
        try {

            const response = await service.get("/user/profile")
            setWishlist(response.data.user.wishlist)
            
        } catch (error) {
            console.log(error)
        }
    }

        //POST "user/profile/wishlist"
        const addWish = async (viviendasId) => {
            try {
                const token = localStorage.getItem("authToken")
                const response = await service.post(
                  "/user/profile/wishlist",
                  { viviendasId }, 
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                setWishlist(response.data.wishlist); 
            } catch (error) {
                console.log(error)
            }
        }

        // DELETE "user/profile/wishlist/:viviendaId"
        const removeWish = async (viviendasId) => {
            try {
             
                const response = await service.delete(
                  `/user/profile/wishlist/${viviendasId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                  }
                );
                setWishlist(response.data.wishlist);
            } catch (error) {
                console.log(error)
            }
        }

        
    return (
        <WishlistContext.Provider value={{wishlist, addWish, removeWish, getWishlist, setWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}

export { WishlistContext, WishlistWrapper }