package com.sugarcube.weblab2.dao;

import com.sugarcube.weblab2.model.Hit;
import jakarta.ejb.Singleton;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class HitStorage {
    private  List<Hit> hits = new ArrayList<>();

    public  Hit addHit(Hit hit) {
        hits.add(hit);
        return hit;
    }

    public List<Hit> getUserHits(String sessionId) {
        return hits.stream()
                .filter(hit -> hit.getSessionId().equals(sessionId))
                .collect(Collectors.toList());
    }

    public void deleteUserHits(String sessionId) {
        hits = hits.stream()
                .filter(hit -> !hit.getSessionId().equals(sessionId))
                .collect(Collectors.toList());
    }

    public  List<Hit> getHits() {
        return hits;
    }
}
