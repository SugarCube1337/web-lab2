package com.sugarcube.weblab2.model;

public class HitMapper {

    public static HitDto toHitDto(Hit hit) {
        return new HitDto(hit.getX(), hit.getY(), hit.getR(), hit.isHit(), hit.getAttemptTime(), hit.getScriptDuration());
    }
}
