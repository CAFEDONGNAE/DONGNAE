package sillim.dongnae.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberJoinRequest {

    private String email;
    private String nickname;
    private String password;

}
