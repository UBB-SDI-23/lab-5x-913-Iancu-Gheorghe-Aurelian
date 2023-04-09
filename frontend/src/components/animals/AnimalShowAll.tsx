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
import { Animal } from "../../models/Animals";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AnimalsShowAll = () => {
    const[loading, setLoading] = useState(true);
    const[animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/animal/getAll`)
            .then(res => res.json())
            .then(data => {setAnimals(data); setLoading(false);})
    }, []);

    console.log(animals);

    return (

        <Container>
            <h1 style={{marginTop:"65px"}}>All Animals</h1>

            {loading && <CircularProgress />}

            {!loading && animals.length == 0 && <div>No animals found</div>}

            {!loading && animals.length > 0 && (

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Name</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Type</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Weight</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Date of birth</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Breed</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations
                                    <IconButton component={Link} sx={{ mr: 3 }} to={`/animal/add`}>
                                        <Tooltip title="Add a new animal" arrow>
                                            <AddIcon style={{color:"black", fontSize:"20px"}} />
                                        </Tooltip>
                                    </IconButton></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {animals.map((animal:Animal, index) => (
                                <TableRow key={animal.animalId}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{animal.name}</TableCell>
                                    <TableCell align="center">{animal.type}</TableCell>
                                    <TableCell align="center">{animal.weight}</TableCell>
                                    <TableCell align="center">{animal.dateOfBirth}</TableCell>
                                    <TableCell align="center">{animal.breed}</TableCell> 
                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/animal/${animal.animalId}`}>
                                            <VisibilityIcon  style={{color:"black", fontSize:"20px"}}/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/animal/${animal.animalId}/edit`}>
                                            <EditIcon sx={{ color: "navy" }}/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/animal/${animal.animalId}/delete`}>
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