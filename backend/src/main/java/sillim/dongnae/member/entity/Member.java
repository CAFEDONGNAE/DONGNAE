package sillim.dongnae.member.entity;

import lombok.Getter;
import sillim.dongnae.relationship.entity.Relationship;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Member {

    private Long id;
    private String email;
    private String nickName;
    private String password;
    private List<Relationship> relationships = new ArrayList<>();

    public Member(String email, String nickName, String password) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
    }

    public void setMemberId(Long id) {
        this.id = id;
    }

    public void addRelationShip(Relationship relationship) {
        relationships.add(relationship);
    }
}
