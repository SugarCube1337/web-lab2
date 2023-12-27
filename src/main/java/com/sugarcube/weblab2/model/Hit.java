package com.sugarcube.weblab2.model;

public class Hit {
    private final String sessionId;
    private final int x;
    private final double y;
    private final int r;
    private final boolean isHit;
    private final String attemptTime;
    private final long scriptDuration;

    public Hit(String sessionId, int x, double y, int r, boolean isHit, String attemptTime, long scriptDuration) {
        this.sessionId = sessionId;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.attemptTime = attemptTime;
        this.scriptDuration = scriptDuration;
    }

    @Override
    public String toString() {
        return "Hit{" +
                "sessionId='" + sessionId + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isHit=" + isHit +
                ", attemptTime='" + attemptTime + '\'' +
                ", scriptDuration=" + scriptDuration +
                '}';
    }


    public String getSessionId() {
        return sessionId;
    }

    public int getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    public boolean isHit() {
        return isHit;
    }

    public String getAttemptTime() {
        return attemptTime;
    }

    public long getScriptDuration() {
        return scriptDuration;
    }
}
