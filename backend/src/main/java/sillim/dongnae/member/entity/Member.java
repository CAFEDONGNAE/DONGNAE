package sillim.dongnae.member.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.relationship.entity.Relationship;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String nickName;
    @Column(nullable = false)
    private String password;

    // 내가 팔로우 하는 사람들 (following)
    @OneToMany(mappedBy = "followingMember")
    private final List<Relationship> followingRelationships = new ArrayList<>();

    // 나를 팔로우 하는 사람들 (following)
    @OneToMany(mappedBy = "followerMember")
    private final List<Relationship> followerRelationships = new ArrayList<>();

    public Member(String email, String nickName, String password) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
    }

}
