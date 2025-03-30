<?php
header('Content-Type: application/json');

// Configurações do banco de dados do OpenSim
$db_host = 'seu_servidor_mysql';
$db_name = 'nome_do_banco_opensim';
$db_user = 'seu_usuario';
$db_pass = 'sua_senha';

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obter estatísticas
    $stats = array();
    
    // Total de regiões
    $query = $pdo->query("SELECT COUNT(*) FROM regions");
    $stats['totalRegions'] = $query->fetchColumn();
    
    // Usuários online (ajuste conforme sua estrutura de banco)
    $query = $pdo->query("SELECT COUNT(*) FROM Presence WHERE Online = 1");
    $stats['onlineUsers'] = $query->fetchColumn();
    
    // Total de usuários registrados
    $query = $pdo->query("SELECT COUNT(*) FROM UserAccounts");
    $stats['registeredUsers'] = $query->fetchColumn();
    
    // Total de prims (ajuste conforme sua estrutura)
    $query = $pdo->query("SELECT SUM(prims) FROM regions");
    $stats['totalPrims'] = $query->fetchColumn() ?: 0;
    
    // Regiões mais populares (TOP 5)
    $query = $pdo->query("
        SELECT r.regionName AS name, 
               COUNT(p.RegionID) AS visitors, 
               CASE WHEN r.status = 1 THEN 'Online' ELSE 'Offline' END AS status
        FROM regions r
        LEFT JOIN Presence p ON p.RegionID = r.uuid
        GROUP BY r.regionName
        ORDER BY visitors DESC
        LIMIT 5
    ");
    $stats['popularRegions'] = $query->fetchAll(PDO::FETCH_ASSOC);
    
    // Logins recentes (últimos 5)
    $query = $pdo->query("
        SELECT 
            ua.FirstName || '.' || ua.LastName AS username,
            r.regionName AS region,
            TIME_FORMAT(lg.login, '%H:%i:%s') AS time
        FROM GridUser lg
        JOIN UserAccounts ua ON ua.PrincipalID = lg.UserID
        JOIN regions r ON r.uuid = lg.LastRegionID
        ORDER BY lg.Login DESC
        LIMIT 5
    ");
    $stats['recentLogins'] = $query->fetchAll(PDO::FETCH_ASSOC);
    
    // Dados de atividade de usuários nas últimas 24 horas
    $query = $pdo->query("
        SELECT 
            HOUR(login) AS hour,
            COUNT(*) AS count
        FROM GridUser
        WHERE login >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        GROUP BY HOUR(login)
        ORDER BY hour
    ");
    $activityByHour = array_fill(0, 24, 0);
    $results = $query->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($results as $row) {
        $activityByHour[$row['hour']] = (int)$row['count'];
    }
    
    $stats['userActivity'] = [
        'labels' => array_map(function($h) { return $h . ':00'; }, range(0, 23)),
        'data' => $activityByHour
    ];
    
    // Dados de uso de recursos (exemplo - você precisaria implementar coleta real)
    $stats['resourceUsage'] = [
        'cpu' => rand(30, 80),
        'memory' => rand(40, 90),
        'disk' => rand(20, 60),
        'network' => rand(30, 70)
    ];
    
    echo json_encode($stats);
    
} catch (PDOException $e) {
    // Em caso de erro, retornar código de erro
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?> 