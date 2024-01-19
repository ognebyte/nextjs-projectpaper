import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment";

import { ComponentLoading } from "@/app/_components/loadings";
import Plus from "@/assets/svg/plus"
import DotsVertical from "@/assets/svg/dots-vertical";


export default function TasksBoard({ boards, boardsTasks, deleteBoard }: { boards: any, boardsTasks: any, deleteBoard: any }) {
    const { replace } = useRouter()
    const [selectedBoard, setSelectedBoard] = useState('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
    
    return (
        <div className="tasks-board">
            {!boards ? null :
                boards.map((board: DocumentData) => (
                    <div className="board" key={board.id}>
                        <div className="board-header" style={{ borderColor: board.color }}>
                            <span className="board-background" style={{ backgroundColor: board.color }} />
                            <div className="board-name">
                                <h3>{board.name} ({!board.tasks ? '0' : board.tasks.length})</h3>
                            </div>
                            <button className="board-option" onClick={(e: any) => { handleClick(e); setSelectedBoard(board.id) }}>
                                <DotsVertical />
                            </button>
                        </div>
                        <ul className="tasks">
                            <span className="tasks-background" style={{ backgroundColor: board.color }} />
                            {!board.tasks ? null : !boardsTasks ?
                                <div className="tasks-loading"><ComponentLoading /></div> :
                                board.tasks.map((taskId: string) => {
                                    var task = boardsTasks.find((el: any) => el.id === taskId)
                                    if (!task) return null
                                    return (
                                        <li key={taskId} id={taskId} className="task"
                                            onClick={() => replace(`?modal=task&board=${board.id}&task=${taskId}`, { scroll: false })}
                                        >
                                            <p className="title">{task.title}</p>
                                            {task.priority == 0 ? null :
                                                <div className="priority-container">
                                                    <p>Priority:</p>
                                                    <p className={'priority priority-' + task.priority}>
                                                        {task.priority == 1 ? 'Low' : task.priority == 2 ? 'Medium' : 'High'}
                                                    </p>
                                                </div>
                                            }
                                            {!task.date ? null :
                                                <p>
                                                    Due date: {moment.unix(task.date).format('ll')}
                                                    {!task.time ? '' : `, ${task.time}`}
                                                </p>
                                            }
                                            <p className="created-at">
                                                {task.updatedAt ? 'Updated' : 'Created'} at: {moment.unix(task.updatedAt ? task.updatedAt : task.createdAt).format('ll')}
                                            </p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <button className="task-create"
                            onClick={() => replace(`?modal=task&board=${board.id}`, { scroll: false })}
                        >
                            <p>Add task</p>
                        </button>
                    </div>
                ))
            }
            <div className="board-create">
                <button className="button-plus flex-center"
                    onClick={() => replace('?modal=board', { scroll: false })}
                >
                    <h3>New board</h3>
                    <Plus />
                </button>
            </div>
            <Menu anchorEl={anchorEl} open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={() => replace(`?modal=board&board=${selectedBoard}`, { scroll: false })}>
                    <p>Edit</p>
                </MenuItem>
                <MenuItem onClick={() => deleteBoard(selectedBoard)}>
                    <p style={{ color: 'rgb(181, 48, 44)' }}>Delete</p>
                </MenuItem>
            </Menu>
        </div>
    )
}