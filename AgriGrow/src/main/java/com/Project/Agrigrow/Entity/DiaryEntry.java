package com.Project.Agrigrow.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "diary_entries")
public class DiaryEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "description", length = 1000)
    private String desc; // Field matches frontend JSON 'desc' property

    private String tag;
    private String date;

    public DiaryEntry() {
    }

    public DiaryEntry(Long id, String title, String desc, String tag, String date) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.tag = tag;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
