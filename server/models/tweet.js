'use strict';

function Schema(sequelize, DataTypes) {
  let Schema = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    idStr: DataTypes.STRING,
    text: DataTypes.STRING,
    source: DataTypes.STRING,
    user: DataTypes.JSON,
    media: DataTypes.JSON,
    createdAt: DataTypes.DATE,
    timestampMs: DataTypes.BIGINT,
    stared: DataTypes.DATE
  }
  let Model = sequelize.define('tweet', Schema);

  /**
   * Convert raw twitter to model style
   * @param tweetObject
   * @return {{id, idStr: string, text, source, user, media: string, createdAt: string, timestampMs: string}}
   */
  Model.normalizeTweet = (tweetObject) => {
    let media = tweetObject.extended_entities &&
      tweetObject.extended_entities.media || null;
    return {
      id: tweetObject.id,
      idStr: tweetObject.id_str,
      text: tweetObject.text,
      source: tweetObject.source,
      user: tweetObject.user,
      media: media,
      createdAt: typeof tweetObject.created_at === 'string' ? new Date(tweetObject.created_at) : tweetObject.created_at,
      timestampMs: tweetObject.timestamp_ms
    }
  }
  
  return Model;
}

module.exports = Schema