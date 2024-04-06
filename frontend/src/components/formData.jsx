import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink } from 'react-router-dom'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function App() {

  const wordsList = ['Welcome To CRUD Application'];

  const [showModal, setShowModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  // const formattedWordsList = wordsList.map(word => `- ${word}`);

  const [typingEffect] = useTypewriter({
    words: wordsList,
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });
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
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/forms");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Failed to fetch data');
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (formData.name === "" || formData.email === "" || formData.message === "") {
      toast.error('Please fill in all fields');
      return;
    }
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
        toast.success('Form data submitted successfully');
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
        toast.success('Inventory item deleted successfully');

        window.location.reload();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };



  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setFormData({
      name: item.name,
      email: item.email,
      message: item.message
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingItemId(null);
  

  };

  const handleModalSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(`http://localhost:8080/api/v1/forms/${editingItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Form data updated successfully");
        toast.success('Form data updated successfully');
        setShowModal(false); // Close the modal
        fetchData(); // Fetch updated data
        window.location.reload();
      } else {
        console.error("Failed to update form data");
        toast.error('Failed to update form data');
      }
    } catch (error) {
      console.error("Error updating form data:", error);
      toast.error('Error updating form data');
    }
  };

  return (
    <div className="App">
      <ToastContainer autoClose={2000} /> {/* Render the ToastContainer component */}
      {/* Conditionally render the table when data is available */}
      <div className="container overflow-hidden" style={{ marginTop: "5%" }}>
        <div className="row">
          <div className="col">
            <div className="typewriter-container text-center position-absolute top-0 start-50 translate-middle" style={{ zIndex: 1, fontFamily: 'Protest Guerrilla, sans-serif', fontSize: '34px', marginTop: '5%', marginLeft: '-10px', fontWeight: 'bold', color: 'green', fontStyle: 'italic' }}>

              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {typingEffect.split('\n').map((word, index) => (
                  <li key={index}>
                    {index === 0 ? '' : ''} {word} <Cursor />
                  </li>
                ))}
              </ul>
            </div>
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
              </div>
              <div className="mb-3 justify-content-between d-flex" style={{ textAlign: "left", gap: 30 }}>
                <button type="submit" className="btn btn-success" style={{ marginTop: 10 }}>
                  <i className="fas fa-check m-1"></i>

                  Submit</button>
                <button type="button" className="btn btn-success" style={{ marginTop: 10 }}>
                  <i className="fas fa-arrow-right m-1"></i>

                  <NavLink to="/inventories/inventories" style={{ textDecoration: 'none', color: 'white' }}>Inventories</NavLink>
                </button>
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

                        <td className="justify-content-center align-items-center d-flex" style={{gap: 20}}>
                          {/* <button className="btn btn-primary" onClick={() => handleDelete(item._id)}>Edit</button> */}
                          <button className="btn btn-primary" onClick={() => handleEdit(item)}>Edit</button>
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

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleModalSubmit}>
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
            </div>
            <div className="mb-3 justify-content-between d-flex" style={{ textAlign: "left", gap: 30 }}>
              <Button variant="primary" type="submit">
                {editingItemId ? 'Update' : 'Submit'}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
