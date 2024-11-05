package sillim.dongnae.relationship.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FollowSuggestResponse {

    private Long id;
    private String email;
    private String nickname;

    public FollowSuggestResponse(Long id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
    }
}
