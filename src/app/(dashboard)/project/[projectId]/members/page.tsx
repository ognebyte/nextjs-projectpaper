'use client'

import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/store/store";
import { FIREBASE_DB } from "@/firebase/config";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { getProjectMembers, removeProjectMember } from "@/firebase/features/member";
import { DataGrid, GridActionsCellItem, GridToolbar, GridValueGetterParams, gridClasses } from '@mui/x-data-grid';
import moment from "moment";


export default function Members() {
    const currentProject = useAppSelector((state) => state.projectReducer)
    const projectPath = 'project/' + currentProject.id
    const [members, setMembers] = useState<DocumentData[]>([]);

    useEffect(() => {
        getMembers()
    }, [currentProject.members, currentProject.userRole])

    async function getMembers() {
        const arr = await getProjectMembers(currentProject.id, currentProject.members)
        setMembers(arr)
    }

    function copyLink() {
        const copyButton = document.getElementById('copyButton')
        if (!copyButton) return alert('Something went wrong! Please try again later.')
        navigator.clipboard.writeText(document.URL)
        copyButton.innerText = 'Copied!'
        setTimeout(() => {
            copyButton.innerText = 'Copy'
        }, 1000);
    }

    async function toggleAdmin(id: any, role: any) {
        await updateDoc(doc(FIREBASE_DB, `users/${id}/projects/${currentProject.id}`), {
            role: role == 'member' ? 'admin' : 'member'
        })
        getMembers()
    }
    async function remove(id: any) {
        var r = confirm("Remove member?");
        if (r === true) {
            if (!await removeProjectMember(currentProject.id, id))
                alert('Something went wrong! Please try again later.')
        }
    }

    const columnVisibilityModel = useMemo(() => {
        if (currentProject.userRole) { return currentProject.userRole == 'member' ? { actions: false } : { actions: true }; }
    }, [currentProject.userRole]);


    return (
        <div className="members-container">
            {!currentProject.userRole ? null : currentProject.userRole == 'member' ? null : !currentProject.requests ? null :
                <div className="project-link">
                    <p>Invite link:</p>
                    <input id="link" className="link" type="text" defaultValue={projectPath} readOnly={true} />
                    <button id="copyButton" className="button-default" onClick={copyLink}>Copy</button>
                </div>
            }
            <DataGrid className="table"
                loading={members.length == 0}
                columns={[
                    {
                        field: 'avatar', headerName: 'Avatar', width: 80, sortable: false, filterable: false,
                        valueGetter: (params: GridValueGetterParams) => ({ letter: params.row.username[0], color: params.row.color }),
                        renderCell: ({ value }) => (
                            <h1 className="avatar flex-center" style={{ backgroundColor: value.color }}>
                                {value.letter}
                            </h1>
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
                        field: 'actions', width: 80, type: "actions", sortable: false, filterable: false,
                        getActions: (params) => params.row.role == 'owner' ? [] : !currentProject.userRole ? [] :
                            params.row.role == 'admin' && currentProject.userRole == 'admin' ? [] : [
                                <GridActionsCellItem
                                    label={params.row.role == 'admin' ? 'Dismiss Admin' : 'Make Admin'}
                                    onClick={() => toggleAdmin(params.id, params.row.role)}
                                    showInMenu
                                />,
                                <GridActionsCellItem
                                    label="Remove member"
                                    style={{ color: 'rgb(181, 48, 44)' }}
                                    onClick={() => remove(params.id)}
                                    disabled={!currentProject.userRole ? true : (params.row.role == 'admin' && currentProject.userRole == 'admin' ? true : false)}
                                    showInMenu
                                />,
                            ]
                    },
                ]}
                rows={members}
                getRowId={(row) => row.userId}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 }, } }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true, } }}
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