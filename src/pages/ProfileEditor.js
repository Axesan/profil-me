import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Avatar, Box, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction, Grid2, Paper, IconButton, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline, FacebookRounded, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import AvatarUploader from '../components/ProfileEditor/AvatarUploader';
import ProfileCard from '../components/ProfileEditor/ProfileCard';
import SocialLinksManager from '../components/ProfileEditor/SocialLinkManager';


function ProfileEditor() {
    const { register, handleSubmit } = useForm();


    const [photo, setPhoto] = useState("/static/images/avatar/2.jpg");  // Image par défaut
    const [name, setName] = useState('')
    const [bio, setBio] = useState("")
    const [title, setTitle] = useState("")
    const [socialLinks, setSocialLinks] = useState([]); // État pour les réseaux sociaux

    const onSubmit = (data) => {
        console.log('Profile Data:', data, socialLinks);
    };

    //Link social
    const handleAddSocialLink = () => {
        setSocialLinks([...socialLinks, { type: '', url: '' }]); // Ajoute un nouveau champ
    };

    const handleSocialChange = (index, field, value) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index][field] = value;
        setSocialLinks(updatedLinks); // Met à jour les réseaux sociaux
    };

    const getSocialIcon = (type) => {
        switch (type) {
            case 'Facebook': return <FacebookRounded color="primary" />;
            case 'Twitter': return <Twitter color="primary" />;
            case 'Instagram': return <Instagram color="secondary" />;
            case 'LinkedIn': return <LinkedIn color="primary" />;
            default: return null;
        }
    };

    const [titleError, setTitleError] = useState(false); // Pour la bordure rouge du titre
    const [nameError, setNameError] = useState(false); // Pour la bordure rouge du nom
    const [bioError, setBioError] = useState(false); // Pour la bordure rouge de la bio

    // Fonction pour afficher l'erreur pendant un certain temps (ex. 3 secondes)
    const showErrorForLimitedTime = (setError) => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000); // L'erreur disparaît après 3 secondes
    };

    const handleNameChange = (event) => {
        if (event.target.value.length <= 20) {
            setName(event.target.value);
            setNameError(false); // Annule l'erreur si sous la limite
        } else {
            showErrorForLimitedTime(setNameError); // Affiche l'erreur pendant 3 secondes
        }
    };
    const handleBioChange = (event) => {
        if (event.target.value.length <= 200) {
            setBio(event.target.value);
            setBioError(false); // Annule l'erreur si sous la limite
        } else {
            showErrorForLimitedTime(setBioError); // Affiche l'erreur pendant 3 secondes
        }

    };
    const handleTitleChange = (event) => {
        if (event.target.value.length <= 20) {
            setTitle(event.target.value);
            setTitleError(false); // Annule l'erreur si sous la limite
        } else {
            showErrorForLimitedTime(setTitleError); // Affiche l'erreur pendant 3 secondes
        }
    };



    // Fonction pour gérer le changement de photo
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPhoto(e.target.result); // Convertir le fichier en base64
            reader.readAsDataURL(file);
        }
    };
    return (
        <Grid2 container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={3} justifyContent="center">
            {/* Formulaire */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    padding: '20px',
                    border: "1px solid #000",
                    borderRadius: 3,
                    margin: '0 auto', // Centre horizontalement
                    maxWidth: '400px', // Largeur maximale fixe
                    width: '100%', // Prend toute la largeur disponible si l'écran est plus petit
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px', // Espacement entre les champs
                    alignItems: 'center', // Centrage des champs
                }}
            >
                {/* Photos user */}
                <AvatarUploader onPhotoChange={handlePhotoChange} photo={photo} />
                {titleError && (
                    <Typography color="error" variant="body2" sx={{ marginTop: '5px' }}>
                        Le titre ne peut pas dépasser 20 caractères.
                    </Typography>
                )}
                {nameError && (
                    <Typography color="error" variant="body2" sx={{ marginTop: '5px' }}>
                        Le nom ne peut pas dépasser 20 caractères.
                    </Typography>
                )}
                {bioError && (
                    <Typography color="error" variant="body2" sx={{ marginTop: '5px' }}>
                        La bio ne peut pas dépasser 200 caractères.
                    </Typography>
                )}

                <TextField

                    label="Titre - (20 charactéres)"
                    {...register('titre')}
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth
                />
                <TextField

                    label="Nom - (20 charactéres)"
                    {...register('name')}
                    value={name}
                    onChange={handleNameChange}
                    fullWidth
                />
                <TextField

                    label="Bio - (200 charactéres)"
                    {...register('bio')}
                    value={bio}
                    onChange={handleBioChange}
                    fullWidth
                    multiline
                    rows={4}
                />
                {/* Réseaux sociaux */}
                <SocialLinksManager
                    socialLinks={socialLinks}
                    onAddLink={handleAddSocialLink}
                    onLinkChange={handleSocialChange}
                    getSocialIcon={getSocialIcon}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Enregistrer
                </Button>
            </form>


            {/* Card pour le profil */}
            <ProfileCard
                photo={photo}
                title={title}
                name={name}
                bio={bio}
                socialLinks={socialLinks}
                getSocialIcon={getSocialIcon}
            />
        </Grid2>
    );
}

export default ProfileEditor;
