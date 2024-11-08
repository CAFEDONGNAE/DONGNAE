package sillim.dongnae.relationship.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sillim.dongnae.relationship.entity.Relationship;

import java.util.List;

@Repository
public interface RelationshipJpaRepository extends JpaRepository<Relationship, Long> {

    List<Relationship> findByFollowerMemberId(Long memberId);

    @Query(
            """
                SELECT r
                FROM Relationship r
                WHERE r.followerMember NOT IN (
                    SELECT r.followingMember
                    FROM Relationship r
                    WHERE r.followerMember.id = :memberId
                )
                AND r.followingMember.id = :memberId
           """
    )
    List<Relationship> followSuggest(@Param("memberId")Long memberId);

}
