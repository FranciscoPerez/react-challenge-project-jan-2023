import { useState, useRef} from "react";
import { ItemDescrSelect, ItemQntSelect } from "../lib/selectInputs";

const Order = ({order, onEditOrder, onDeleteOrder}) => {
  const [isEditing, setIsEditing] = useState(false);
  const itemDescrInputRef = useRef();
  const itemQntInputRef = useRef();

  const onEditClickHandler = () => {
    setIsEditing(true);
  }
  
  const onConfirmClickHandler = () => {
    const itemDescr = itemDescrInputRef.current.value;
    const itemQnt = itemQntInputRef.current.value;
    if(!itemDescr){
      return;
    }

    const orderData = {
      id: order._id,
      order_item: itemDescr,
      quantity: itemQnt,
      ordered_by: order.ordered_by
    }

    onEditOrder(orderData);
    setIsEditing(false);
  }
  const onCancelClickHandler = () => {
    setIsEditing(false);
  }

  const createdDate = new Date(order.createdAt);

  return (
    <div className="row view-order-container" >
      <div className="col-md-4 view-order-left-col p-3">
          {!isEditing &&  <h2>{order.order_item}</h2>}
          {isEditing && <ItemDescrSelect selectedValue={order.order_item} ref={itemDescrInputRef} className="menu-select w-100"/>}
          <p>Ordered by: {order.ordered_by || ''}</p>
      </div>
      <div className="col-md-4 d-flex view-order-middle-col">
          <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
          {!isEditing &&  <p>Quantity: {order.quantity}</p>}
          {isEditing && <p>Quantity: <ItemQntSelect selectedValue={order.quantity} ref={itemQntInputRef} /></p>}
      </div>
      <div className="col-md-4 view-order-right-col">
          {!isEditing && <button className="btn btn-success" onClick={onEditClickHandler}>Edit</button>}
          {!isEditing && <button className="btn btn-danger" onClick={onDeleteOrder.bind(null, order._id)}>Delete</button>}
          {isEditing && <button className="btn btn-success" onClick={onConfirmClickHandler}>Confirm</button>}
          {isEditing && <button className="btn btn-danger" onClick={onCancelClickHandler}>Cancel</button>}
      </div>
    </div>
        
   )
}

export default Order;