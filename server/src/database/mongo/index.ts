import mongoose from 'mongoose';
import { config } from '../../utils/constant';

export async function initMongo() {
  await mongoose.connect(config.mongo);
}
