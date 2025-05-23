//package com.HelpingHands.model;
//
//import java.time.LocalDateTime;
//import java.util.*;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    private String firstName;
//    private String LastName;
//    private String password;
//    private String role;
//    private String email;
//    private String mobile;
//
//    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//    private List<Address> address = new ArrayList<>();
//
//    @Embedded
//    @ElementCollection
//    @CollectionTable(name = "payment_information", joinColumns = @JoinColumn(name="user_id"))
//    private List<PaymentInformation> paymentInformation = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<Rating> ratings = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<Review> reviews = new ArrayList<>();
//
//    private LocalDateTime createdAt;
//
//    public User(){
//
//    }
//
//    public User(Long id, String firstName, String lastName, String password,
//                String role, String email, String mobile, List<Address> address,
//                List<PaymentInformation> paymentInformation,
//                List<Rating> ratings, List<Review> reviews, LocalDateTime createdAt) {
//        this.id = id;
//        this.firstName = firstName;
//        LastName = lastName;
//        this.password = password;
//        this.role = role;
//        this.email = email;
//        this.mobile = mobile;
//        this.address = address;
//        this.paymentInformation = paymentInformation;
//        this.ratings = ratings;
//        this.reviews = reviews;
//        this.createdAt = createdAt;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return LastName;
//    }
//
//    public void setLastName(String lastName) {
//        LastName = lastName;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getMobile() {
//        return mobile;
//    }
//
//    public void setMobile(String mobile) {
//        this.mobile = mobile;
//    }
//
//    public List<Address> getAddress() {
//        return address;
//    }
//
//    public void setAddress(List<Address> address) {
//        this.address = address;
//    }
//
//    public List<PaymentInformation> getPaymentInformation() {
//        return paymentInformation;
//    }
//
//    public void setPaymentInformation(List<PaymentInformation> paymentInformation) {
//        this.paymentInformation = paymentInformation;
//    }
//
//    public List<Rating> getRatings() {
//        return ratings;
//    }
//
//    public void setRatings(List<Rating> ratings) {
//        this.ratings = ratings;
//    }
//
//    public List<Review> getReviews() {
//        return reviews;
//    }
//
//    public void setReviews(List<Review> reviews) {
//        this.reviews = reviews;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//
//}

package com.HelpingHands.model;

import java.time.LocalDateTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;  // Renamed to camelCase
    private String password;
    private String role;
    private String email;
    private Long mobile;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Address> address = new ArrayList<>();

    @Embedded
    @ElementCollection
    @CollectionTable(name = "payment_information", joinColumns = @JoinColumn(name="user_id"))
    private List<PaymentInformation> paymentInformation = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    private LocalDateTime createdAt;

    public User() {
    }

    public User(Long id, String firstName, String lastName, String password,
                String role, String email, Long mobile, List<Address> address,
                List<PaymentInformation> paymentInformation,
                List<Rating> ratings, List<Review> reviews, LocalDateTime createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;  // Renamed to camelCase
        this.password = password;
        this.role = role;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.paymentInformation = paymentInformation;
        this.ratings = ratings;
        this.reviews = reviews;
        this.createdAt = createdAt;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;  // Renamed to camelCase
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;  // Renamed to camelCase
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getMobile() {
        return mobile;
    }

    public void setMobile(Long mobile) {
        this.mobile = mobile;
    }

    public List<Address> getAddress() {
        return address;
    }

    public void setAddress(List<Address> address) {
        this.address = address;
    }

    public List<PaymentInformation> getPaymentInformation() {
        return paymentInformation;
    }

    public void setPaymentInformation(List<PaymentInformation> paymentInformation) {
        this.paymentInformation = paymentInformation;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
