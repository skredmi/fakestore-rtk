import React from 'react'
import { BsCart, BsTrash, BsX } from 'react-icons/bs';
import styles from './CartDropdown.module.css'

export const CartDropdown = () => {
  return (
    <button className={styles.button}><BsCart /></button>
  )
}
