package com.alugaufsc.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class ReviewRequestDTO {

    private String studentName;
    private String course;
    private String period;

    @NotNull
    private Integer rating;

    private String mofoLevel;

    @NotBlank
    private String title;

    @NotBlank
    private String comment;

    private List<String> pros;
    private List<String> cons;

    public ReviewRequestDTO() {}

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getMofoLevel() { return mofoLevel; }
    public void setMofoLevel(String mofoLevel) { this.mofoLevel = mofoLevel; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public List<String> getPros() { return pros; }
    public void setPros(List<String> pros) { this.pros = pros; }

    public List<String> getCons() { return cons; }
    public void setCons(List<String> cons) { this.cons = cons; }
}

