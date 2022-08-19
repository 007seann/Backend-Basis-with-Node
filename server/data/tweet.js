import * as userRepository from './auth.js';
import { getTweets } from '../database/database.js';
import MongoDb from 'mongodb';
const ObjectId = MongoDb.ObjectId;
// NOSQL (정보의 중복 > 관계)
// 모든 사용자가 트윗을 쿼리하는 횟수 > 사용자가 사용자의 정보를 업데이트 횟수
// 프로필 DB
// 사용자의 문서 DB: 서버1, 서버2, 서버3
// 관계형 조인쿼리의 성능이 좋지 않다.

// SQL: 관계형
// 조인쿼리 성능이 좋음때문에
// 가령, 우리 트위터 예시에서 userId를 통해 user 정보에 접근하는 것, 즉 데이터 간의 관계가 있을때
// 조인쿼리를 이용한 관계형 SQL을 쓰는게 좋다. 성능이 좋거든

export async function getAll() {
  return getTweets() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name: name,
    username: username,
    url: url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: 'after' }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : user;
}

function mapTweets(tweets) {
  return tweets.map((tweet) => mapOptionalTweet(tweet));
}
