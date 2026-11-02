package com.alugaufsc.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class StructuralReport {

    private String mofoLevel; // BAIXO, MEDIO, CRITICO
    private Double mofoScore;
    private String mofoNote;

    private Double infiltracoesScore;
    private String infiltracoesNote;

    private Double acusticaScore;
    private String acusticaNote;

    private Double segurancaRuaScore;
    private String segurancaRuaNote;

    private Double internetScore;
    private Integer internetSpeedMbps;
    private String internetProvider;
    private String internetNote;

    private Double transporteScore;
    private Integer distanceStopMeters;
    private String busLines;

    public StructuralReport() {}

    public String getMofoLevel() { return mofoLevel; }
    public void setMofoLevel(String mofoLevel) { this.mofoLevel = mofoLevel; }

    public Double getMofoScore() { return mofoScore; }
    public void setMofoScore(Double mofoScore) { this.mofoScore = mofoScore; }

    public String getMofoNote() { return mofoNote; }
    public void setMofoNote(String mofoNote) { this.mofoNote = mofoNote; }

    public Double getInfiltracoesScore() { return infiltracoesScore; }
    public void setInfiltracoesScore(Double infiltracoesScore) { this.infiltracoesScore = infiltracoesScore; }

    public String getInfiltracoesNote() { return infiltracoesNote; }
    public void setInfiltracoesNote(String infiltracoesNote) { this.infiltracoesNote = infiltracoesNote; }

    public Double getAcusticaScore() { return acusticaScore; }
    public void setAcusticaScore(Double acusticaScore) { this.acusticaScore = acusticaScore; }

    public String getAcusticaNote() { return acusticaNote; }
    public void setAcusticaNote(String acusticaNote) { this.acusticaNote = acusticaNote; }

    public Double getSegurancaRuaScore() { return segurancaRuaScore; }
    public void setSegurancaRuaScore(Double segurancaRuaScore) { this.segurancaRuaScore = segurancaRuaScore; }

    public String getSegurancaRuaNote() { return segurancaRuaNote; }
    public void setSegurancaRuaNote(String segurancaRuaNote) { this.segurancaRuaNote = segurancaRuaNote; }

    public Double getInternetScore() { return internetScore; }
    public void setInternetScore(Double internetScore) { this.internetScore = internetScore; }

    public Integer getInternetSpeedMbps() { return internetSpeedMbps; }
    public void setInternetSpeedMbps(Integer internetSpeedMbps) { this.internetSpeedMbps = internetSpeedMbps; }

    public String getInternetProvider() { return internetProvider; }
    public void setInternetProvider(String internetProvider) { this.internetProvider = internetProvider; }

    public String getInternetNote() { return internetNote; }
    public void setInternetNote(String internetNote) { this.internetNote = internetNote; }

    public Double getTransporteScore() { return transporteScore; }
    public void setTransporteScore(Double transporteScore) { this.transporteScore = transporteScore; }

    public Integer getDistanceStopMeters() { return distanceStopMeters; }
    public void setDistanceStopMeters(Integer distanceStopMeters) { this.distanceStopMeters = distanceStopMeters; }

    public String getBusLines() { return busLines; }
    public void setBusLines(String busLines) { this.busLines = busLines; }
}

