import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid, GridActionsCellItem, GridComparatorFn, GridToolbar, GridValueGetterParams, gridClasses } from '@mui/x-data-grid';
import moment from "moment";

import { ComponentLoading } from "@/app/_components/loadings";
import Plus from "@/assets/svg/plus"
import DotsVertical from "@/assets/svg/dots-vertical";
import { deleteDocTask } from "@/firebase/features/task";


export default function TasksTable({ boards, boardsTasks, currentProject }: { boards: any, boardsTasks: any, currentProject: any }) {
    const [currentBoard, setCurrentBoard] = useState()
    const { replace } = useRouter()

    const dateComparator: GridComparatorFn<any> = (a, b) => {
        const [dateA, dateB] = [moment.unix(a.date).format('YYYY-MM-DD'), moment.unix(b.date).format('YYYY-MM-DD')];
        const [timeA, timeB] = [a.time || '00:00', b.time || '00:00'];
        const [dateTimeA, dateTimeB] = [moment(dateA + ' ' + timeA, 'YYYY-MM-DD HH:mm'), moment(dateB + ' ' + timeB, 'YYYY-MM-DD HH:mm')];
        if (!dateTimeA.isValid() || !dateTimeB.isValid()) return !dateTimeA.isValid() ? 1 : -1;
        return dateTimeA.isBefore(dateTimeB) ? -1 : dateTimeA.isAfter(dateTimeB) ? 1 : 0;
    }
    

    return (
        <div className="tasks-table">
            <div className="boards-container">
                <nav className="boards">
                    {!boards ? null :
                        boards.map((board: DocumentData) => (
                            <button key={board.id}
                                className={`board ${currentBoard == board.id ? 'active' : ''}`}
                                onClick={() => setCurrentBoard(board.id)}
                                style={{ backgroundColor: board.color }}
                            >
                                {board.name} ({!board.tasks ? '0' : board.tasks.length})
                            </button>
                        ))
                    }
                </nav>
                <button className="board-new"
                    onClick={() => replace('?modal=board', { scroll: false })}
                >
                    New board
                </button>
            </div>
            <div className="table">
                <DataGrid
                    columns={[
                        { field: 'title', headerName: 'Title', width: 160, },
                        {
                            field: 'priority', headerName: 'Priority', width: 100, cellClassName: 'priority',
                            renderCell: ({ value }) => value == 0 ? '' :
                                <div className={`priority-${value}`}>
                                    {value == 1 ? 'low' : value == 2 ? 'medium' : 'high'}
                                </div>
                        },
                        { field: 'description', headerName: 'Description', width: 200, },
                        {
                            field: 'dueDate', headerName: 'Due date', width: 160, sortComparator: dateComparator,
                            valueGetter: (params: GridValueGetterParams) => ({ date: params.row.date, time: params.row.time }),
                            renderCell: ({ value }) => !value.date ? null : moment.unix(value.date).format('ll') + (!value.time ? '' : `, ${value.time}`),
                        },
                        {
                            field: 'createdAt', headerName: 'Created at', width: 160,
                            renderCell: ({ value }) => moment.unix(value).format('ll, HH:mm')
                        },
                        {
                            field: 'actions', width: 80, type: "actions", sortable: false, filterable: false,
                            getActions: (params) => [
                                <GridActionsCellItem
                                    label='Edit'
                                    onClick={() => replace(`?modal=task&board=${params.row.board}&task=${params.id}`, { scroll: false })}
                                    showInMenu
                                />,
                                <GridActionsCellItem
                                    label='Delete'
                                    style={{color: 'rgb(181, 48, 44)'}}
                                    onClick={async () => {
                                        if (!await deleteDocTask(currentProject.id, params.row.board, params.row.id, [...boards]))
                                            alert('Something went wrong! Please try again later.')
                                    }}
                                    showInMenu
                                />,
                            ]
                        },
                    ]}
                    rows={boardsTasks.filter((board: DocumentData) => board.board == currentBoard)}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 }, } }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{ toolbar: { showQuickFilter: true, } }}
                    pageSizeOptions={[50, 100, 150, 200]}
                    disableColumnMenu
                    rowSelection={false}
                    sx={{
                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { outline: 'none', },
                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: { outline: 'none', },
                    }}
                />
            </div>
        </div>
    )
}