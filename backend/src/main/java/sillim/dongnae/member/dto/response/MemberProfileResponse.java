package sillim.dongnae.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.member.entity.Member;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponse {

    private Long id;
    private String email;
    private String name;

    public MemberProfileResponse(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getNickName();
    }

    public static MemberProfileResponse of(Member member) {
        return new MemberProfileResponse(member.getId(), member.getEmail(), member.getNickName());
    }

}
