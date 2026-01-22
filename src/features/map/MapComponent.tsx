import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { Project } from '../../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
    projects: Project[];
    selectedId: string | null;
    onMarkerClick: (id: string) => void;
}

const MapRecenter = ({ selectedProject }: { selectedProject: Project | undefined }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedProject) {
            map.setView([selectedProject.latitude, selectedProject.longitude], 13, {
                animate: true,
            });
        }
    }, [selectedProject, map]);
    return null;
}

const MapComponent: React.FC<MapComponentProps> = ({ projects, selectedId, onMarkerClick }) => {
    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapRecenter selectedProject={selectedProject} />

            <MarkerClusterGroup
                chunkedLoading
                spiderfyOnMaxZoom={true}
                showCoverageOnHover={false}
            >
                {projects.map((project) => (
                    <Marker
                        key={project.id}
                        position={[project.latitude, project.longitude]}
                        eventHandlers={{
                            click: () => onMarkerClick(project.id),
                        }}
                    >
                        <Popup>
                            <strong>{project.projectName}</strong><br />
                            Status: {project.status}
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default MapComponent;
