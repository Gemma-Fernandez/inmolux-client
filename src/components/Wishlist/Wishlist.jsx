import React from 'react'
import { FaHeart } from "react-icons/fa6";
import './Wishlist.css'
import { useContext } from 'react';
import { WishlistContext } from '../../context/Wishlist.context.jsx';

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <button type='button' className='whish-button'>
<FaHeart/>
<span className='whish-state'>{wishlist.length}</span>
    </button>
  )
}

export default Wishlist