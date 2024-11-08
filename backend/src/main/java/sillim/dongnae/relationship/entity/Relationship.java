package sillim.dongnae.relationship.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sillim.dongnae.member.entity.Member;

@Getter
@Entity
@NoArgsConstructor
public class Relationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "friend_id")
    private Member followingMember;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member followerMember;

    public Relationship(Member followerMember, Member followingMember) {
        this.followerMember = followerMember;
        this.followingMember = followingMember;
    }

}
