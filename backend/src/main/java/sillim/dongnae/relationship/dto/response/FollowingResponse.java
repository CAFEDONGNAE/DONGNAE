package sillim.dongnae.relationship.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.member.entity.Member;

@Getter
@NoArgsConstructor
public class FollowingResponse {

    private Long id;
    private String email;
    private String name;

    public FollowingResponse(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.name = member.getNickName();
    }

}
