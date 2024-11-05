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

    public static MemberProfileResponse of(Member member) {
        return new MemberProfileResponse(member.getId(), member.getEmail(), member.getNickName());
    }

}
