-- Dados Iniciais: Universidades
INSERT INTO universities (id, short_name, full_name, campus, city, latitude, longitude, default_zoom, tag, description)
VALUES 
('ufsc-trindade', 'UFSC Trindade', 'Universidade Federal de Santa Catarina', 'Campus Reitor João David Ferreira Lima (Trindade)', 'Florianópolis - SC', -27.60100, -48.51860, 15, 'Principal', 'Campus central da UFSC, sede da Reitoria, CTC, CCS, CSE, CFH, CCE, CCB e CED.'),
('udesc-itacorubi', 'UDESC Itacorubi', 'Universidade do Estado de Santa Catarina', 'Campus I - Itacorubi', 'Florianópolis - SC', -27.58550, -48.50820, 15, 'Expansão', 'Campus da ESAG, CEART e FAED na Rodovia Amaro Antônio Vieira.'),
('ifsc-centro', 'IFSC Centro', 'Instituto Federal de Santa Catarina', 'Campus Florianópolis (Mauro Ramos)', 'Florianópolis - SC', -27.59560, -48.54340, 15, 'Expansão', 'Campus tradicional na Av. Mauro Ramos no Centro.'),
('unisul-centro', 'Unisul Centro', 'Universidade do Sul de Santa Catarina', 'Unidade Trajano', 'Florianópolis - SC', -27.59470, -48.55280, 15, 'Expansão', 'Campus no Centro Histórico de Florianópolis.')
ON DUPLICATE KEY UPDATE short_name = VALUES(short_name);

