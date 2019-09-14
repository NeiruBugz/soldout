import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Review } from './interfaces/review.interface';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject('REVIEW_MODEL') private readonly reviewModel: Model<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async delete(reviewId: number): Promise<Review[]> {
    return this.reviewModel.deleteOne({ id: reviewId });
  }
}
