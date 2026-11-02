# 🎓 AlugaUFSC — Plataforma de Aluguel Universitário & Histórico Transparente

> **Mapa Interativo UFSC Florianópolis (Campus Reitor João David Ferreira Lima — Trindade)**  
> Plataforma web moderna e responsiva voltada para universitários encontrarem moradia próxima às universidades, com foco inicial na **UFSC** e arquitetura pronta para expansão (**UDESC, IFSC e Unisul**).

---

## 🌟 Diferenciais da Plataforma

Ao contrário de portais imobiliários tradicionais, o **AlugaUFSC** foi concebido por e para a realidade dos estudantes:
1. **Histórico Perpétuo de Preços**: Os imóveis continuam no mapa e na base de dados mesmo após serem alugados, permitindo que os estudantes verifiquem se houve reajustes abusivos nos últimos semestres letivos (2022 a 2026).
2. **Diagnóstico Estrutural & Mofo**: Florianópolis possui inverno úmido característico de cidade litorânea insular. Cada imóvel possui avaliação sobre **risco de mofo**, incidência solar (ex: *Sol da Manhã*), histórico de infiltrações e acústica (isolamento de barulho de festas universitárias na Carvoeira/Trindade e trânsito na Lauro Linhares).
3. **Qualidade da Internet & Segurança**: Teste de velocidade de fibra óptica dedicada para estudos remotos e índice de iluminação/segurança na volta da aula noturna.
4. **Transporte & Circular UFSC**: Linhas diretas (135/136 Volta ao Morro Carvoeira/Pantanal, 137/138, Circular gratuito) e distância até os pontos de ônibus mais próximos.
5. **Cálculo Real de Distâncias**: Geodésia precisa (Haversine) medindo a distância e tempo de deslocamento (**a pé**, **bike** e **circular**) até os portões e centros de ensino (CTC, CCS, CSE, CFH, CED, BU e RU).

---

## 🗺️ 1. Mapa Interativo (Leaflet + OpenStreetMap)

- **Centralização real na UFSC Trindade**: Coordenadas precisas `[-27.60100, -48.51860]`.
- **Marcador com Efeito Pulsante Radar**: Destaca a Reitoria e Praça da Cidadania da UFSC.
- **Raio de Proximidade Dinâmico**: Permite traçar círculos de **1 km (a pé)**, **3 km (bike/bus)**, **5 km** ou **10 km** ao redor do campus.
- **Pinos com Preço e Status (Airbnb/QuintoAndar Style)**: Verde esmeralda para imóveis disponíveis e cinza/ardósia para imóveis alugados (modo histórico).
- **Popups Interativos**: Clique no pino para pré-visualizar foto, bairro, valor mensal, quartos e botão direto de detalhes.
- **Sincronização Bidirecional**: Passar o cursor sobre um card na lateral destaca o marcador no mapa com animação de foco.

---

## 🔍 2. Filtros de Pesquisa Dinâmicos

Os filtros atualizam instantaneamente o mapa e a listagem:
- **Universidade / Campus**: Alternância suave entre **UFSC Trindade**, **UDESC Itacorubi**, **IFSC Centro** e **Unisul**.
- **Faixa de Valor**: Slider interativo de R$ 800 a R$ 3.500+.
- **Raio do Campus**: 1 km, 3 km, 5 km ou todos.
- **Quantidade de Quartos**: Qualquer, 1 Quarto, 2 Quartos ou 3+ Quartos.
- **Tipo de Moradia**: Individual (Kitnet/Studio/Apê) ou Compartilhado (Quarto em República).
- **Status da Mobília**: Todos, Totalmente Mobiliado, Semi-Mobiliado ou Sem Mobília.
- **Contas Inclusas**: Filtro rápido para imóveis com água, luz ou internet inclusas no condomínio.
- **Apenas Disponíveis**: Oculta temporariamente os imóveis alugados quando o usuário quer locação imediata.
- **Busca Textual**: Busca por ruas reais (ex: *Lauro Linhares*, *Vitor Lima*, *Edu Vieira*, *Duarte Silva*) e bairros (*Trindade*, *Carvoeira*, *Pantanal*, *Córrego Grande*, *Serrinha*, *Itacorubi*, *Santa Mônica*).

---

## 🏠 3. Detalhes do Imóvel & Ações Rápidas

- **Galeria de Fotos**: Navegação por setas, contador e miniaturas.
- **Custos Financeiros Transparentes**: Discriminação de aluguel, condomínio, IPTU e seguro contra incêndio, exibindo o **Custo Mensal Estimado Total**.
- **Ficha Técnica & Mobília**: Checklist dos itens fornecidos (escrivaninha de estudos, cama box, ar-condicionado, geladeira frost-free, máquina lava e seca).
- **Falar com Anunciante via WhatsApp**: Template pré-preenchido com código do imóvel e apresentação universitária, além de agendamento de visita presencial ou tour virtual.
- **Avaliações com Selo "Morador Verificado"**: Estudantes reais compartilhando prós, contras e vivência.
- **Formulário de Nova Avaliação**: Qualquer estudante pode registrar novas notas e relatos para enriquecer o banco de dados.

---

## 🛠️ Tecnologias Utilizadas

### Front-end:
- **React 19** com **Vite** para inicialização ultrarrápida.
- **Leaflet & OpenStreetMap**: Renderização cartográfica interativa sem limites de API keys proprietárias.
- **Tailwind CSS**: Design responsivo com visual profissional e moderno.
- **Lucide Icons**: Ícones minimalistas para interface imobiliária.

### Back-end (Arquitetura REST com Java 21):
- **Java 21 LTS**
- **Spring Boot 3.3**
- **Spring Data JPA & Hibernate**
- **Spring Security 6** (CORS liberado para front-end e endpoints REST)
- **MySQL 8.0**
- **Fórmula de Haversine nativa** no serviço de cálculo geodésico.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- Node.js (v18+) e `npm`
- Java 21 e MySQL (opcional, pois o front-end possui camada de serviço resiliente integrada)
- Ou Docker & Docker Compose

---

### Executando o Front-end (Modo Imediato):

```bash
cd frontend
npm install
npm run dev
```

Abra no navegador em:  
👉 **http://localhost:5173**

O front-end iniciará com todos os dados georreferenciados no entorno da UFSC Trindade, funcionando de forma 100% autônoma e interativa, com persistência local de avaliações e favoritos.

---

### Executando o Back-end com Spring Boot (Java 21):

1. Verifique se o serviço MySQL está ativo na porta 3306 com usuário `root` e senha `root`.
2. No diretório `backend`:

```bash
cd backend
mvn spring-boot:run
```

O servidor Spring Boot iniciará em:  
👉 **http://localhost:8080**

Endpoints REST disponíveis:
- `GET /api/universities` — Lista universidades e coordenadas centrais
- `GET /api/properties` — Busca imóveis com filtros de distância, preço, quartos e mobília
- `GET /api/properties/{id}` — Detalhes completos do imóvel
- `POST /api/properties/{id}/reviews` — Adiciona avaliação e diagnóstico de estudante

---

### Executando via Docker Compose (Full Stack):

Para subir MySQL + Spring Boot + React em contêineres isolados:

```bash
docker-compose up --build
```

---

## 📁 Estrutura de Diretórios

```
aluguel-universitario-ufsc/
├── docker-compose.yml
├── README.md
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── UniversitySelector.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   ├── InteractiveMap.jsx
│   │   │   ├── PropertyCard.jsx
│   │   │   ├── PropertyList.jsx
│   │   │   ├── PropertyDetailModal.jsx
│   │   │   ├── StructuralReportCard.jsx
│   │   │   ├── PriceHistoryChart.jsx
│   │   │   ├── ReviewModal.jsx
│   │   │   ├── ContactModal.jsx
│   │   │   └── AboutModal.jsx
│   │   ├── data/
│   │   │   ├── universitiesData.js
│   │   │   └── propertiesData.js
│   │   ├── services/
│   │   │   └── apiService.js
│   │   └── utils/
│   │       ├── geoUtils.js
│   │       └── formatters.js
└── backend/
    ├── pom.xml
    ├── Dockerfile
    └── src/
        └── main/
            ├── java/com/alugaufsc/
            │   ├── AlugaUfscApplication.java
            │   ├── config/ (SecurityConfig, CorsConfig, DataInitializer)
            │   ├── controller/ (PropertyController, UniversityController)
            │   ├── dto/ (ReviewRequestDTO)
            │   ├── model/ (Property, University, Review, PriceHistory, StructuralReport)
            │   ├── repository/ (PropertyRepository, UniversityRepository, ReviewRepository)
            │   └── service/ (PropertyService, DistanceCalculationService)
            └── resources/
                ├── application.properties
                ├── schema.sql
                └── data.sql
```

---

## 📍 Observação Ética sobre os Dados

Conforme as boas práticas de desenvolvimento de software, os imóveis cadastrados utilizam dados demonstrativos realistas situados em endereços verdadeiros dos bairros universitários de Florianópolis (Trindade, Pantanal, Carvoeira, Córrego Grande, Serrinha, Itacorubi e Santa Mônica), permitindo validação integral das regras de negócio, geolocalização e interface.

