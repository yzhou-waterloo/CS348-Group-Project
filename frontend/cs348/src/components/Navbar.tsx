'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/app/AdminContext'
import Dialog from "@mui/material/Dialog"
import { Button, DialogActions, DialogContent, DialogTitle, IconButton, styled, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

const ADMIN_USER = "admin";
const ADMIN_PASS = "cs348";

export default function Navbar() {
    const { admin_loggedin, setAdminLoggedin } = useAdmin()
    const [adminLoginOpen, setAdminLoginOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleLogin() {
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            setAdminLoggedin(true);
            setAdminLoginOpen(false);
            setUsername('');
            setPassword('');
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="relative flex flex-row w-full p-3 mb-4 justify-center bg-gray-200 font-[family-name:var(--font-geist-sans)]">
            {!admin_loggedin && (
                <button
                    className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
                    onClick={() => setAdminLoginOpen(true)}
                > 
                    Admin Login
                </button>
            )}
            
            {admin_loggedin && (
                <button
                    className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow"
                    onClick={() => setAdminLoggedin(false)}
                > 
                    Admin Logout
                </button>
            )}

            <BootstrapDialog
                onClose={() => setAdminLoginOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={adminLoginOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Admin Login
                </DialogTitle>
                <IconButton
                aria-label="close"
                onClick={() => setAdminLoginOpen(false)}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
                >
                <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                <TextField
                    margin="dense"
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                /> 

                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleLogin()} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </BootstrapDialog>
                        
            <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/get">Get</Link>
            <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/analytics">Analytics</Link>
            {admin_loggedin && (
                <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/insert">Insert</Link>
            )}
            {admin_loggedin && (
                <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/delete">Delete</Link>
            )}
            {admin_loggedin && (
                <Link className="p-2 m-2 bg-white border text-3xl border-black rounded-lg" href="/update">Update</Link>
            )}
        </div>
    );
}
  