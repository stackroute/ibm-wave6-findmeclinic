package com.stackroute.domain;


import lombok.*;
import javax.persistence.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String emailId;
    private String password;
    private String role;

}
