import React, { useState, useEffect } from "react";

function App() {
    // Define state to store the fetched data
    const [data, setData] = useState(null);

    // Fetch data from an API or source
    useEffect(() => {
        // Fetch data from an API
        fetch("http://localhost:8080/api/v1/inventories")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="App">
            {/* Conditionally render the table when data is available */}
            <div className="container" style={{ marginTop: "10%" }}>
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: "left" }}>Inventory Table</h1>
                        {data && (
                            <table className="table table-bordered custom-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item._id.$oid}>
                                            {" "}
                                            {/* Modify this line to access _id.$oid */}
                                            <td>{item._id}</td> {/* Add this line to display ID */}
                                            <td>{item.productName}</td>
                                            <td>{item.category}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
