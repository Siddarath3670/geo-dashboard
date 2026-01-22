import React, { useEffect, useState, useMemo } from 'react';
import {
    DataGrid,
    type GridColDef,
    type GridRenderCellParams,
    type GridPaginationModel,
    type GridRowSelectionModel,
    GridToolbar
} from '@mui/x-data-grid';
import { type Project } from '../../types';
import { Chip } from '@mui/material';

interface ProjectTableProps {
    projects: Project[];
    loading: boolean;
    onRowClick: (id: string) => void;
    selectedId: string | null;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, loading, onRowClick, selectedId }) => {

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 50,
        page: 0,
    });


    useEffect(() => {

        setRowSelectionModel({
            type: 'include',
            ids: selectedId ? new Set([selectedId]) : new Set()
        });
    }, [selectedId]);

    const columns: GridColDef[] = useMemo(() => [
        {
            field: 'projectName',
            headerName: 'Project Name',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <span className="font-medium text-slate-700">{params.value}</span>
            )
        },
        { field: 'latitude', headerName: 'Lat', width: 90, type: 'number' },
        { field: 'longitude', headerName: 'Lng', width: 90, type: 'number' },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params: GridRenderCellParams) => {
                const status = params.value as string;
                const statusMap: Record<string, { color: "success" | "warning" | "primary" | "error" | "default" }> = {
                    'Active': { color: 'success' },
                    'Pending': { color: 'warning' },
                    'Completed': { color: 'primary' },
                    'On Hold': { color: 'error' },
                };

                const config = statusMap[status] || { color: 'default' };
                return <Chip label={status} color={config.color} size="small" variant="outlined" sx={{ fontWeight: 500 }} />;
            }
        },
        {
            field: 'lastUpdated',
            headerName: 'Last Updated',
            width: 180,
            valueGetter: (value) => value ? new Date(value as string) : null,
            type: 'dateTime',
        },
    ], []);


    return (
        <div className="h-full w-full bg-white md:rounded-xl md:shadow-sm md:border md:border-slate-200 overflow-hidden flex flex-col">
            <DataGrid
                rows={projects}
                columns={columns}
                loading={loading}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[25, 50, 100]}
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={(newSelectionModel) => {
                    setRowSelectionModel(newSelectionModel);

                    if (newSelectionModel.type === 'include' && newSelectionModel.ids.size > 0) {
                        const firstId = newSelectionModel.ids.values().next().value;
                        if (firstId != null) {
                            onRowClick(firstId.toString());
                        }
                    }
                }}
                slots={{ toolbar: GridToolbar }}
                sx={{
                    border: 'none',
                    fontFamily: 'Inter, sans-serif',
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                            backgroundColor: '#f8fafc', // Slate-50
                        },
                        '&.Mui-selected': {
                            backgroundColor: '#eff6ff', // Blue-50
                            '&:hover': {
                                backgroundColor: '#dbeafe', // Blue-100
                            }
                        }
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #f1f5f9',
                    },
                    '& .MuiDataGrid-cell:focus': { outline: 'none' },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#ffffff',
                        borderBottom: '2px solid #e2e8f0',
                        color: '#64748b',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid #f1f5f9',
                        backgroundColor: '#ffffff',
                    }
                }}
            />
        </div>
    );
};

export default ProjectTable;