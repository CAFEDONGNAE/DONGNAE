package sillim.dongnae.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.member.entity.Member;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponse {

    private String email;
    private String name;

    public static MemberProfileResponse of(Member member) {
        return new MemberProfileResponse(member.getEmail(), member.getNickName());
    }

}
