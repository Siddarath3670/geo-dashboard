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

    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

    return (
        <div className="h-dvh flex flex-col overflow-hidden bg-slate-50">
            {/* Header */}
            <header className="px-4 md:px-6 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 flex items-center justify-between shadow-sm shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Geo Dashboard
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {projects.length} Projects Loaded
                    </p>
                </div>
                
                {/* Mobile View Toggle */}
                <div className="md:hidden bg-slate-100 p-1 rounded-lg flex space-x-1 border border-slate-200">
                    <button
                        onClick={() => setViewMode('map')}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                            viewMode === 'map' 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        Map
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                            viewMode === 'list' 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        List
                    </button>
                </div>

                {loading && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5">
                        <LinearProgress sx={{ height: '100%' }} />
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden relative">
                {/* Table Section */}
                <div className={`
                    flex-1 flex flex-col h-full bg-white transition-all duration-300 ease-in-out md:w-1/2 md:flex
                    ${viewMode === 'list' ? 'flex' : 'hidden'}
                    md:border-r md:border-slate-200
                `}>
                    <div className="h-full w-full p-0 md:p-4">
                        <ProjectTable
                            projects={projects}
                            loading={loading}
                            onRowClick={(id) => {
                                handleRowClick(id);
                                // On mobile, switch to map when clicking a row
                                if (window.innerWidth < 768) {
                                    setViewMode('map');
                                }
                            }}
                            selectedId={selectedId}
                        />
                    </div>
                </div>

                {/* Map Section */}
                <div className={`
                    flex-1 h-full relative bg-slate-100 md:w-1/2 md:flex
                    ${viewMode === 'map' ? 'flex' : 'hidden'}
                `}>
                    <div className="absolute inset-0">
                        <MapComponent
                            projects={projects}
                            selectedId={selectedId}
                            onMarkerClick={(id) => {
                                handleMarkerClick(id);
                                // Optional: On mobile, maybe show a bottom sheet or just stay on map?
                                // Staying on map is standard for "locating".
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
