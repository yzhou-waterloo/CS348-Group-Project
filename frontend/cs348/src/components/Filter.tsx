'use client'

import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TextField from '@mui/material/TextField';

interface FilterProps {
    filterCol: string;
    filterVal: string;
    setFilterVal: React.Dispatch<React.SetStateAction<string>>;
    setFilterVis: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Filter(props: FilterProps) {
    return (
        <div className="flex justify-left items-center border border-black p-2 mb-2 rounded-lg font-[family-name:var(--font-geist-sans)]">
            <IconButton 
                aria-label="delete" 
                color="error"
                onClick={() => {
                    props.setFilterVal("");
                    props.setFilterVis(false);
                }}
            >
                <DeleteOutlineIcon/>
            </IconButton>
            <p className="mr-2">
                {props.filterCol}
            </p>
            <TextField 
                id="filter-text" 
                label={props.filterCol} 
                variant="outlined"
                value={props.filterVal}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setFilterVal(event.target.value);
                }}
                required
            />
        </div>
    )
}