import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const SocialLinksManager = ({ socialLinks, onAddLink, onLinkChange, getSocialIcon }) => (
    <Box sx={{ width: '100%' }}>
        <h4>Réseaux sociaux</h4>
        {socialLinks.map((link, index) => (
            <Box
                key={index}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <TextField
                    select
                    SelectProps={{ native: true }}
                    label="Réseau"
                    value={link.type}
                    onChange={(e) => onLinkChange(index, 'type', e.target.value)}
                    sx={{ width: '40%', marginRight: '10px' }}
                >
                    <option value="">Choisir</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                </TextField>

                <TextField
                    label="Lien"
                    value={link.url}
                    onChange={(e) => onLinkChange(index, 'url', e.target.value)}
                    sx={{ flex: 1, marginRight: '10px' }}
                />

                <IconButton
                    onClick={() => window.open(link.url, '_blank')}
                    disabled={!link.url}
                    color="primary"
                >
                    {getSocialIcon(link.type)}
                </IconButton>
            </Box>
        ))}
        <IconButton onClick={onAddLink}>
            <AddCircleOutline />
        </IconButton>
    </Box>
);

export default SocialLinksManager;
