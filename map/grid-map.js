document.addEventListener('DOMContentLoaded', function() {
    // Configurações do mapa
    const mapConfig = {
        baseZoom: 1.0,
        minZoom: 0.5,
        maxZoom: 4.0,
        zoomStep: 0.2,
        regionSize: 256, // Tamanho padrão de uma região em pixels
        defaultRegionImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    };

    // Estado do mapa
    const mapState = {
        zoom: mapConfig.baseZoom,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        lastMouseX: 0,
        lastMouseY: 0,
        regions: [],
        selectedRegion: null,
        filters: {
            online: true,
            offline: true,
            searchTerm: ''
        }
    };

    // Elementos do DOM
    const elements = {
        mapCanvas: document.getElementById('map-canvas'),
        regionInfo: document.getElementById('region-info'),
        regionList: document.getElementById('region-list'),
        regionCount: document.getElementById('region-count'),
        regionSearch: document.getElementById('region-search'),
        searchBtn: document.getElementById('search-btn'),
        zoomIn: document.getElementById('zoom-in'),
        zoomOut: document.getElementById('zoom-out'),
        resetView: document.getElementById('reset-view'),
        themeSelector: document.getElementById('theme-selector'),
        filterOnline: document.getElementById('filter-online'),
        filterOffline: document.getElementById('filter-offline'),
        gridStats: document.getElementById('grid-stats'),
        coordX: document.getElementById('coord-x'),
        coordY: document.getElementById('coord-y'),
        lastUpdate: document.getElementById('last-update'),
        gridMap: document.getElementById('grid-map'),
        regionPopup: document.getElementById('region-popup'),
        popupTitle: document.getElementById('popup-title'),
        popupInfo: document.getElementById('popup-info'),
        popupClose: document.getElementById('popup-close'),
        teleportBtn: document.getElementById('teleport-btn'),
        moreInfoBtn: document.getElementById('more-info-btn'),
        loadingOverlay: document.querySelector('.loading-overlay')
    };

    // ===== Funções principais =====

    // Carregar dados das regiões
    // Modify the loadRegionsData function
async function loadRegionsData() {
    try {
        // Instead of fetching from API, fetch from static JSON file
        const response = await fetch('regions.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.regions || !Array.isArray(data.regions)) {
            throw new Error('Invalid data format in JSON file');
        }
        
        mapState.regions = data.regions;
        
        // Update statistics
        elements.gridStats.textContent = `${data.totalRegions} regiões, ${data.onlineRegions} online`;
        elements.regionCount.textContent = data.totalRegions;
        elements.lastUpdate.textContent = new Date().toLocaleString();
        
        return data;
    } catch (error) {
        console.error('Erro ao carregar dados das regiões:', error);
        // In case of failure, use demo data as a fallback
        return generateDemoData();
    } finally {
        // Hide loading overlay
        elements.loadingOverlay.style.display = 'none';
    }
}

    // Gerar dados fictícios para demonstração
    function generateDemoData() {
        const demoRegions = [];
        const regionNames = [
            'Welcome Plaza', 'Shopping Center', 'Paradise Island', 
            'Downtown', 'Mountain Resort', 'Marina Bay', 
            'University Campus', 'Sport Complex', 'Art Gallery',
            'Skyline Heights', 'Ocean View', 'Desert Oasis'
        ];
        
        // Gerar grade 5x5 de regiões
        for (let x = -2; x <= 2; x++) {
            for (let y = -2; y <= 2; y++) {
                const region = {
                    uuid: `demo-${x}-${y}`,
                    name: regionNames[Math.floor(Math.random() * regionNames.length)],
                    locX: x,
                    locY: y,
                    sizeX: 256,
                    sizeY: 256,
                    online: Math.random() > 0.2,
                    access: Math.random() > 0.8 ? 'Private' : 'Public',
                    owner: 'Demo User',
                    visitors: Math.floor(Math.random() * 20),
                    prims: Math.floor(Math.random() * 15000),
                    maturity: ['G', 'PG', 'Adult'][Math.floor(Math.random() * 3)]
                };
                demoRegions.push(region);
            }
        }
        
        return {
            regions: demoRegions,
            totalRegions: demoRegions.length,
            onlineRegions: demoRegions.filter(r => r.online).length,
            totalUsers: Math.floor(Math.random() * 50)
        };
    }

    // Renderizar o mapa
    function renderMap() {
        // Limpar o canvas do mapa
        elements.mapCanvas.innerHTML = '';
        
        // Calcular limites do mapa
        const bounds = calculateMapBounds(mapState.regions);
        
        // Ajustar o tamanho do canvas
        const mapWidth = (bounds.maxX - bounds.minX + 1) * mapConfig.regionSize;
        const mapHeight = (bounds.maxY - bounds.minY + 1) * mapConfig.regionSize;
        
        elements.mapCanvas.style.width = `${mapWidth}px`;
        elements.mapCanvas.style.height = `${mapHeight}px`;
        
        // Criar elementos para cada região
        mapState.regions.forEach(region => {
            // Verificar filtros
            if (
                (region.online && !mapState.filters.online) || 
                (!region.online && !mapState.filters.offline) ||
                (mapState.filters.searchTerm && !region.name.toLowerCase().includes(mapState.filters.searchTerm.toLowerCase()))
            ) {
                return;
            }
            
            // Criar elemento de região
            const regionElement = document.createElement('div');
            regionElement.className = `region ${region.online ? 'online' : 'offline'}`;
            regionElement.dataset.uuid = region.uuid;
            
            // Posicionar a região
            const posX = (region.locX - bounds.minX) * mapConfig.regionSize;
            const posY = (mapHeight - (region.locY - bounds.minY + 1) * mapConfig.regionSize);
            
            regionElement.style.left = `${posX}px`;
            regionElement.style.top = `${posY}px`;
            regionElement.style.width = `${mapConfig.regionSize}px`;
            regionElement.style.height = `${mapConfig.regionSize}px`;
            
            // Adicionar plano de fundo (simulando imagem da região)
            regionElement.classList.add('region-image-placeholder');
            
            // Adicionar nome da região
            const nameElement = document.createElement('div');
            nameElement.className = 'region-name';
            nameElement.textContent = region.name;
            regionElement.appendChild(nameElement);
            
            // Adicionar indicador de status
            const statusElement = document.createElement('div');
            statusElement.className = `region-status ${region.online ? 'online' : 'offline'}`;
            regionElement.appendChild(statusElement);
            
            // Adicionar evento de clique
            regionElement.addEventListener('click', () => {
                selectRegion(region);
            });
            
            // Adicionar evento para mostrar popup
            regionElement.addEventListener('click', (e) => {
                showRegionPopup(region, e.clientX, e.clientY);
            });
            
            elements.mapCanvas.appendChild(regionElement);
        });
        
        // Centralizar o mapa inicialmente se for a primeira renderização
        if (mapState.offsetX === 0 && mapState.offsetY === 0) {
            centerMap();
        }
        
        // Aplicar transformação atual
        updateMapTransform();
    }

    // Calcular os limites do mapa
    function calculateMapBounds(regions) {
        if (!regions || regions.length === 0) {
            return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
        }
        
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        
        regions.forEach(region => {
            minX = Math.min(minX, region.locX);
            maxX = Math.max(maxX, region.locX);
            minY = Math.min(minY, region.locY);
            maxY = Math.max(maxY, region.locY);
        });
        
        // Adicionar margens
        minX -= 1;
        maxX += 1;
        minY -= 1;
        maxY += 1;
        
        return { minX, maxX, minY, maxY };
    }

    // Atualizar transformação do mapa
    function updateMapTransform() {
        elements.mapCanvas.style.transform = `translate(${mapState.offsetX}px, ${mapState.offsetY}px) scale(${mapState.zoom})`;
    }

    // Centralizar o mapa
    function centerMap() {
        const mapWrapper = elements.gridMap;
        const mapCanvas = elements.mapCanvas;
        
        // Calcular centro
        const wrapperWidth = mapWrapper.clientWidth;
        const wrapperHeight = mapWrapper.clientHeight;
        const canvasWidth = mapCanvas.clientWidth * mapState.zoom;
        const canvasHeight = mapCanvas.clientHeight * mapState.zoom;
        
        // Centralizar no mapa
        mapState.offsetX = (wrapperWidth - canvasWidth) / 2;
        mapState.offsetY = (wrapperHeight - canvasHeight) / 2;
        
        // Aplicar transformação
        updateMapTransform();
    }

    // Atualizar lista de regiões
    function updateRegionList() {
        elements.regionList.innerHTML = '';
        
        const filteredRegions = mapState.regions.filter(region => {
            return (
                (region.online && mapState.filters.online) || 
                (!region.online && mapState.filters.offline)
            ) && (
                !mapState.filters.searchTerm || 
                region.name.toLowerCase().includes(mapState.filters.searchTerm.toLowerCase())
            );
        });
        
        // Ordenar por nome
        filteredRegions.sort((a, b) => a.name.localeCompare(b.name));
        
        // Atualizar contador
        elements.regionCount.textContent = filteredRegions.length;
        
        // Criar itens da lista
        filteredRegions.forEach(region => {
            const item = document.createElement('div');
            item.className = 'region-list-item';
            item.dataset.uuid = region.uuid;
            
            const statusIndicator = document.createElement('div');
            statusIndicator.className = `status-indicator ${region.online ? 'online' : 'offline'}`;
            
            const name = document.createElement('div');
            name.className = 'region-name-text';
            name.textContent = region.name;
            
            const coords = document.createElement('div');
            coords.className = 'region-coords';
            coords.textContent = `${region.locX},${region.locY}`;
            
            item.appendChild(statusIndicator);
            item.appendChild(name);
            item.appendChild(coords);
            
            item.addEventListener('click', () => {
                jumpToRegion(region);
                selectRegion(region);
            });
            
            elements.regionList.appendChild(item);
        });
    }

    // Selecionar uma região
    function selectRegion(region) {
        mapState.selectedRegion = region;
        
        // Destacar na lista
        const listItems = document.querySelectorAll('.region-list-item');
        listItems.forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.uuid === region.uuid) {
                item.classList.add('selected');
            }
        });
        
        // Atualizar painel de informações
        updateRegionInfo(region);
    }

    // Atualizar informações da região
    function updateRegionInfo(region) {
        if (!region) {
            elements.regionInfo.innerHTML = '<p>Selecione uma região no mapa para ver detalhes.</p>';
            return;
        }
        
        elements.regionInfo.innerHTML = `
            <table>
                <tr>
                    <td>Nome:</td>
                    <td>${region.name}</td>
                </tr>
                <tr>
                    <td>Coordenadas:</td>
                    <td>${region.locX}, ${region.locY}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>
                        <span style="color: ${region.online ? 'var(--secondary)' : 'var(--danger)'}">
                            ${region.online ? 'Online' : 'Offline'}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Acesso:</td>
                    <td>${region.access || 'Público'}</td>
                </tr>
                <tr>
                    <td>Proprietário:</td>
                    <td>${region.owner || 'Desconhecido'}</td>
                </tr>
                <tr>
                    <td>Visitantes:</td>
                    <td>${region.visitors || 0}</td>
                </tr>
                <tr>
                    <td>Prims:</td>
                    <td>${region.prims || 0} / ${region.maxPrims || '∞'}</td>
                </tr>
                <tr>
                    <td>Classificação:</td>
                    <td>${region.maturity || 'Geral'}</td>
                </tr>
            </table>
            <button id="jump-to-btn" class="teleport-btn" style="margin-top: 15px; width: 100%;">
                Ir para ${region.name}
            </button>
        `;
        
        // Adicionar evento ao botão
        document.getElementById('jump-to-btn').addEventListener('click', () => {
            jumpToRegion(region);
        });
    }

    // Mostrar popup da região
    function showRegionPopup(region, x, y) {
        elements.popupTitle.textContent = region.name;
        
        elements.popupInfo.innerHTML = `
            <table>
                <tr>
                    <td>Coordenadas:</td>
                    <td>${region.locX}, ${region.locY}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>
                        <span style="color: ${region.online ? 'var(--secondary)' : 'var(--danger)'}">
                            ${region.online ? 'Online' : 'Offline'}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Visitantes:</td>
                    <td>${region.visitors || 0}</td>
                </tr>
            </table>
        `;
        
        // Posicionar o popup
        const popup = elements.regionPopup;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        
        // Verificar se o popup ultrapassa a tela
        const rect = popup.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            popup.style.left = `${x - rect.width}px`;
        }
        if (rect.bottom > window.innerHeight) {
            popup.style.top = `${y - rect.height}px`;
        }
        
        // Mostrar popup
        popup.style.display = 'block';
        
        // Configurar ações
        elements.teleportBtn.onclick = () => {
            teleportToRegion(region);
            closePopup();
        };
        
        elements.moreInfoBtn.onclick = () => {
            selectRegion(region);
            closePopup();
        };
    }

    // Fechar popup
    function closePopup() {
        elements.regionPopup.style.display = 'none';
    }

    // Ir para uma região no mapa
    function jumpToRegion(region) {
        const mapWrapper = elements.gridMap;
        const bounds = calculateMapBounds(mapState.regions);
        
        // Calcular posição da região
        const posX = (region.locX - bounds.minX) * mapConfig.regionSize;
        const posY = ((bounds.maxY - bounds.minY + 1) * mapConfig.regionSize) - (region.locY - bounds.minY + 1) * mapConfig.regionSize;
        
        // Ajustar offset para centralizar a região
        mapState.offsetX = (mapWrapper.clientWidth / 2) - (posX * mapState.zoom) - (mapConfig.regionSize * mapState.zoom / 2);
        mapState.offsetY = (mapWrapper.clientHeight / 2) - (posY * mapState.zoom) - (mapConfig.regionSize * mapState.zoom / 2);
        
        // Aplicar transformação
        updateMapTransform();
        
        // Atualizar coordenadas
        updateCoordinateDisplay(region.locX, region.locY);
    }

    // Simular teleporte (apenas para demonstração)
    function teleportToRegion(region) {
        if (!region.online) {
            alert(`Não é possível teleportar para ${region.name} pois a região está offline.`);
            return;
        }
        
        // Em um cenário real, isso abriria um URI do OpenSim para teleporte
        alert(`Simulando teleporte para ${region.name} (${region.locX}, ${region.locY})\n\nEm uma aplicação real, isso abriria o visualizador do OpenSim.`);
    }

    // Atualizar display de coordenadas
    function updateCoordinateDisplay(x, y) {
        elements.coordX.textContent = x;
        elements.coordY.textContent = y;
    }

    // Calcular coordenadas do mapa a partir da posição do mouse
    function calculateMapCoords(mouseX, mouseY) {
        const bounds = calculateMapBounds(mapState.regions);
        const mapWrapper = elements.gridMap;
        const rect = mapWrapper.getBoundingClientRect();
        
        // Posição relativa do mouse no wrapper
        const relX = mouseX - rect.left;
        const relY = mouseY - rect.top;
        
        // Posição ajustada para o offset e zoom
        const adjustedX = (relX - mapState.offsetX) / mapState.zoom;
        const adjustedY = (relY - mapState.offsetY) / mapState.zoom;
        
        // Converter para coordenadas do grid
        const gridX = Math.floor(adjustedX / mapConfig.regionSize) + bounds.minX;
        const gridY = bounds.maxY - Math.floor(adjustedY / mapConfig.regionSize);
        
        return { x: gridX, y: gridY };
    }

    // ===== Eventos do usuário =====

    // Evento de arrastar o mapa
    elements.gridMap.addEventListener('mousedown', (e) => {
        if (e.target.closest('.region')) return; // Ignorar se clicar em uma região
        
        mapState.isDragging = true;
        mapState.lastMouseX = e.clientX;
        mapState.lastMouseY = e.clientY;
        elements.gridMap.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        // Atualizar coordenadas
        const coords = calculateMapCoords(e.clientX, e.clientY);
        updateCoordinateDisplay(coords.x, coords.y);
        
        if (!mapState.isDragging) return;
        
        const deltaX = e.clientX - mapState.lastMouseX;
        const deltaY = e.clientY - mapState.lastMouseY;
        
        mapState.offsetX += deltaX;
        mapState.offsetY += deltaY;
        
        mapState.lastMouseX = e.clientX;
        mapState.lastMouseY = e.clientY;
        
        updateMapTransform();
    });

    document.addEventListener('mouseup', () => {
        mapState.isDragging = false;
        elements.gridMap.style.cursor = 'grab';
    });

    // Eventos de zoom
    elements.zoomIn.addEventListener('click', () => {
        if (mapState.zoom < mapConfig.maxZoom) {
            mapState.zoom += mapConfig.zoomStep;
            updateMapTransform();
        }
    });

    elements.zoomOut.addEventListener('click', () => {
        if (mapState.zoom > mapConfig.minZoom) {
            mapState.zoom -= mapConfig.zoomStep;
            updateMapTransform();
        }
    });

    elements.resetView.addEventListener('click', () => {
        mapState.zoom = mapConfig.baseZoom;
        centerMap();
    });

    // Evento de mousewheel para zoom
    elements.gridMap.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // Calcular coordenadas do mouse antes do zoom
        const rect = elements.gridMap.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calcular posição do mouse relativa ao mapa
        const relativeX = (mouseX - mapState.offsetX) / mapState.zoom;
        const relativeY = (mouseY - mapState.offsetY) / mapState.zoom;
        
        // Ajustar zoom
        if (e.deltaY < 0 && mapState.zoom < mapConfig.maxZoom) {
            mapState.zoom += mapConfig.zoomStep;
        } else if (e.deltaY > 0 && mapState.zoom > mapConfig.minZoom) {
            mapState.zoom -= mapConfig.zoomStep;
        }
        
        // Recalcular offset para manter o ponto sob o mouse
        mapState.offsetX = mouseX - relativeX * mapState.zoom;
        mapState.offsetY = mouseY - relativeY * mapState.zoom;
        
        updateMapTransform();
    });

    // Evento para fechar popup
    elements.popupClose.addEventListener('click', closePopup);

    // Eventos de filtro
    elements.filterOnline.addEventListener('change', (e) => {
        mapState.filters.online = e.target.checked;
        renderMap();
        updateRegionList();
    });

    elements.filterOffline.addEventListener('change', (e) => {
        mapState.filters.offline = e.target.checked;
        renderMap();
        updateRegionList();
    });

    // Evento de busca
    elements.searchBtn.addEventListener('click', () => {
        mapState.filters.searchTerm = elements.regionSearch.value;
        renderMap();
        updateRegionList();
    });

    elements.regionSearch.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            mapState.filters.searchTerm = elements.regionSearch.value;
            renderMap();
            updateRegionList();
        }
    });

    // Evento de mudar tema
    elements.themeSelector.addEventListener('change', (e) => {
        elements.gridMap.className = `grid-map ${e.target.value}-theme`;
    });

    // ===== Inicialização =====
    
    // Função de inicialização
    async function initialize() {
        try {
            const data = await loadRegionsData();
            renderMap();
            updateRegionList();
        } catch (error) {
            console.error('Erro ao inicializar o mapa:', error);
            elements.gridStats.textContent = 'Erro ao carregar dados do grid';
            elements.loadingOverlay.style.display = 'none';
        }
    }
    
    // Iniciar o mapa
    initialize();
}); 