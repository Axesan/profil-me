import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    Stack,
    FormHelperText,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TikTokIcon from "@mui/icons-material/VideoLibrary";
import SteamIcon from "@mui/icons-material/SportsEsports";
import SpotifyIcon from "@mui/icons-material/QueueMusic";
import { useNavigate } from "react-router-dom";
import CustomizedSteppers from "../components/SignUp/ProgressBarSign";
const steps = [
    "Lien",
    "Infos de connexion",
    "Vos informations",
    "Réseaux sociaux",
    "Vos liens",
    "Thème",
];
/**
 * A review for form logik
 * const [form, setForm] = useState({
        link: "",
        email: "",
        password: "",
        personnalData: { firstName: "", lastName: "" },
        socialLinks: {
            instagram: "",
            facebook: "",
            tiktok: "",
            steam: "",
            spotify: "",
        },
        additionalLinks: [""],
        theme: "",
        errors: {
            link: "",
            email: "",
            password: "",
            personalData: { firstName: "", lastName: "" },
            theme: "",
        },

    }) */
function SignUp() {
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [link, setLink] = useState("");
    const [linkValid, setLinkValid] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [personalData, setPersonalData] = useState({ firstName: "", lastName: "" });
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState('');
    const [socialLinks, setSocialLinks] = useState({
        instagram: "",
        facebook: "",
        tiktok: "",
        steam: "",
        spotify: "",
    });


    const themes = [
        { name: "Moderne", img: "https://via.placeholder.com/150" },
        { name: "Classique", img: "https://via.placeholder.com/150" },
        { name: "Coloré", img: "https://via.placeholder.com/150" },
    ];
    const [additionalLinks, setAdditionalLinks] = useState(["", "", ""]);
    const [theme, setTheme] = useState("");

    const validateLink = (value) => {
        const reservedLinks = ["Titi", "Test"];
        setLinkValid(value.trim() !== "" && !reservedLinks.includes(value));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleNextStep = () => {
        if (step === 0 && !linkValid) {
            setError("Veuillez choisir un lien valide.");
            return;
        }
        if (step === 1 && (!validateEmail(email) || passwordError)) {
            setError("Veuillez entrer un email valide et un mot de passe correct.");
            return;
        }
        if (step === 2 && (!personalData.firstName || !personalData.lastName)) {
            setError("Veuillez remplir vos informations personnelles.");
            return;
        }
        setStep(step + 1);
        setProgress(((step + 1) / steps.length) * 100);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
        setProgress((step / steps.length) * 100);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(`paa.ge/${link}`);
        alert("Lien copié dans le presse-papier !");
    };

    const handleFinish = () => {
        navigate("/editor", { state: { link: `paa.ge/${link}` } });
    };

    const validateURL = (url) =>
        /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(url);

    const handleLinkChange = (value) => {
        setLink(value);
        const reservedLinks = ["Titi", "Test"];
        setLinkValid(value.trim() !== "" && !reservedLinks.includes(value));
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        console.log({
            link,
            email,
            password,
            personalData,
            socialLinks,
            additionalLinks,
            theme,
        });
        navigate("/editor")
    };

    return (
        <Box component="form"
            onKeyDown={(e) => {
                if (e.key === "Enter" && step !== steps.length - 1) {
                    e.preventDefault(); // Empêche la soumission si ce n'est pas la dernière étape
                    handleNextStep();
                }
            }}
            onSubmit={handleSubmit} sx={{ padding: "16px", height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Barre de progression */}
            <CustomizedSteppers stepData={steps} activeStep={step} />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Étape 1 : Lien */}
                {step === 0 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Choisissez votre lien unique !
                        </Typography>


                        <TextField
                            fullWidth
                            required
                            label="Lien"
                            placeholder="Ex: toto"
                            value={link}
                            onChange={(e) => handleLinkChange(e.target.value)}
                            error={linkValid === false}
                            //onBlur={() => validateLink(link)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">paa.ge/</InputAdornment>,
                                endAdornment: linkValid !== null && (
                                    <InputAdornment position="end">
                                        {linkValid ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {linkValid === false && (
                            <FormHelperText error>{error}</FormHelperText>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                        //disabled={!linkValid}
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 2 : Email */}
                {step === 1 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Félicitations, paa.ge/{link} est à vous !
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!validateEmail(email) && email !== ""}
                            helperText={!validateEmail(email) && email !== "" ? "Veuillez entrer un email valide." : ""}
                        />
                        {validateEmail(email) && (
                            <TextField
                                required
                                fullWidth
                                label="Mot de passe"
                                type="password"
                                placeholder="******"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(e.target.value.length < 8);
                                }}
                                error={passwordError}
                                helperText={passwordError ? "Le mot de passe doit comporter au moins 8 caractères." : ""}
                                sx={{ marginTop: "16px" }}
                            />)}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                            disabled={!validateEmail(email) || password.length < 8}
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 3 : Informations personnelles */}
                {step === 2 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Parlez-nous de vous
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            label="Prénom"
                            value={personalData.firstName}
                            onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Nom"
                            value={personalData.lastName}
                            onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                            sx={{ marginTop: "16px" }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleNextStep}
                            sx={{ marginTop: "16px" }}
                            disabled={!personalData.firstName || !personalData.lastName}
                        >
                            Suivant
                        </Button>
                    </Box>
                )}

                {/* Étape 4 : Réseaux sociaux */}
                {step === 3 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Ajoutez vos réseaux sociaux
                        </Typography>
                        {[
                            { label: "Instagram", icon: <InstagramIcon />, key: "instagram" },
                            { label: "Facebook", icon: <FacebookIcon />, key: "facebook" },
                            { label: "TikTok", icon: <TikTokIcon />, key: "tiktok" },
                            { label: "Steam", icon: <SteamIcon />, key: "steam" },
                            { label: "Spotify", icon: <SpotifyIcon />, key: "spotify" },
                        ].map(({ label, icon, key }) => (
                            <TextField
                                key={key}
                                fullWidth
                                label={label}
                                value={socialLinks[key]}
                                onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                                }}
                                sx={{ marginBottom: "16px" }}
                            />
                        ))}
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={handleNextStep}>
                                Suivant
                            </Button>
                            <Button variant="text" onClick={handleNextStep}>
                                Ignorer
                            </Button>
                        </Stack>
                    </Box>
                )}

                {step === 4 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ marginBottom: "16px", textAlign: "center" }}>
                            Ajoutez vos liens additionnels
                        </Typography>
                        {additionalLinks.map((link, index) => (
                            <TextField
                                key={index}
                                fullWidth
                                label={`Lien ${index + 1}`}
                                placeholder="Ex: https://monlien.com"
                                value={link}
                                onChange={(e) => {
                                    const updatedLinks = [...additionalLinks];
                                    updatedLinks[index] = e.target.value;
                                    setAdditionalLinks(updatedLinks);
                                }}
                                error={link !== "" && !validateURL(link)}
                                helperText={
                                    link !== "" && !validateURL(link) ? "Veuillez entrer une URL valide." : ""
                                }
                                sx={{ marginBottom: "16px" }}
                            />
                        ))}
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleNextStep}>
                                Suivant
                            </Button>
                            <Button variant="text" onClick={handleNextStep}>
                                Ignorer
                            </Button>
                        </Stack>
                    </Box>
                )}



                {/* Étape 6 : Choix du thème */}
                {step === 5 && (
                    <Box>
                        <Typography variant="h6" textAlign="center" marginBottom="16px">
                            {steps[step]}
                        </Typography>
                        <Typography variant="h6" color="primary" textAlign="center" marginBottom="16px">
                            Choisissez votre thème unique !
                        </Typography>
                        <FormControl required fullWidth>
                            <Select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Sélectionnez un thème
                                </MenuItem>
                                {themes.map((t, index) => (
                                    <MenuItem key={index} value={t.name}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <img src={t.img} alt={t.name} width={50} height={50} />
                                            <Typography>{t.name}</Typography>
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type={step === steps.length - 1 ? "submit" : "button"}
                            sx={{ marginTop: "16px" }}
                            disabled={!theme}
                        >
                            Terminer
                        </Button>
                    </Box>
                )}


                {/* Bouton précédent */}
                {step > 0 && (
                    <Button fullWidth variant="text" onClick={handlePreviousStep} sx={{ marginTop: "16px" }}>
                        Retour
                    </Button>
                )}


            </Box>
        </Box>
    );
}

export default SignUp;
