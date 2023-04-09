import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Shelter } from "../../models/Shelter";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const SheltersShowAll = () => {
    const[loading, setLoading] = useState(true);
    const[shelters, setShelters] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/shelter/getAll`)
            .then(res => res.json())
            .then(data => {setShelters(data); setLoading(false);})
    }, []);

    console.log(shelters);

    return (

        <Container>
            <h1 style={{marginTop:"65px"}}>All Shelters</h1>

            {loading && <CircularProgress />}

            {!loading && shelters.length == 0 && <div>No shelters found</div>}

            {!loading && shelters.length > 0 && (

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Name</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Address</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Number of volunteers</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Capacity</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>City</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations
                                    <IconButton component={Link} sx={{ mr: 3 }} to={`/shelter/save`}>
                                        <Tooltip title="Add a new shelter" arrow>
                                            <AddIcon style={{color:"black", fontSize:"20px"}} />
                                        </Tooltip>
                                    </IconButton></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shelters.map((shelter:Shelter, index) => (
                                <TableRow key={shelter.shelterId}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{shelter.name}</TableCell>
                                    <TableCell align="center">{shelter.address}</TableCell>
                                    <TableCell align="center">{shelter.numberOfVolunteers}</TableCell>
                                    <TableCell align="center">{shelter.capacity}</TableCell>
                                    <TableCell align="center">{shelter.city}</TableCell> 
                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/shelter/${shelter.shelterId}`}>
                                            <VisibilityIcon  style={{color:"black", fontSize:"20px"}}/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/shelter/update/${shelter.shelterId}`}>
                                            <EditIcon sx={{ color: "navy" }}/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/shelter/delete/${shelter.shelterId}`}>
                                            <DeleteIcon sx={{ color: "darkred" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            }
        </Container>

    );
}