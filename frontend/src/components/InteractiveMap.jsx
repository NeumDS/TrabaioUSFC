import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatCurrency, formatDistance } from '../utils/formatters';
import { LocateFixed, Layers, ZoomIn, ZoomOut } from 'lucide-react';

export default function InteractiveMap({
  properties,
  activeUniversity,
  selectedProperty,
  onSelectProperty,
  hoveredPropertyId,
  radiusKm,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const universityMarkerRef = useRef(null);
  const radiusCircleRef = useRef(null);
  const propertyMarkersRef = useRef({});

  // 1. Inicializa o mapa Leaflet
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [activeUniversity.lat, activeUniversity.lng],
        zoom: 15,
        zoomControl: false, // Usaremos controles customizados
      });

      // Camada de azulejos OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | AlugaUFSC',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Atualiza a Universidade Central e o Raio de Proximidade
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeUniversity) return;

    // Voa suavemente para a universidade selecionada
    map.flyTo([activeUniversity.lat, activeUniversity.lng], 15, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    // Remove marcador antigo da universidade se existir
    if (universityMarkerRef.current) {
      map.removeLayer(universityMarkerRef.current);
    }

    // Cria marcador especial para a Universidade (com pulse animado)
    const uniIconHtml = `
      <div class="ufsc-marker-pulse">
        <div style="
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #1d4ed8;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(29, 78, 216, 0.45);
          border: 3px solid white;
          font-size: 18px;
        ">
          🎓
        </div>
      </div>
    `;

    const uniIcon = L.divIcon({
      className: 'custom-university-icon',
      html: uniIconHtml,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    const uniMarker = L.marker([activeUniversity.lat, activeUniversity.lng], {
      icon: uniIcon,
      zIndexOffset: 1000,
    }).addTo(map);

    uniMarker.bindPopup(`
      <div style="padding: 12px; font-family: system-ui, sans-serif;">
        <div style="font-weight: 800; color: #1e3a8a; font-size: 14px; margin-bottom: 2px;">
          ${activeUniversity.fullName}
        </div>
        <div style="font-size: 12px; color: #475569; font-weight: 600; margin-bottom: 6px;">
          ${activeUniversity.campus}
        </div>
        <div style="font-size: 11px; color: #64748b; line-height: 1.3;">
          ${activeUniversity.description}
        </div>
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #e2e8f0; font-size: 11px; font-weight: 700; color: #2563eb;">
          📍 Ponto de referência zero para distâncias
        </div>
      </div>
    `);

    universityMarkerRef.current = uniMarker;

    // Atualiza ou desenha o círculo do raio de proximidade
    if (radiusCircleRef.current) {
      map.removeLayer(radiusCircleRef.current);
      radiusCircleRef.current = null;
    }

    if (radiusKm) {
      const circle = L.circle([activeUniversity.lat, activeUniversity.lng], {
        radius: radiusKm * 1000,
        color: '#2563eb',
        fillColor: '#3b82f6',
        fillOpacity: 0.08,
        weight: 2,
        dashArray: '6, 8',
      }).addTo(map);

      radiusCircleRef.current = circle;
    }
  }, [activeUniversity, radiusKm]);

  // 3. Atualiza os Marcadores dos Imóveis
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Limpa marcadores anteriores
    Object.values(propertyMarkersRef.current).forEach((marker) => {
      map.removeLayer(marker);
    });
    propertyMarkersRef.current = {};

    properties.forEach((prop) => {
      const isAvailable = prop.available;
      const isSelected = selectedProperty?.id === prop.id;
      const isHovered = hoveredPropertyId === prop.id;

      // Ícone estilo Airbnb com preço e status
      const bgColor = isAvailable
        ? isSelected || isHovered
          ? '#1d4ed8' // Azul vibrante ativo
          : '#10b981' // Verde esmeralda disponível
        : '#64748b'; // Cinza/ardósia indisponível

      const statusTag = isAvailable ? '' : ' (Alugado)';

      const markerHtml = `
        <div class="price-marker-pin ${isSelected ? 'active' : ''}" style="
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: ${bgColor};
          color: white;
          padding: 5px 10px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          border: 2px solid white;
          cursor: pointer;
        ">
          <span>${formatCurrency(prop.monthlyRent)}</span>
          <span style="font-size: 10px; opacity: 0.9;">${statusTag}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-property-pin',
        html: markerHtml,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      });

      const marker = L.marker([prop.lat, prop.lng], {
        icon: customIcon,
        zIndexOffset: isSelected || isHovered ? 500 : 100,
      }).addTo(map);

      // Conteúdo do Popup moderno
      const popupHtml = `
        <div style="width: 250px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <div style="position: relative; height: 130px; width: 100%; overflow: hidden;">
            <img src="${prop.photos[0]}" alt="${prop.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            <span style="
              position: absolute;
              top: 8px;
              left: 8px;
              background: ${isAvailable ? '#10b981' : '#64748b'};
              color: white;
              font-size: 10px;
              font-weight: 700;
              padding: 2px 8px;
              border-radius: 9999px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              ${isAvailable ? 'Disponível' : 'Alugado (Histórico)'}
            </span>
            <span style="
              position: absolute;
              bottom: 8px;
              right: 8px;
              background: rgba(15, 23, 42, 0.85);
              backdrop-filter: blur(4px);
              color: white;
              font-size: 11px;
              font-weight: 700;
              padding: 3px 8px;
              border-radius: 6px;
            ">
              ${formatDistance(prop.distanceKm)} da ${activeUniversity.shortName}
            </span>
          </div>

          <div style="padding: 12px;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 2px;">
              ${prop.neighborhood} • ${prop.subtype}
            </div>
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px; line-height: 1.3;">
              ${prop.title}
            </div>

            <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 8px;">
              <span style="font-size: 16px; font-weight: 800; color: #1e3a8a;">
                ${formatCurrency(prop.monthlyRent)}
              </span>
              <span style="font-size: 11px; color: #64748b;">/mês</span>
            </div>

            <div style="font-size: 11px; color: #475569; display: flex; gap: 8px; margin-bottom: 12px;">
              <span>🛏️ ${prop.bedrooms} qto${prop.bedrooms > 1 ? 's' : ''}</span>
              <span>🚿 ${prop.bathrooms} banh</span>
              <span>📐 ${prop.areaM2} m²</span>
            </div>

            <button 
              id="btn-popup-${prop.id}"
              style="
                width: 100%;
                background: #2563eb;
                color: white;
                border: none;
                padding: 7px 12px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 700;
                cursor: pointer;
                transition: background 0.2s;
              "
              onmouseover="this.style.background='#1d4ed8'"
              onmouseout="this.style.background='#2563eb'"
            >
              Ver Detalhes & Histórico
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 280 });

      // Ao abrir o popup, vincula o botão para a ação de selecionar
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-popup-${prop.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectProperty(prop);
          };
        }
      });

      // Ao clicar no marcador, notifica o componente pai
      marker.on('click', () => {
        onSelectProperty(prop);
      });

      propertyMarkersRef.current[prop.id] = marker;
    });
  }, [properties, selectedProperty, hoveredPropertyId, activeUniversity]);

  // 4. Centraliza no imóvel quando selecionado externamente
  useEffect(() => {
    if (!selectedProperty || !mapInstanceRef.current) return;
    const marker = propertyMarkersRef.current[selectedProperty.id];
    if (marker) {
      mapInstanceRef.current.panTo([selectedProperty.lat, selectedProperty.lng], {
        animate: true,
        duration: 0.6,
      });
      marker.openPopup();
    }
  }, [selectedProperty]);

  // Botões de controle de tela
  const handleRecenter = () => {
    if (!mapInstanceRef.current || !activeUniversity) return;
    mapInstanceRef.current.flyTo([activeUniversity.lat, activeUniversity.lng], 15, {
      duration: 0.8,
    });
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="relative w-full h-full min-h-[350px]">
      {/* Contêiner Leaflet */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Controles Flutuantes do Mapa */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Centralizar na Universidade */}
        <button
          onClick={handleRecenter}
          className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-md border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-white transition-all flex items-center gap-1.5 text-xs font-bold"
          title={`Centralizar na ${activeUniversity.shortName}`}
        >
          <LocateFixed className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Centralizar {activeUniversity.shortName}</span>
        </button>

        {/* Zoom In/Out */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 flex flex-col overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="p-2 text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors border-b border-slate-100"
            title="Aproximar zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
            title="Afastar zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legenda de Proximidade e Status */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-md border border-slate-200 text-xs flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block ring-2 ring-emerald-200"></span>
          <span>Disponível</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-slate-500">
          <span className="w-3 h-3 rounded-full bg-slate-500 inline-block ring-2 ring-slate-200"></span>
          <span>Alugado (Histórico)</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-blue-700 border-l border-slate-200 pl-3">
          <span>🎓</span>
          <span>{activeUniversity.shortName}</span>
        </div>
        {radiusKm && (
          <div className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-bold">
            Raio {radiusKm} km ativo
          </div>
        )}
      </div>
    </div>
  );
}

