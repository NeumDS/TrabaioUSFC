-- ===================================================================
-- Esquema de Banco de Dados MySQL: AlugaUFSC
-- ===================================================================

CREATE DATABASE IF NOT EXISTS aluga_ufsc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aluga_ufsc;

-- Tabela de Universidades (suporte a expansão: UFSC, UDESC, IFSC, Unisul)
CREATE TABLE IF NOT EXISTS universities (
    id VARCHAR(50) PRIMARY KEY,
    short_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    campus VARCHAR(255),
    city VARCHAR(100),
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    default_zoom INT DEFAULT 15,
    tag VARCHAR(50),
    description TEXT
);

-- Tabela de Imóveis
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    subtype VARCHAR(100),
    address VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    cep VARCHAR(20),
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    monthly_rent DOUBLE NOT NULL,
    condo_fee DOUBLE DEFAULT 0,
    iptu DOUBLE DEFAULT 0,
    insurance DOUBLE DEFAULT 0,
    bills_water_included BOOLEAN DEFAULT FALSE,
    bills_power_included BOOLEAN DEFAULT FALSE,
    bills_internet_included BOOLEAN DEFAULT FALSE,
    bills_condo_included BOOLEAN DEFAULT FALSE,
    bills_summary VARCHAR(255),
    bedrooms INT DEFAULT 1,
    bathrooms INT DEFAULT 1,
    area_m2 INT,
    parking_spots INT DEFAULT 0,
    floor INT DEFAULT 1,
    sun_orientation VARCHAR(100),
    furnished_status VARCHAR(50),
    furniture_items TEXT,
    amenities TEXT,
    description TEXT,
    photos TEXT,
    contact_name VARCHAR(150),
    contact_type VARCHAR(100),
    contact_phone VARCHAR(50),
    contact_whatsapp VARCHAR(50),
    contact_email VARCHAR(150),
    contact_creci VARCHAR(50),
    transparency_score DOUBLE,
    
    -- Indicadores Estruturais e de Mofo
    mofo_level VARCHAR(20),
    mofo_score DOUBLE,
    mofo_note TEXT,
    infiltracoes_score DOUBLE,
    infiltracoes_note TEXT,
    acustica_score DOUBLE,
    acustica_note TEXT,
    seguranca_rua_score DOUBLE,
    seguranca_rua_note TEXT,
    internet_score DOUBLE,
    internet_speed_mbps INT,
    internet_provider VARCHAR(100),
    internet_note TEXT,
    transporte_score DOUBLE,
    distance_stop_meters INT,
    bus_lines VARCHAR(255)
);

-- Tabela de Histórico de Preços
CREATE TABLE IF NOT EXISTS price_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    date_label VARCHAR(50),
    monthly_rent DOUBLE NOT NULL,
    notes VARCHAR(255),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Tabela de Avaliações de Estudantes
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY,
    property_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    course VARCHAR(150),
    period VARCHAR(100),
    rating INT NOT NULL,
    verified_resident BOOLEAN DEFAULT TRUE,
    title VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    pros TEXT,
    cons TEXT,
    created_at DATE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

