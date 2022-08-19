import { config } from '../config.js';
import Mongoose from 'mongoose';

export async function connectDB() {
  return Mongoose.connect(config.db.host); //
}

export function useVirtualId(schema) {
  // -id => -id
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtual: true });
}

// TODO(Sean): Delete below

let db;
export function getUsers() {
  return db.collection('users');
}

export function getTweets() {
  return db.collection('tweets');
}
