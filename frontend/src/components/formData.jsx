import React, { useState, useEffect } from "react";

function App() {
  // Define state to store the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Define state to store the fetched data
  const [data, setData] = useState(null);

  // Fetch data from an API or source
  useEffect(() => {
    // Fetch data from an API
    fetch("http://localhost:8080/api/v1/forms")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to store form data
      const response = await fetch("http://localhost:8080/api/v1/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Form data submitted successfully");
        window.location.reload();

        // You can add logic here to show a success message or redirect the user
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // Function to handle delete operation
  // const handleDelete = async (id) => {
  //   try {
  //     // Make a DELETE request to delete the item
  //     const response = await fetch(`http://localhost:8080/api/v1/forms/${id}`, {
  //       method: "DELETE"
  //     });
  //     if (response.ok) {
  //       console.log("Item deleted successfully");
  //       // Refresh the data after deletion
  //       const newData = data.filter(item => item._id.$oid !== id);
  //       setData(newData);
  //     } else {
  //       console.error("Failed to delete item");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };


  const handleDelete = async (id) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (!answer) return;

      const response = await fetch(
        `http://localhost:8080/api/v1/forms/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Item deleted successfully");
        // Refresh the data after deletion
        const newData = data.filter((item) => item._id !== id);
        setData(newData);
        window.location.reload();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  return (
    <div className="App">
      {/* Conditionally render the table when data is available */}
      <div className="container overflow-hidden" style={{ marginTop: "5%"}}>
        <div className="row">
          <div className="col">
            <h1 style={{ textAlign: "left" }}>CRUD APPLICATION</h1>
            <form onSubmit={handleSubmit} style={{ gap: 20 }}>
              <div className="mb-3" style={{ textAlign: "left" }}>
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="mb-3" style={{ textAlign: "left" }}>
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="mb-3" style={{ textAlign: "left", gap: 30 }}>
                <label htmlFor="message" className="form-label">Message:</label>
                <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleInputChange}></textarea>
                <button type="submit" className="btn btn-success" style={{ textAlign: 'left' }}>Submit</button>
              </div>
            </form>

            {data && (
              <div className="overflowY-hidden">

                <table className="table table-bordered custom-table overflowY-scroll">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr style={{ gap: 20 }} key={item._id.$oid}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.message}</td>

                        <td>
                          <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
