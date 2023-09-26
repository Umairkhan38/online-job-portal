import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction, deleteUserAction } from '../../redux/actions/userAction';


const DashUsers = () => {

    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    useEffect(() => {
        dispatch(allUserAction());
    }, []);

    
  
    const columns = [

        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
            editable: true,
        },

        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },
        {
            field: 'firstName',
            headerName: 'firstName',
            width: 150,
        },

        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular user"
            )
        },

        {
            field: 'jobHistory',
            headerName: 'Last Applied Job',
            width: 200,
            valueGetter: (params) => {
                console.log("params is ",params)
                return params?.value[(params?.value?.length)-1]?.title
              }           
        },

        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },

        
    ];

    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All users
                </Typography>

                <Paper sx={{ bgcolor: "#67e3b9" }} >

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{

                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                    bgcolor:'white'
                                },
                                color: 'black',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: '#c6e3b8'
                                },
                                button: {
                                    color: 'black'
                                }

                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default DashUsers
