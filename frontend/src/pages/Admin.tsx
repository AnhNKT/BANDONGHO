import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchProducts, createProduct, deleteProduct } from "../api/api";
 
const Admin = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  const handleCreate = async () => {
    const newProduct = { name: "New Watch", price: 100 };
    await createProduct(newProduct);
    setProducts(await fetchProducts());
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts(await fetchProducts());
  };

  return (
    <div>
      <h2>Admin Panel ({user?.name})</h2>
      <button onClick={handleCreate}>Add Product</button>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price} <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
