import * as userRepository from './auth.js';
import { useVirtualId } from '../database/database.js';
import Mongoose from 'mongoose';
// NOSQL (정보의 중복 > 관계)
// 모든 사용자가 트윗을 쿼리하는 횟수 > 사용자가 사용자의 정보를 업데이트 횟수
// 프로필 DB
// 사용자의 문서 DB: 서버1, 서버2, 서버3
// 관계형 조인쿼리의 성능이 좋지 않다.

// SQL: 관계형
// 조인쿼리 성능이 좋음때문에
// 가령, 우리 트위터 예시에서 userId를 통해 user 정보에 접근하는 것, 즉 데이터 간의 관계가 있을때
// 조인쿼리를 이용한 관계형 SQL을 쓰는게 좋다. 성능이 좋거든

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, requried: true },
    name: { type: String, requried: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  return userRepository.findById(userId).then((user) =>
    new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}
