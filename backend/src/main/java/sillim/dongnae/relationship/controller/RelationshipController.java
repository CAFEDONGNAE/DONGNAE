package sillim.dongnae.relationship.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sillim.dongnae.relationship.dto.request.FollowRequest;
import sillim.dongnae.relationship.dto.response.FollowSuggestResponse;
import sillim.dongnae.relationship.dto.response.FollowingResponse;
import sillim.dongnae.relationship.service.RelationshipService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/relationships")
public class RelationshipController {

    private final RelationshipService relationshipService;

    @PostMapping
    public ResponseEntity<String> follow(HttpServletRequest servletRequest, @RequestBody FollowRequest request) {

        HttpSession session = servletRequest.getSession(false);

        if (session == null || session.getAttribute("memberId") == null) {
            return new ResponseEntity<>("로그인이 필요합니다.", HttpStatus.UNAUTHORIZED);
        }

        relationshipService.addRelationship((long) session.getAttribute("memberId"), request.getId());

        return new ResponseEntity<>("팔로잉 했습니다.", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<FollowingResponse>> getFollowing(HttpServletRequest servletRequest) {

        HttpSession session = servletRequest.getSession(false);

        return new ResponseEntity<>(relationshipService.getFollowing((long) session.getAttribute("memberId")), HttpStatus.OK);
    }

    @GetMapping("/suggest")
    public ResponseEntity<List<FollowSuggestResponse>> getFollowSuggest(HttpServletRequest servletRequest) {

        HttpSession session = servletRequest.getSession(false);
        return new ResponseEntity<>(relationshipService.getFollowSuggests((long) session.getAttribute("memberId")), HttpStatus.OK);
    }
}
