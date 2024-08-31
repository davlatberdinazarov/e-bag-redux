import React, { useEffect } from 'react'; // Import useEffect
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from '../features/cart'; // Import calculateTotals and clearCart
import CartItem from './CartItem';
import { openModal } from '../features/cart/modalSlice';


const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector((state) => state.cart);

  // Dispatch calculateTotals whenever cartItems changes
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button
          onClick={() => dispatch(openModal())}
          className="btn clear-btn"
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
