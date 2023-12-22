'use client'

import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/store/store";
import { DocumentData } from "firebase/firestore";
import { getProjectMembers } from "@/firebase/features/member";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment";
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams, gridClasses } from '@mui/x-data-grid';
import DotsVertical from "@/assets/svg/dots-vertical";


const COLORS = ['#8AB4F8', '#F28B82', '#FDD663', '#81C995', '#FF8BCB', '#C58AF9', '#FCAD70', '#78D9EC',]


export default function Members() {
    const currentProject = useAppSelector((state) => state.projectReducer)
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const sitePath = 'http://localhost:3000'
    const projectPath = 'project/' + currentProject.id
    const projectLink = sitePath + '/' + projectPath
    const [members, setMembers] = useState<DocumentData[]>([]);
    const [currentMember, setCurrentMember] = useState<DocumentData>();
    const [selectedTable, setSelectedTable] = useState('members');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        getMembers()
    }, [currentProject.members])

    const columnVisibilityModel = useMemo(() => {
        if (currentMember) {
            return currentMember.role == 'member' ? { actions: false } : { actions: true };
        }
    }, [currentMember]);

    async function getMembers() {
        const arr = await getProjectMembers(currentProject.id, currentProject.members)
        const res = arr.find(({ userId }) => userId == currentUser.uid)
        if (res) setCurrentMember(res)
        setMembers(arr)
    }

    function copyLink() {
        const copyButton = document.getElementById('copyButton')
        if (!copyButton) return alert('Something went wrong! Please try again later.')
        navigator.clipboard.writeText(projectLink)
        copyButton.innerText = 'Copied!'
        setTimeout(() => {
            copyButton.innerText = 'Copy'
        }, 1000);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    async function dismissAdmin(id: any) {
        console.log("dadmin", id)
    }
    async function makeAdmin(id: any) {
        console.log("admin", id)
    }
    async function remove(id: any) {
        console.log("remove", id)
    }


    return (
        <div className="members-container">
            {!currentProject.requests ? null :
                <div className="project-link">
                    <p>Invite link:</p>
                    <input className="link" type="text" defaultValue={projectPath} readOnly={true} />
                    <button id="copyButton" className="button-default" onClick={copyLink}>Copy</button>
                </div>
            }
            <DataGrid className="table"
                loading={members.length == 0}
                rows={members}
                columns={[
                    {
                        field: 'avatar', headerName: 'Avatar', width: 80, sortable: false, filterable: false,
                        valueGetter: (params: GridValueGetterParams) => params.row.username[0],
                        renderCell: ({ value }) => (
                            <div className="avatar-container">
                                <h1 className="avatar flex-center" style={{ backgroundColor: COLORS[Math.floor(Math.random() * 8)] }}>
                                    {value}
                                </h1>
                            </div>
                        ),
                    },
                    { field: 'username', headerName: 'Username', width: 200, type: "string" },
                    { field: 'email', headerName: 'Email', width: 160, type: "string" },
                    { field: 'role', headerName: 'Role', width: 120, type: "string" },
                    {
                        field: 'joined', headerName: 'Joined', width: 140, type: "dateTime",
                        valueGetter: ({ value }) => moment.unix(value).toDate(),
                        renderCell: ({ value }) => moment(value).format('ll'),
                    },
                    {
                        field: 'actions', headerName: 'Actions', width: 80, sortable: false, filterable: false,
                        valueGetter: (params: GridValueGetterParams) => ({ id: params.row.id, role: params.row.role }),
                        renderCell: ({ value }) => (
                            value.role == 'owner' ? null :
                                <div className="action">
                                    <button className="board-option" onClick={(e: any) => handleClick(e)}>
                                        <DotsVertical />
                                    </button>
                                    <Menu anchorEl={anchorEl} open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                    >
                                        <MenuItem onClick={() => value.role == 'admin' ? dismissAdmin(value.id) : makeAdmin(value.id)}>
                                            <p>{value.role == 'admin' ? 'Dismiss Admin' : 'Make admin'}</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => remove(value.id)}>
                                            <p style={{ color: 'rgb(181, 48, 44)' }}>Remove</p>
                                        </MenuItem>
                                    </Menu>
                                </div>
                        )
                    }
                ]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true, } }}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 }, } }}
                pageSizeOptions={[50, 100, 150, 200]}
                columnVisibilityModel={columnVisibilityModel}
                disableColumnSelector
                disableColumnMenu
                disableDensitySelector
                rowSelection={false}
                sx={{
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { outline: 'none', },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: { outline: 'none', },
                }}
            />
        </div>
    )
}