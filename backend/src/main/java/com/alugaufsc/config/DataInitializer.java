package com.alugaufsc.config;

import com.alugaufsc.model.*;
import com.alugaufsc.repository.PropertyRepository;
import com.alugaufsc.repository.UniversityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UniversityRepository universityRepository;
    private final PropertyRepository propertyRepository;

    public DataInitializer(UniversityRepository universityRepository, PropertyRepository propertyRepository) {
        this.universityRepository = universityRepository;
        this.propertyRepository = propertyRepository;
    }

    @Override
    public void run(String... args) {
        if (universityRepository.count() == 0) {
            seedUniversities();
        }
        if (propertyRepository.count() == 0) {
            seedProperties();
        }
    }

    private void seedUniversities() {
        University ufsc = new University(
                "ufsc-trindade",
                "UFSC Trindade",
                "Universidade Federal de Santa Catarina",
                "Campus Reitor João David Ferreira Lima (Trindade)",
                "Florianópolis - SC",
                -27.60100,
                -48.51860,
                15,
                "Principal",
                "Campus principal da UFSC, abrangendo CTC, CCS, CSE, CFH, CCE, CCB e CED."
        );

        University udesc = new University(
                "udesc-itacorubi",
                "UDESC Itacorubi",
                "Universidade do Estado de Santa Catarina",
                "Campus I - Itacorubi",
                "Florianópolis - SC",
                -27.58550,
                -48.50820,
                15,
                "Expansão",
                "Campus da ESAG, CEART e FAED no bairro Itacorubi."
        );

        University ifsc = new University(
                "ifsc-centro",
                "IFSC Centro",
                "Instituto Federal de Santa Catarina",
                "Campus Florianópolis (Mauro Ramos)",
                "Florianópolis - SC",
                -27.59560,
                -48.54340,
                15,
                "Expansão",
                "Campus tradicional na Avenida Mauro Ramos no Centro."
        );

        University unisul = new University(
                "unisul-centro",
                "Unisul Centro",
                "Universidade do Sul de Santa Catarina",
                "Unidade Florianópolis Centro (Trajano)",
                "Florianópolis - SC",
                -27.59470,
                -48.55280,
                15,
                "Expansão",
                "Campus no Centro Histórico de Florianópolis."
        );

        universityRepository.saveAll(List.of(ufsc, udesc, ifsc, unisul));
    }

    private void seedProperties() {
        // Imóvel 1: Studio Trindade
        Property p1 = new Property();
        p1.setId("prop-1");
        p1.setCode("UFSC-TRIN-101");
        p1.setTitle("Studio Mobiliado ao lado da Reitoria e CTC");
        p1.setType("INDIVIDUAL");
        p1.setSubtype("Studio / Kitnet Premium");
        p1.setAddress("Rua Desembargador Vitor Lima, 260");
        p1.setNeighborhood("Trindade");
        p1.setCity("Florianópolis - SC");
        p1.setCep("88040-400");
        p1.setLatitude(-27.60015);
        p1.setLongitude(-48.51520);
        p1.setAvailable(true);
        p1.setMonthlyRent(1750.0);
        p1.setCondoFee(260.0);
        p1.setIptu(48.0);
        p1.setInsurance(22.0);
        p1.setBillsWaterIncluded(true);
        p1.setBillsPowerIncluded(false);
        p1.setBillsInternetIncluded(true);
        p1.setBillsCondoIncluded(false);
        p1.setBillsSummary("Água e Wi-Fi de alta velocidade inclusos no condomínio.");
        p1.setBedrooms(1);
        p1.setBathrooms(1);
        p1.setAreaM2(32);
        p1.setParkingSpots(0);
        p1.setFloor(3);
        p1.setSunOrientation("Sol da Manhã (face Leste)");
        p1.setFurnishedStatus("MOBILIADO");
        p1.setFurnitureItems("Cama box casal;Escrivaninha ampla com cadeira de escritório;Ar-condicionado Split 9000 BTUs;Geladeira duplex;Cooktop 2 bocas");
        p1.setAmenities("Portaria eletrônica facial;Bicicletário coberto;Lavanderia compartilhada OMO;Elevador;Permite pet");
        p1.setDescription("Excelente studio moderno a apenas 3 minutos a pé do CTC e da Biblioteca Central da UFSC.");
        p1.setPhotos("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80;https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80");
        p1.setContactName("Regina Imóveis Trindade");
        p1.setContactType("Imobiliária Credenciada");
        p1.setContactPhone("(48) 3334-8800");
        p1.setContactWhatsapp("5548991234567");
        p1.setContactEmail("contato@reginaimoveisfloripa.com.br");
        p1.setTransparencyScore(9.1);

        StructuralReport r1 = new StructuralReport();
        r1.setMofoLevel("BAIXO");
        r1.setMofoScore(9.4);
        r1.setMofoNote("3º andar com incidência solar direta pela manhã. Ambientes arejados.");
        r1.setInfiltracoesScore(9.6);
        r1.setInfiltracoesNote("Prédio de 2021 com tubulações novas.");
        r1.setAcusticaScore(8.0);
        r1.setAcusticaNote("Janela antirruído ameniza tráfego de alunos.");
        r1.setSegurancaRuaScore(9.3);
        r1.setSegurancaRuaNote("Rua muito movimentada e bem iluminada à noite.");
        r1.setInternetScore(9.8);
        r1.setInternetSpeedMbps(500);
        r1.setInternetProvider("Vivo Fibra");
        r1.setInternetNote("Roteador Wi-Fi 6 instalado.");
        r1.setTransporteScore(9.5);
        r1.setDistanceStopMeters(90);
        r1.setBusLines("135 Volta ao Morro Carvoeira, 136 Pantanal, Circular UFSC");
        p1.setStructuralReport(r1);

        // Histórico de Preços
        PriceHistory ph1 = new PriceHistory(2023, "Março 2023", 1450.0, "Primeiro contrato com mobília.");
        ph1.setProperty(p1);
        PriceHistory ph2 = new PriceHistory(2024, "Março 2024", 1580.0, "Reajuste anual IPCA.");
        ph2.setProperty(p1);
        PriceHistory ph3 = new PriceHistory(2025, "Fevereiro 2025", 1680.0, "Instalação de ar-condicionado novo.");
        ph3.setProperty(p1);
        PriceHistory ph4 = new PriceHistory(2026, "Janeiro 2026", 1750.0, "Valor atual anunciado.");
        ph4.setProperty(p1);
        p1.setPriceHistory(List.of(ph1, ph2, ph3, ph4));

        // Avaliação de Ex-Morador
        Review rev1 = new Review();
        rev1.setId("rev-1");
        rev1.setProperty(p1);
        rev1.setStudentName("Lucas Bittencourt");
        rev1.setCourse("Engenharia Elétrica - CTC/UFSC");
        rev1.setPeriod("Morou de 2023 a 2025");
        rev1.setRating(5);
        rev1.setVerifiedResident(true);
        rev1.setTitle("Localização imbatível para quem estuda no CTC!");
        rev1.setComment("Morar aqui salvou minhas manhãs na UFSC. Apê nunca teve mofo e a internet nunca caiu em provas.");
        rev1.setPros("3 min a pé da UFSC;Sem problemas de umidade;Internet ultra-rápida");
        rev1.setCons("Não tem vaga para carro");
        rev1.setCreatedAt(LocalDate.of(2025, 12, 10));
        p1.setReviews(List.of(rev1));

        propertyRepository.save(p1);
    }
}

