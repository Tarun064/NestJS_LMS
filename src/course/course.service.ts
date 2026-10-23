import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

import { Course } from './schemas/course.schema.js';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CourseService {
  findOne(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseModel.create({
      name: createCourseDto.name,
      description: createCourseDto.description,
      level: createCourseDto.level,
      price: createCourseDto.price,
    });
    
  }

  findAll() {
    return `This action returns all course`;
  }

  async asyncfindOne(id: string) {
    return await this.courseModel.findOne({_id:id});
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
