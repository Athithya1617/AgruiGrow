package com.Project.Agrigrow.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String phone;
    
    @Column(length = 500)
    private String location;
    
    private Double farmSize;
    private String unit;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_crop_preferences", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "preference")
    private List<String> cropPreferences;

    public User() {
    }

    public User(Long id, String name, String email, String password, String phone, String location, Double farmSize, String unit, List<String> cropPreferences) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.location = location;
        this.farmSize = farmSize;
        this.unit = unit;
        this.cropPreferences = cropPreferences;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getFarmSize() {
        return farmSize;
    }

    public void setFarmSize(Double farmSize) {
        this.farmSize = farmSize;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public List<String> getCropPreferences() {
        return cropPreferences;
    }

    public void setCropPreferences(List<String> cropPreferences) {
        this.cropPreferences = cropPreferences;
    }
}
