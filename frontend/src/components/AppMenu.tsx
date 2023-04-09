import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box>
			<AppBar style={{backgroundColor:"#34495E"}}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<HomeIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Animal shelter
					</Typography>
					<Button
						variant={path.startsWith("/shelter") ? "outlined" : "text"}
						to="/shelter"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<PetsIcon />}>
						Shelters
					</Button>
					<Button
						variant={path.startsWith("/animal") ? "outlined" : "text"}
						to="/animal"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<PetsIcon />}>
						Animals
					</Button>
					<Button
						variant={path.startsWith("/volunteer") ? "outlined" : "text"}
						to="/volunteer"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<PetsIcon />}>
						Volunteers
					</Button>


				</Toolbar>
			</AppBar>
		</Box>
	);
};