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
import { Volunteer } from "../../models/Volunteer";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const VolunteerShowAll = () => {
    const[loading, setLoading] = useState(true);
    const[volunteers, setVoluteers] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/volunteer/getAll`)
            .then(res => res.json())
            .then(data => {setVoluteers(data); setLoading(false);})
    }, []);

    console.log(volunteers);

    return (

        <Container>
            <h1 style={{marginTop:"65px"}}>All Volunteers</h1>

            {loading && <CircularProgress />}

            {!loading && volunteers.length == 0 && <div>No volunteers found</div>}

            {!loading && volunteers.length > 0 && (

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="simple table" style={{backgroundColor:"whitesmoke"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>Crt.</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight:'bold'}}>First Name</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Last Name</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Email</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Telephone</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Country</TableCell>
                                <TableCell align="center" style={{color:"#2471A3", fontWeight: 'bold'}}>Operations
                                    <IconButton component={Link} sx={{ mr: 3 }} to={`/volunteer/save`}>
                                        <Tooltip title="Add a new volunteer" arrow>
                                            <AddIcon style={{color:"black", fontSize:"20px"}} />
                                        </Tooltip>
                                    </IconButton>
                                    </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {volunteers.map((volunteer:Volunteer, index) => (
                                <TableRow key={volunteer.volunteerId}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{volunteer.firstName}</TableCell>
                                    <TableCell align="center">{volunteer.lastName}</TableCell>
                                    <TableCell align="center">{volunteer.email}</TableCell>
                                    <TableCell align="center">{volunteer.phone}</TableCell>
                                    <TableCell align="center">{volunteer.country}</TableCell> 
                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/volunteer/${volunteer.volunteerId}`}>
                                            <VisibilityIcon  style={{color:"black", fontSize:"20px"}}/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/volunteer/update/${volunteer.volunteerId}`}>
                                            <EditIcon sx={{ color: "navy" }}/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/volunteer/delete/${volunteer.volunteerId}`}>
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