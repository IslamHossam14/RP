import prisma from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors';

export class RegistrationService {
  async getAllRegistrations(page: number, pageSize: number, search?: string, status?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (search) {
      whereClause.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { course: { title: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (status) {
      whereClause.status = status;
    }

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
              price: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { enrollmentDate: 'desc' },
      }),
      prisma.registration.count({ where: whereClause }),
    ]);

    return { registrations, total };
  }

  async getRegistrationById(registrationId: string) {
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        user: true,
        course: true,
      },
    });

    if (!registration) {
      throw new NotFoundError('Registration not found');
    }

    return registration;
  }

  async createRegistration(userId: string, courseId: string) {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check if course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Check if already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingRegistration) {
      throw new ConflictError('User is already registered for this course');
    }

    const registration = await prisma.registration.create({
      data: {
        userId,
        courseId,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
    });

    return registration;
  }

  async updateRegistrationStatus(registrationId: string, status: string) {
    const registration = await prisma.registration.update({
      where: { id: registrationId },
      data: { status: status as any },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return registration;
  }

  async completeRegistration(registrationId: string) {
    const registration = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        status: 'COMPLETED',
        progress: 100,
        completionDate: new Date(),
      },
    });

    return registration;
  }

  async getUserRegistrations(userId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              description: true,
              price: true,
              duration: true,
              level: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { enrollmentDate: 'desc' },
      }),
      prisma.registration.count({ where: { userId } }),
    ]);

    return { registrations, total };
  }

  async deleteRegistration(registrationId: string) {
    await prisma.registration.delete({
      where: { id: registrationId },
    });

    return { message: 'Registration deleted successfully' };
  }

  async getRegistrationStats() {
    const [totalRegistrations, pendingRegistrations, approvedRegistrations, completedRegistrations] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: 'PENDING' } }),
      prisma.registration.count({ where: { status: 'APPROVED' } }),
      prisma.registration.count({ where: { status: 'COMPLETED' } }),
    ]);

    return {
      total: totalRegistrations,
      pending: pendingRegistrations,
      approved: approvedRegistrations,
      completed: completedRegistrations,
    };
  }
}

export const registrationService = new RegistrationService();
