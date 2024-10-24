package sillim.dongnae.member.entity;

import lombok.Getter;

@Getter
public class Member {

    private Long id;
    private String email;
    private String nickName;
    private String password;

    public Member(String email, String nickName, String password) {
        this.email = email;
        this.nickName = nickName;
        this.password = password;
    }

    public void setMemberId(Long id) {
        this.id = id;
    }
}
