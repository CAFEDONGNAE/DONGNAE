package sillim.dongnae.relationship.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FollowingResponse {

    private Long id;
    private String email;
    private String name;

    public FollowingResponse(Long id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.name = nickname;
    }

}
