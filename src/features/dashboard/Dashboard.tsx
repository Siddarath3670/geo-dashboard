import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import type { Project } from '../../types';
import { fetchAllProjects } from '../../services/api';
import ProjectTable from '../table/ProjectTable';
import MapComponent from '../map/MapComponent';

const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            // Fetch ALL data for client-side handling 
            const data = await fetchAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleRowClick = (id: string) => {
        setSelectedId(id);
    };

    const handleMarkerClick = (id: string) => {
        setSelectedId(id);
    };

    return (
        <div className="h-dvh flex flex-col overflow-hidden bg-slate-50">
            {/* Header */}
            <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 flex items-center justify-between shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Geo Dashboard
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {projects.length} Projects Loaded
                    </p>
                </div>
                {loading && (
                    <div className="w-1/3 absolute bottom-0 left-0 right-0">
                        <LinearProgress sx={{ height: 2 }} />
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col-reverse md:flex-row overflow-hidden relative">
                {/* Table Section - Bottom on mobile, Left on desktop */}
                <div className="flex-1 h-1/2 md:h-full overflow-hidden border-r border-slate-200 bg-white relative z-10 transition-all duration-300 ease-in-out">
                    <div className="h-full w-full p-4">
                        <ProjectTable
                            projects={projects}
                            loading={loading}
                            onRowClick={handleRowClick}
                            selectedId={selectedId}
                        />
                    </div>
                </div>

                {/* Map Section - Top on mobile, Right on desktop */}
                <div className="flex-1 h-1/2 md:h-full relative bg-slate-100">
                    <div className="absolute inset-0">
                        <MapComponent
                            projects={projects}
                            selectedId={selectedId}
                            onMarkerClick={handleMarkerClick}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
