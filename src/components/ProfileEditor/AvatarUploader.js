import React from 'react';
import { Avatar, Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const AvatarUploader = ({ photo, onPhotoChange }) => (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', }}>
        <Avatar sx={{ width: 150, height: 150 }} alt="User Avatar" src={photo} />
        <SpeedDial
            ariaLabel="Modifier la photo"
            sx={{ position: 'absolute', top: 45 }}
            icon={<SpeedDialIcon />}
            size="small"
        >
            <SpeedDialAction
                icon={<EditIcon />}
                tooltipTitle="Changer la photo"
                onClick={() => document.getElementById('upload-photo').click()}
            />
        </SpeedDial>
        <input
            id="upload-photo"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onPhotoChange}
        />
    </Box>
);

export default AvatarUploader;
