import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

export default function AddCar(props) {
    const [open, setOpen] = useState(false); //isDialogOpen
    const [car, setCar] = useState({brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''});

    const handleInputChange = e => {
        setCar({...car, [e.target.name]: e.target.value})
    }

    const handleSave = () => {
        props.addCar(car);
        setOpen(false);
        setCar({brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''});
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Add Car</Button>
            <Dialog
                open={open}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField 
                        required
                        label='Brand'
                        variant="standard"
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField 
                        required
                        label='Model'
                        variant="standard"
                        name="model"
                        value={car.model}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField 
                        required
                        label='Color'
                        variant="standard"
                        name="color"
                        value={car.color}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField 
                        required
                        label='Fuel'
                        variant="standard"
                        name="fuel"
                        value={car.fuel}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField 
                        required
                        label='Model Year'
                        variant="standard"
                        name="modelYear"
                        type="number"
                        value={car.modelYear}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                    <TextField 
                        required
                        label='Price'
                        variant="standard"
                        name="price"
                        type="number"
                        value={car.price}
                        onChange={handleInputChange}
                        margin="dense"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSave()}>Save</Button>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}