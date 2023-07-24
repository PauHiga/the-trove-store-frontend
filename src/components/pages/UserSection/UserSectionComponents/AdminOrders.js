import styled from "styled-components";
import orderService from "../../../../services/orderService";
import { useSelector } from "react-redux";
import Button from "../../../Button/Button";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import toast, { Toaster } from "react-hot-toast";

const AdminOrdersContainer = styled.div`
  margin: 50px 0px;
  .inline-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .inline {
    display: flex;
    justify-content: space-around;
  }
  .orders-section {
    background-color: #f0f3f7;
    padding: 20px;
    margin: 10px;
    width: 90vw;
    p {
      font-size: 15px;
      margin: 0px;
    }
  }
  @media (max-width: 480px) {
    .inline {
      display: flex;
      flex-direction: column;
    }
    .orders-section {
      padding: 10px;
      margin: 5px 5px 5px 0px;
      width: 95vw;
    }
  }
`;

const AdminOrders = () => {
  const user = useSelector((state) => state.user);
  orderService.setToken(user.token);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      orderService.getAllOrders().then((data) => setOrders(data));
    };
    getOrders();
  }, []);

  const decrypt = (string) => {
    const bytes = CryptoJS.AES.decrypt(string, "TroveStore");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  
  const handleCompleted = async (order) => {
    const modifiedOrder = { ...order, user: order.user.id, completed: true };
    const edited = await orderService.editOrder(modifiedOrder, order.id);
    const updatedArray = orders.map((order) =>
      order.id === edited.id ? { ...order, completed: true } : order,
    );
    setOrders(updatedArray);
    toast.success(`Order ${order.id} is marked as "Complete"`);
  };

  const handlePending = async (order) => {
    const modifiedOrder = { ...order, user: order.user.id, completed: false }
    const edited = await orderService.editOrder(modifiedOrder, order.id)
    const updatedArray = orders.map((order) => order.id === edited.id ? { ...order, completed: false } : order)
    setOrders(updatedArray)
    toast(`Order ${order.id} is marked as "Pending"`)
  }

  
  if (orders === []) {
    return null
  }

  const OrderCard = (order) => {
    return (
      <div className="orders-section" key={order.id}>
        <p>Order ID: {order.id}</p>
        <div className="inline-top">
          <h5>User: {decrypt(order.user.name)}</h5>
          <Button
            onClick={() => handleCompleted(order)}
            text="Mark as completed"
          />
        </div>
        <div>
          {order.products.map((product) => (
            <div key={product}>- {product}</div>
          ))}
          <div>Created {order.createdAt.substring(0, 10)}</div>
        </div>
        <div className="inline">
          <div>Deliver to: {decrypt(order.user.address)}</div>
          <div>Phone: {decrypt(order.user.phone)}</div>
          <div>Email: {decrypt(order.user.email)}</div>
        </div>
      </div>
    );
  };

  const CompletedCard = (order) => {
    return (
      <div className="orders-section" key={order.id}>
        <p>Order ID: {order.id}</p>
        <div className="inline-top">
          <h4>User: {decrypt(order.user.name)}</h4>
          <Button onClick={() => handlePending(order)} text="Mark as pending" />
        </div>
        <div>
          {order.products.map((product) => (
            <div key={product}>- {product}</div>
          ))}
          <div>Created {order.createdAt.substring(0, 10)}</div>
        </div>
        <div className="inline">
          <div>Deliver to: {decrypt(order.user.address)}</div>
          <div>Phone: {decrypt(order.user.phone)}</div>
          <div>Email: {decrypt(order.user.email)}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toaster />
      <AdminOrdersContainer>
        <h2>Orders</h2>
        <h3>
          Pending Orders {orders.filter((order) => !order.completed).length}
        </h3>
        {orders.map((order) => (order.completed ? null : OrderCard(order)))}

        <h3
          data-bs-toggle="collapse"
          data-bs-target="#completed-orders"
          aria-controls="collapseExample"
        >
          Completed Orders {orders.filter((order) => order.completed).length}
        </h3>
        <div className="collapse" id="completed-orders">
          {orders.map((order) =>
            order.completed ? CompletedCard(order) : null,
          )}
        </div>
      </AdminOrdersContainer>
    </>
  );
};

export default AdminOrders;
