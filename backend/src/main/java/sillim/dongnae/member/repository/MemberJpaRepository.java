package sillim.dongnae.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sillim.dongnae.member.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    Optional<Member> findByEmailAndPassword(String email, String password);

    @Query("""
            SELECT m
            FROM Member m
            WHERE m NOT IN (
                                (SELECT r.followingMember
                                FROM  Relationship r
                                where r.followerMember.id = :memberId)
                                )
                                AND m.id != :memberId
                                AND m.nickName LIKE :keyword
            """)
    List<Member> searchMember(@Param("keyword") String keyword, @Param("memberId") Long memberId);
}
