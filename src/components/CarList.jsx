import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {

    const [cars, setCars] = useState([{ brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' }]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");
    const [colDefs, setColDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'modelYear' },
        { field: 'price' },
        {
            cellRenderer: (params) =>
                <EditCar params={params} updateCar={updateCar} />, width: 120

        },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>Delete</Button>, width: 120

        }
    ]);

    const addCar = (car) => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', { 
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(car)
         })
         .then(response => {
            //console.log("response: ", response);
            if (response.ok) {
                setMsg("Add Car succeed");
                setOpenSnackbar(true);
                getCars();
            } else {
                setMsg("Add Car failed");
                setOpenSnackbar(true);
            }
            return response.json();
        })
        .catch(err => {
            console.error(err.data);
        });
    };

    const updateCar = (car, params) => {
        //console.log("params ", params.data._links.car.href);
        fetch(params.data._links.car.href, { 
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(car)
         })
         .then(response => {
            //console.log("response: ", response);
            if (response.ok) {
                setMsg("Edit Car succeed");
                setOpenSnackbar(true);
                getCars();
            } else {
                setMsg("Edit Car failed");
                setOpenSnackbar(true);
            }
            return response.json();
        })
        .catch(err => {
            console.error(err.data);
        });
    }

    const deleteCar = (params) => {
        //console.log("params ", params.data._links.car.href);
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                //console.log("response: ", response);
                if (response.ok) {
                    setMsg("Delete succeed");
                    setOpenSnackbar(true);
                    getCars();
                } else {
                    setMsg("Delete failed");
                    setOpenSnackbar(true);
                }
                return response.json();
            })

            .catch(err => {
                console.error(err.data);
            });
    }

    const getCars = () => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', { method: 'GET' })
        .then(response => {
            //console.log("response: ", response);
            return response.json();
        })
        .then(data => {
            //console.log("data ", data._embedded.cars);
            setCars(data._embedded.cars);
        })
        .catch(err => {
            console.error(err.data);
        });
    };

    useEffect(() => getCars(), []);
    
    return (
        <>
            <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{ width: 900, height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={false}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msg}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                />
            </div>
        </>
    );
}