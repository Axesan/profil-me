import React from "react";
import { FormControl, FormHelperText, Input, InputLabel, Button, Box } from "@mui/material";

function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");

        console.log("Email:", email);
        console.log("Mot de passe:", password);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                margin: "0 auto",
                padding: "16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="email" required>
                    Adresse Email
                </InputLabel>
                <Input id="email" name="email" aria-describedby="email-helper" />
                <FormHelperText id="email-helper">Rentrez votre adresse E-mail.</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="password" required>
                    Mot de passe
                </InputLabel>
                <Input id="password" name="password" type="password" aria-describedby="password-helper" />
                <FormHelperText id="password-helper">Rentrez votre mot de passe.</FormHelperText>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
                Se connecter
            </Button>
        </Box>
    );
}

export default Login;
