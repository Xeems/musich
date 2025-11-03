CREATE OR REPLACE FUNCTION increment_track_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT type FROM playlist_table WHERE id = NEW."playlistId") = 'default' THEN
    UPDATE track_table
    SET "likes_count" = COALESCE("likes_count", 0) + 1
    WHERE id = NEW."trackId";
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_likes
AFTER INSERT ON playlist_tracks_table
FOR EACH ROW
EXECUTE FUNCTION increment_track_likes_count();


CREATE OR REPLACE FUNCTION decrement_track_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT type FROM playlist_table WHERE id = OLD."playlistId") = 'default' THEN
    UPDATE track_table
    SET "likes_count" = GREATEST(COALESCE("likes_count", 0) - 1, 0)
    WHERE id = OLD."trackId";
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decrement_likes
AFTER DELETE ON playlist_tracks_table
FOR EACH ROW
EXECUTE FUNCTION decrement_track_likes_count();
