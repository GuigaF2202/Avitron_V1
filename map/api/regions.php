<?php
header(header: 'Content-Type: application/json');

// Configurações do banco de dados do OpenSim
$db_host = 'localhost';
$db_name = 'opensim';
$db_user = 'root';
$db_pass = 'sua_senha';

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obter todas as regiões
    $query = $pdo->query("
        SELECT 
            r.uuid,
            r.regionName AS name,
            r.locX,
            r.locY,
            r.sizeX,
            r.sizeY,
            CASE WHEN r.status = 1 THEN true ELSE false END AS online,
            
            -- Estas colunas podem precisar ser ajustadas com base no seu esquema
            COALESCE(r.owner_uuid, '') AS owner_uuid,
            COALESCE(r.access, 'Public') AS access,
            COALESCE(r.maturity, 'PG') AS maturity,
            
            -- Dados opcionais (ajuste conforme seu esquema)
            (SELECT COUNT(*) FROM Presence WHERE RegionID = r.uuid) AS visitors,
            COALESCE(r.PrimTotal, 0) AS prims,
            COALESCE(r.MaxPrims, 15000) AS maxPrims
        FROM 
            regions r
        ORDER BY 
            r.regionName
    ");
    
    $regions = $query->fetchAll(PDO::FETCH_ASSOC);
    
    // Processar dados adicionais, como nomes de proprietários
    foreach ($regions as &$region) {
        if (!empty($region['owner_uuid'])) {
            $ownerQuery = $pdo->prepare("
                SELECT FirstName, LastName 
                FROM UserAccounts 
                WHERE PrincipalID = ?
            ");
            $ownerQuery->execute(params: [$region['owner_uuid']]);
            $owner = $ownerQuery->fetch(mode: PDO::FETCH_ASSOC);
            
            if ($owner) {
                $region['owner'] = $owner['FirstName'] . ' ' . $owner['LastName'];
            } else {
                $region['owner'] = 'Desconhecido';
            }
        } else {
            $region['owner'] = 'Desconhecido';
        }
        
        // Converter valores numéricos
        $region['locX'] = (int)$region['locX'];
        $region['locY'] = (int)$region['locY'];
        $region['sizeX'] = (int)$region['sizeX'];
        $region['sizeY'] = (int)$region['sizeY'];
        $region['visitors'] = (int)$region['visitors'];
        $region['prims'] = (int)$region['prims'];
        $region['maxPrims'] = (int)$region['maxPrims'];
    }
    
    // Preparar resposta
    $response = [
        'regions' => $regions,
        'totalRegions' => count(value: $regions),
        'onlineRegions' => count(value: array_filter(array: $regions, callback: function($r): mixed { return $r['online']; })),
        'totalUsers' => array_sum(array: array_column(array: $regions, column_key: 'visitors'))
    ];
    
    echo json_encode(value: $response);
} catch (PDOException $e) {
    // Em produção, evite exibir detalhes do erro
    echo json_encode(value: [
        'error' => 'Erro ao conectar ao banco de dados',
        'regions' => [],
        'totalRegions' => 0,
        'onlineRegions' => 0,
        'totalUsers' => 0
    ]);
    
    // Log do erro
    error_log(message: "Erro na API regions.php: " . $e->getMessage());
}