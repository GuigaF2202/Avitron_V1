// Function to format large numbers with commas
function formatNumber(num) {
    return num.toLocaleString();
}

// Function to update the timestamp
function updateTimestamp() {
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleString();
}

// Function to fetch simulated local data
async function fetchData() {
    try {
        // Simulated data
        const data = {
            totalRegions: 250,
            onlineUsers: 78,
            registeredUsers: 15482,
            totalPrims: 8745692,
            popularRegions: [
                { name: 'Centro Comercial', visitors: 23, status: 'Online' },
                { name: 'Ilha Paradisíaca', visitors: 19, status: 'Online' },
                { name: 'Metrópole Virtual', visitors: 15, status: 'Online' },
                { name: 'Arena de Jogos', visitors: 12, status: 'Online' },
                { name: 'Escola Virtual', visitors: 9, status: 'Offline' }
            ],
            recentLogins: [
                { username: 'Maria.Silva', region: 'Centro Comercial', time: '14:32:15' },
                { username: 'Carlos.Oliveira', region: 'Ilha Paradisíaca', time: '14:28:42' },
                { username: 'Ana.Santos', region: 'Metrópole Virtual', time: '14:15:20' },
                { username: 'Pedro.Costa', region: 'Arena de Jogos', time: '14:05:11' },
                { username: 'Lucia.Ferreira', region: 'Escola Virtual', time: '13:58:33' }
            ],
            userActivity: {
                labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
            },
            resourceUsage: {
                cpu: 45,
                memory: 68,
                disk: 32,
                network: 58
            }
        };

        // Update counters
        document.getElementById('regions-count').textContent = formatNumber(data.totalRegions);
        document.getElementById('online-users').textContent = formatNumber(data.onlineUsers);
        document.getElementById('total-users').textContent = formatNumber(data.registeredUsers);
        document.getElementById('total-prims').textContent = formatNumber(data.totalPrims);

        // Update tables
        updatePopularRegionsTable(data.popularRegions);
        updateRecentLoginsTable(data.recentLogins);

        // Update charts
        updateUserActivityChart(data.userActivity);
        updateResourceUsageChart(data.resourceUsage);

        updateTimestamp();
    } catch (error) {
        console.error('Error loading simulated data:', error);
    }
}

// Function to update the popular regions table
function updatePopularRegionsTable(regions) {
    const tableBody = document.querySelector('#popular-regions tbody');
    tableBody.innerHTML = '';

    const fragment = document.createDocumentFragment();

    regions.forEach(region => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${region.name}</td>
            <td>${region.visitors}</td>
            <td>
                <span class="status ${region.status.toLowerCase()}">
                    <i class="fas fa-circle"></i> ${region.status}
                </span>
            </td>
        `;
        fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);
}

// Function to update the recent logins table
function updateRecentLoginsTable(logins) {
    const tableBody = document.querySelector('#recent-logins tbody');
    tableBody.innerHTML = '';

    const fragment = document.createDocumentFragment();

    logins.forEach(login => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${login.username}</td>
            <td>${login.region}</td>
            <td>${login.time}</td>
        `;
        fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);
}

// Function to create user activity chart
function updateUserActivityChart(activityData) {
    const ctx = document.getElementById('user-activity-chart').getContext('2d');

    if (window.userActivityChart) {
        window.userActivityChart.destroy();
    }

    window.userActivityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: activityData.labels,
            datasets: [{
                label: 'Online Users',
                data: activityData.data,
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Function to create resource usage chart
function updateResourceUsageChart(resourceData) {
    const ctx = document.getElementById('resource-usage-chart').getContext('2d');

    if (window.resourceUsageChart) {
        window.resourceUsageChart.destroy();
    }

    window.resourceUsageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['CPU', 'Memory', 'Disk', 'Network'],
            datasets: [{
                data: [
                    resourceData.cpu,
                    resourceData.memory,
                    resourceData.disk,
                    resourceData.network
                ],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(243, 156, 18, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            cutout: '70%'
        }
    });
}

// Function to refresh all data every minute
function startAutoRefresh() {
    // Initial load
    fetchData();

    // Update every minute
    setInterval(fetchData, 60000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', startAutoRefresh);// Função para formatar números grandes
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Função para atualizar o timestamp
function updateTimestamp() {
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleString();
}

// Função para obter dados simulados localmente
async function fetchData() {
    try {
        // Dados simulados
        const data = {
            totalRegions: 250,
            onlineUsers: 78,
            registeredUsers: 15482,
            totalPrims: 8745692,
            popularRegions: [
                { name: 'Centro Comercial', visitors: 23, status: 'Online' },
                { name: 'Ilha Paradisíaca', visitors: 19, status: 'Online' },
                { name: 'Metrópole Virtual', visitors: 15, status: 'Online' },
                { name: 'Arena de Jogos', visitors: 12, status: 'Online' },
                { name: 'Escola Virtual', visitors: 9, status: 'Offline' }
            ],
            recentLogins: [
                { username: 'Maria.Silva', region: 'Centro Comercial', time: '14:32:15' },
                { username: 'Carlos.Oliveira', region: 'Ilha Paradisíaca', time: '14:28:42' },
                { username: 'Ana.Santos', region: 'Metrópole Virtual', time: '14:15:20' },
                { username: 'Pedro.Costa', region: 'Arena de Jogos', time: '14:05:11' },
                { username: 'Lucia.Ferreira', region: 'Escola Virtual', time: '13:58:33' }
            ],
            userActivity: {
                labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
            },
            resourceUsage: {
                cpu: 45,
                memory: 68,
                disk: 32,
                network: 58
            }
        };

        // Atualize os contadores
        document.getElementById('regions-count').textContent = formatNumber(data.totalRegions);
        document.getElementById('online-users').textContent = formatNumber(data.onlineUsers);
        document.getElementById('total-users').textContent = formatNumber(data.registeredUsers);
        document.getElementById('total-prims').textContent = formatNumber(data.totalPrims);

        // Atualize as tabelas
        updatePopularRegionsTable(data.popularRegions);
        updateRecentLoginsTable(data.recentLogins);

        // Atualize os gráficos
        updateUserActivityChart(data.userActivity);
        updateResourceUsageChart(data.resourceUsage);

        updateTimestamp();
    } catch (error) {
        console.error('Erro ao carregar dados simulados:', error);
    }
}

// Função para atualizar a tabela de regiões populares
function updatePopularRegionsTable(regions) {
    const tableBody = document.querySelector('#popular-regions tbody');
    tableBody.innerHTML = '';
    
    regions.forEach(region => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${region.name}</td>
            <td>${region.visitors}</td>
            <td>
                <span class="status ${region.status.toLowerCase()}">
                    <i class="fas fa-circle"></i> ${region.status}
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para atualizar a tabela de logins recentes
function updateRecentLoginsTable(logins) {
    const tableBody = document.querySelector('#recent-logins tbody');
    tableBody.innerHTML = '';
    
    logins.forEach(login => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${login.username}</td>
            <td>${login.region}</td>
            <td>${login.time}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para criar gráfico de atividade de usuários
function updateUserActivityChart(activityData) {
    const ctx = document.getElementById('user-activity-chart').getContext('2d');
    
    if (window.userActivityChart) {
        window.userActivityChart.destroy();
    }
    
    window.userActivityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: activityData.labels,
            datasets: [{
                label: 'Usuários Online',
                data: activityData.data,
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Função para criar gráfico de uso de recursos
function updateResourceUsageChart(resourceData) {
    const ctx = document.getElementById('resource-usage-chart').getContext('2d');
    
    if (window.resourceUsageChart) {
        window.resourceUsageChart.destroy();
    }
    
    window.resourceUsageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['CPU', 'Memória', 'Disco', 'Rede'],
            datasets: [{
                data: [
                    resourceData.cpu,
                    resourceData.memory,
                    resourceData.disk,
                    resourceData.network
                ],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(243, 156, 18, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            cutout: '70%'
        }
    });
}

// Função para atualizar todos os dados a cada minuto
function startAutoRefresh() {
    // Primeira carga
    fetchData();
    
    // Atualizar a cada minuto
    setInterval(fetchData, 60000);
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', startAutoRefresh);