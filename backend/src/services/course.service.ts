import prisma from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors';
import { CreateCourseInput } from '../validators';

export class CourseService {
  async getAllCourses(page: number, pageSize: number, search?: string, category?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = { status: 'ACTIVE' };
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category) {
      whereClause.category = category;
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.course.count({ where: whereClause }),
    ]);

    return { courses, total };
  }

  async getCourseById(courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        registrations: {
          select: {
            id: true,
            userId: true,
            status: true,
            enrollmentDate: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    return course;
  }

  async createCourse(data: CreateCourseInput) {
    const existingCourse = await prisma.course.findUnique({
      where: { title: data.title },
    });

    if (existingCourse) {
      throw new ConflictError('Course with this title already exists');
    }

    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        duration: data.duration,
        level: data.level,
        category: data.category as any,
        content: data.content,
        instructor: data.instructor,
        maxStudents: data.maxStudents || 50,
      },
    });

    return course;
  }

  async updateCourse(courseId: string, data: Partial<CreateCourseInput>) {
    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        duration: data.duration,
        level: data.level,
        category: data.category as any,
        content: data.content,
        instructor: data.instructor,
        maxStudents: data.maxStudents,
      },
    });

    return course;
  }

  async deleteCourse(courseId: string) {
    await prisma.course.delete({
      where: { id: courseId },
    });

    return { message: 'Course deleted successfully' };
  }

  async updateCourseStatus(courseId: string, status: string) {
    const course = await prisma.course.update({
      where: { id: courseId },
      data: { status: status as any },
    });

    return course;
  }

  async getFeaturedCourses(limit: number = 3) {
    const courses = await prisma.course.findMany({
      where: { status: 'ACTIVE' },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return courses;
  }

  async searchCourses(query: string) {
    const courses = await prisma.course.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });

    return courses;
  }

  async getCourseStats(courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    const [totalRegistrations, approvedRegistrations, totalRevenue] = await Promise.all([
      prisma.registration.count({ where: { courseId } }),
      prisma.registration.count({
        where: { courseId, status: 'APPROVED' },
      }),
      prisma.payment.aggregate({
        where: { courseId, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    return {
      course: {
        id: course.id,
        title: course.title,
        price: course.price,
      },
      stats: {
        totalRegistrations,
        approvedRegistrations,
        totalRevenue: totalRevenue._sum.amount || 0,
      },
    };
  }
}

export const courseService = new CourseService();
